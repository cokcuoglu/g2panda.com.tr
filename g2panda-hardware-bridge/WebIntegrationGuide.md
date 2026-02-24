# G2Panda Hardware Bridge - Web Integration API

To manage the Hardware Bridge from the cloud, implement the following endpoints in your Node/Express backend.

## 1. Registration
`POST /api/hardware/register`

Used by the bridge on first connect to link with the restaurant.

**Payload:**
```json
{
  "machineId": "guid",
  "restaurantId": "uuid",
  "apiKey": "string"
}
```

## 2. Status Check
`GET /api/hardware/status`

Returns the online/offline status of all registered bridges for the current restaurant.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "machineId": "...",
      "status": "Online",
      "lastHeartbeat": "2026-02-24T18:00:00Z"
    }
  ]
}
```

## 3. Regenerate API Key
`POST /api/hardware/regenerate-key`

Invalidates current session and generates a new token.

---

# Frontend UI (React) - Settings > Hardware

```tsx
import { useState, useEffect } from 'react';
import { Download, Monitor, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HardwareSettings() {
    const [hardwareNodes, setHardwareNodes] = useState([]);

    const handleDownload = () => {
        window.location.href = 'https://api.g2panda.com/static/G2PandaHardwareBridge.msi';
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Hardware Settings</h1>
                <Button onClick={handleDownload} className="bg-green-600">
                    <Download className="h-4 w-4 mr-2" />
                    Download Hardware Bridge (v1.0.0)
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {hardwareNodes.map(node => (
                    <Card key={node.machineId}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Bridge Node: {node.machineId.substring(0, 8)}...
                            </CardTitle>
                            <Monitor className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2">
                                <div className={`h-2 w-2 rounded-full ${node.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className="text-xs font-semibold uppercase">{node.status}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Last Heartbeat: {new Date(node.lastHeartbeat).toLocaleString()}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
```
