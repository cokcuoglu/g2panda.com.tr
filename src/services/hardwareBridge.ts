import { WebSocket, WebSocketServer } from 'ws';
import { Server } from 'http';
import logger from '../config/logger';

// Helper for ESC/POS commands in Node.js
class EscPosBuilder {
    private buffer: number[] = [];

    public initialize() {
        this.buffer.push(0x1B, 0x40); // ESC @
        this.buffer.push(0x1B, 0x74, 13); // PC857 Turkish
        return this;
    }

    public align(align: number) { // 0: Left, 1: Center, 2: Right
        this.buffer.push(0x1B, 0x61, align);
        return this;
    }

    public bold(on: boolean) {
        this.buffer.push(0x1B, 0x45, on ? 1 : 0);
        return this;
    }

    public fontSize(size: number) { // 1: normal, 2: double
        this.buffer.push(0x1D, 0x21, size === 2 ? 0x11 : 0x00);
        return this;
    }

    public text(str: string) {
        // Simple mapping for common Turkish characters if needed, 
        // but bridge's .NET side handles encoding if we send string.
        // However, here we build raw bytes.
        const iconv = require('iconv-lite');
        const encoded = iconv.encode(str + '\n', 'win1254');
        for (let i = 0; i < encoded.length; i++) this.buffer.push(encoded[i]);
        return this;
    }

    public separator() {
        return this.text('------------------------------');
    }

    public feed(lines: number = 1) {
        for (let i = 0; i < lines; i++) this.buffer.push(0x0A);
        return this;
    }

    public cut() {
        this.buffer.push(0x1D, 0x56, 66, 0);
        return this;
    }

    public build(): string {
        return Buffer.from(this.buffer).toString('base64');
    }
}

interface BridgeClient {
    ws: WebSocket;
    machineId: string;
    restaurantId: string;
    lastHeartbeat: Date;
    status: 'Online' | 'Offline';
}

class HardwareBridgeService {
    private wss: WebSocketServer | null = null;
    private clients: Map<string, BridgeClient> = new Map();

    public init(server: Server) {
        this.wss = new WebSocketServer({ noServer: true });

        server.on('upgrade', (request, socket, head) => {
            const url = request.url || '';
            console.log(`[WS-Upgrade] Received upgrade request for: ${url}`);

            // Allow both with and without /api prefix for flexibility, or check exact match
            const isMatch = url === '/api/hardware/connect' || url === '/hardware/connect';

            if (isMatch) {
                console.log(`[WS-Upgrade] Matching path found: ${url}. Upgrading...`);
                this.wss?.handleUpgrade(request, socket, head, (ws) => {
                    this.wss?.emit('connection', ws, request);
                });
            } else {
                console.log(`[WS-Upgrade] No match for path: ${url}`);
            }
        });

        this.wss.on('connection', (ws: WebSocket) => {
            ws.on('message', (data) => {
                try {
                    const message = JSON.parse(data.toString());
                    this.handleMessage(ws, message);
                } catch (err) { }
            });
            ws.on('close', () => this.handleDisconnect(ws));
        });

        setInterval(() => this.cleanup(), 60000);
    }

    private handleMessage(ws: WebSocket, message: any) {
        if (message.machineId && message.restaurantId && message.apiKey) {
            this.clients.set(message.machineId, {
                ws,
                machineId: message.machineId,
                restaurantId: message.restaurantId,
                lastHeartbeat: new Date(),
                status: 'Online'
            });
            logger.info(`[HardwareBridge] Registered: ${message.machineId}`);
            ws.send(JSON.stringify({ type: 'registered', success: true }));
        }

        if (message.type === 'heartbeat') {
            const client = this.findClientByWs(ws);
            if (client) {
                client.lastHeartbeat = new Date();
                client.status = 'Online';
            }
        }
    }

    private handleDisconnect(ws: WebSocket) {
        const client = this.findClientByWs(ws);
        if (client) client.status = 'Offline';
    }

    private findClientByWs(ws: WebSocket) {
        return Array.from(this.clients.values()).find(c => c.ws === ws);
    }

    private cleanup() {
        const now = new Date();
        for (const client of this.clients.values()) {
            if (now.getTime() - client.lastHeartbeat.getTime() > 120000) {
                client.status = 'Offline';
            }
        }
    }

    public getStatus(restaurantId: string) {
        return Array.from(this.clients.values())
            .filter(c => String(c.restaurantId).trim() === String(restaurantId).trim())
            .map(c => ({ machineId: c.machineId, status: c.status }));
    }

    public sendRaw(machineId: string, base64Data: string): boolean {
        const client = this.clients.get(machineId);
        if (client && client.status === 'Online') {
            client.ws.send(JSON.stringify({ type: 'print', content: base64Data }));
            return true;
        }
        return false;
    }

    public generateReceipt(order: any): string {
        const builder = new EscPosBuilder().initialize();

        builder.align(1).bold(true).fontSize(2).text('G2PANDA').fontSize(1).feed();
        builder.text(new Date().toLocaleString('tr-TR')).separator();

        if (order.table_number) {
            builder.align(0).bold(true).text(`MASA: ${order.table_number}`).bold(false);
        }
        builder.text(`No: ${order.order_number || order.id?.substring(0, 8)}`).separator();

        const items = order.items || [];
        items.forEach((item: any) => {
            const name = item.name.substring(0, 20);
            const qty = item.quantity.toString().padStart(2);
            const price = (item.total_price || item.amount || 0).toFixed(2).padStart(7);
            builder.text(`${qty} x ${name.padEnd(20)} ${price}`);
        });

        builder.separator().align(2).bold(true);
        builder.text(`TOPLAM: ${Number(order.total_amount || order.amount || 0).toFixed(2)} TL`);
        builder.bold(false).feed(3).cut();

        return builder.build();
    }
}

export const hardwareBridgeService = new HardwareBridgeService();
