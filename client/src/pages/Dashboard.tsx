import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { ExternalLink } from 'lucide-react';
import QRCode from 'react-qr-code';

// Helper component to safely render QR
const RequestQR = ({ userId }: { userId?: string }) => {
    if (!userId) return <div className="h-32 w-32 bg-slate-100 rounded animate-pulse" />;
    const url = `${import.meta.env.VITE_PUBLIC_DOMAIN || 'https://g2panda.com.tr'}/menu/${userId}`;
    return (
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={url}
                viewBox={`0 0 256 256`}
            />
        </div>
    );
};

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <Layout
            title="Özet"
            description="İşletme genel durum özeti"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-800">Dijital Menü</h3>
                            <ExternalLink className="h-5 w-5 text-slate-400" />
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                <RequestQR userId={user?.id} />
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-slate-500 mb-2">Müşterileriniz için QR Kod</p>
                                <a
                                    href={`${import.meta.env.VITE_PUBLIC_DOMAIN || 'https://g2panda.com.tr'}/menu/${user?.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-emerald-600 font-medium hover:underline text-sm flex items-center justify-center gap-1"
                                >
                                    Menüyü Görüntüle <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
