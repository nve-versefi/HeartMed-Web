//components/ImageCropperModal3.tsx
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Modal from './modal';

interface CroppedImageData {
    croppedImageUrl: string;
    crop: { x: number; y: number };
    zoom: number;
    aspect: number;
}

interface CroppedAreaPixels {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface CarouselImageCropperModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImageSave: (croppedImageData: CroppedImageData) => void;
    initialImage: string;
}

const CarouselImageCropperModal: React.FC<CarouselImageCropperModalProps> = ({ isOpen, onClose, onImageSave, initialImage }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);

    // Set the aspect ratio for carousel images (e.g., 16:9 for widescreen)
    const aspect = 1920 / 400;

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixelsData: CroppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixelsData);
    }, []);

    const createCroppedImage = useCallback(async () => {
        if (!croppedAreaPixels) return null;

        const image = new Image();
        image.src = initialImage;
        await new Promise((resolve) => {
            image.onload = resolve;
        });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        // Set canvas size to match the hero carousel dimensions
        canvas.width = 1920;
        canvas.height = 400;

        ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            canvas.width,
            canvas.height
        );

        return new Promise<string>((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    resolve('');
                    return;
                }
                const croppedImageUrl = URL.createObjectURL(blob);
                resolve(croppedImageUrl);
            }, 'image/jpeg', 0.95); // High quality JPEG
        });
    }, [initialImage, croppedAreaPixels]);

    const showCroppedImage = useCallback(async () => {
        if (croppedAreaPixels) {
            const croppedImageUrl = await createCroppedImage();
            if (croppedImageUrl) {
                const croppedImageData: CroppedImageData = {
                    croppedImageUrl,
                    crop: { x: croppedAreaPixels.x, y: croppedAreaPixels.y },
                    zoom,
                    aspect,
                };
                onImageSave(croppedImageData);
                onClose();
            }
        }
    }, [createCroppedImage, croppedAreaPixels, zoom, aspect, onImageSave, onClose]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col h-[90vh]">
                <div className="flex-grow relative">
                    <Cropper
                        image={initialImage}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        cropShape="rect"
                        showGrid={false}
                    />
                </div>
                <div className="bg-gray-100 p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="mr-2">Zoom:</span>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-1/3"
                        />
                    </div>
                    <div>
                        <button
                            onClick={showCroppedImage}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CarouselImageCropperModal;