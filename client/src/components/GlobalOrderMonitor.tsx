import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useBusiness } from '@/context/BusinessContext';


export function GlobalOrderMonitor() {
    const { isAuthenticated, isLoading } = useAuth();
    const { hasPendingOrders, hasServiceRequests } = useBusiness();

    // Initialize Audio Context (idempotent, effectively)
    // We rely on user interaction anywhere in the app to unlock this if we can, 
    // but typically we need a specific button. The "Ses Testi" button in TableOrdersPage
    // initializes *its own* context ref. If we want global, we should share this context 
    // or rely on the user clicking "Ses Testi" which effectively enables *this* component's audio if we lift state.
    // ACTUALLY: The AudioContext needs to be created *after* interaction.
    // If we use `window.audioContext` global or a singleton module, we can share it.
    // Let's try to simply instantiate it here. If the user clicked "Ses Testi" on the tables page,
    // that might have been a local ref.
    // IMPROVEMENT: We should make "Ses Testi" available globally or just assume the user
    // interacts with the app (clicks links etc) and we try to resume.
    // Browsers usually require a click *specifically* to resume/start the context.

    // Let's expose a global event or just listen to clicks on the document once to resume?

    const audioContextRef = useRef<AudioContext | null>(null);

    // Global Unlocker to ensure AudioContext is ready
    useEffect(() => {
        const unlockAudio = () => {
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume().catch(e => console.error("Audio resume failed:", e));
            }
        };
        document.addEventListener('click', unlockAudio);
        document.addEventListener('touchstart', unlockAudio); // For mobile
        return () => {
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
        };
    }, []);


    const playNotificationSound = () => {
        // Double-Gate: Don't play sound if on menu pages
        if (window.location.pathname.toLowerCase().includes('/menu')) {
            return;
        }

        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = audioContextRef.current;

            // Ensure resumed
            if (ctx.state === 'suspended') {
                ctx.resume().catch(() => { });
            }

            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Pleasant "Ding" Sound
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.5);

            // Secondary harmonic for richness
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(1046.50, ctx.currentTime); // C6
            gain2.gain.setValueAtTime(0.05, ctx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
            osc2.start(ctx.currentTime);
            osc2.stop(ctx.currentTime + 0.4);

            console.log("GlobalOrderMonitor: Playing programmatic sound.");

        } catch (err) {
            console.error("Global Audio Error:", err);
        }
    };

    const playServiceRequestSound = () => {
        // Double-Gate: Don't play sound if on menu pages
        if (window.location.pathname.toLowerCase().includes('/menu')) {
            return;
        }

        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = audioContextRef.current;

            if (ctx.state === 'suspended') {
                ctx.resume().catch(() => { });
            }

            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Double Beep "Ding-Ding"
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.2);

            // Second beep
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.25); // E5
            gain2.gain.setValueAtTime(0.1, ctx.currentTime + 0.25);
            gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
            osc2.start(ctx.currentTime + 0.25);
            osc2.stop(ctx.currentTime + 0.45);

            console.log("GlobalOrderMonitor: Playing Service Request sound.");

        } catch (err) {
            console.error("Global Audio Error:", err);
        }
    };

    useEffect(() => {
        if (!isAuthenticated || isLoading) return;

        const isMenuPage = window.location.pathname.toLowerCase().includes('/menu');

        // Immediate Title Update on State Change
        if (isMenuPage) {
            document.title = "G2 Panda";
        } else {
            if (hasPendingOrders) {
                playNotificationSound();
                document.title = "🔔 YENİ SİPARİŞ!";
            } else if (hasServiceRequests) {
                playServiceRequestSound();
                document.title = "🔔 HESAP/GARSON İSTİYOR!";
            } else {
                document.title = "G2 Panda";
            }
        }

        const interval = setInterval(() => {
            const currentIsMenu = window.location.pathname.toLowerCase().includes('/menu');
            if (currentIsMenu) {
                if (document.title !== "G2 Panda") document.title = "G2 Panda";
                return;
            }

            if (hasPendingOrders) {
                playNotificationSound();
                document.title = document.title === "🔔 YENİ SİPARİŞ!" ? "G2 Panda" : "🔔 YENİ SİPARİŞ!";
            } else if (hasServiceRequests) {
                playServiceRequestSound();
                document.title = document.title === "🔔 HESAP/GARSON İSTİYOR!" ? "G2 Panda" : "🔔 HESAP/GARSON İSTİYOR!";
            } else {
                if (document.title !== "G2 Panda") document.title = "G2 Panda";
            }
        }, 3000);

        return () => {
            clearInterval(interval);
            document.title = "G2 Panda";
        };
    }, [isAuthenticated, isLoading, hasPendingOrders, hasServiceRequests]);

    return null; // Headless component
}
