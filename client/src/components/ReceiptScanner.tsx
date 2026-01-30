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
            const response = await axios.post('/api/ocr/scan', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                onScanComplete(response.data.data);
            } else {
                console.error('OCR Scan failed:', response.data.error);
                alert('Fiş okuma başarısız oldu. Lütfen tekrar deneyin.');
            }
        } catch (error) {
            console.error('Error uploading receipt:', error);
            alert('Fiş yüklenirken bir hata oluştu.');
        } finally {
            setIsScanning(false);
            // Reset input value to allow selecting same file again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
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
