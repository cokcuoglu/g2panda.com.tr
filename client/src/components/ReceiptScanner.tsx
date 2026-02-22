import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Loader2 } from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';

interface ScanResult {
    ocr_id: string;
    amount: number | null;
    date: string | null;
    description: string | null;
    raw_text?: string;
    items?: any[];
}

interface ReceiptScannerProps {
    onScanComplete: (data: ScanResult) => void;
    className?: string;
}

export const ReceiptScanner: React.FC<ReceiptScannerProps> = ({ onScanComplete, className }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsScanning(true);
        try {
            const formData = new FormData();
            formData.append('image', file);

            const token = localStorage.getItem('token');
            // 1. Start Processing (Advanced Async)
            const initiateRes = await axios.post('/api/ocr-advanced/process', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!initiateRes.data.success) {
                throw new Error(initiateRes.data.error || 'İşlem başlatılamadı');
            }

            const jobId = initiateRes.data.job_id;

            // 2. Poll for results
            let attempts = 0;
            const maxAttempts = 20; // 20 seconds max

            const poll = async (): Promise<any> => {
                if (attempts >= maxAttempts) throw new Error('İşlem zaman aşımına uğradı');
                attempts++;

                const statusRes = await axios.get(`/api/ocr-advanced/status/${jobId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const data = statusRes.data.data;
                if (data.status === 'completed') {
                    return data;
                } else if (data.status === 'failed') {
                    throw new Error('Analiz başarısız oldu');
                } else {
                    // Wait 1s and retry
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return poll();
                }
            };

            const finalData = await poll();

            // Transform to expected format
            onScanComplete({
                ocr_id: finalData.id,
                amount: finalData.extracted_amount,
                date: finalData.extracted_date,
                description: finalData.extracted_vendor,
                raw_text: finalData.raw_text,
                items: finalData.items || []
            });

        } catch (error: any) {
            console.error('OCR Error:', error);
            alert(`Hata: ${error.message || 'Fiş işlenirken bir hata oluştu.'}`);
        } finally {
            setIsScanning(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <input
                type="file"
                accept="image/*"
                capture="environment" // Opens camera on mobile
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            <Button
                type="button"
                variant="outline"
                onClick={handleButtonClick}
                disabled={isScanning}
                className="w-full relative overflow-hidden"
            >
                {isScanning ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Fiş Okunuyor...
                    </>
                ) : (
                    <>
                        <Camera className="mr-2 h-4 w-4" />
                        Fişi Tara / Yükle
                    </>
                )}
            </Button>
            {isScanning && (
                <p className="text-xs text-muted-foreground text-center animate-pulse">
                    Görüntü işleniyor, lütfen bekleyin...
                </p>
            )}
        </div>
    );
};
