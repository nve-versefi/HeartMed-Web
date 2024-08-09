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

interface PopUpImageCropperModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImageSave: (croppedImageData: CroppedImageData) => void;
    initialImage: string;
    template: 'template1' | 'template2';
}

const PopUpImageCropperModal: React.FC<PopUpImageCropperModalProps> = ({ isOpen, onClose, onImageSave, initialImage, template }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);

    const aspect = template === 'template1' ? 1 : 1; // Square for both templates
    const targetWidth = template === 'template1' ? 400 : 128; // Adjust these values as needed
    const targetHeight = template === 'template1' ? 400 : 128;

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

        canvas.width = targetWidth;
        canvas.height = targetHeight;

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
            }, 'image/jpeg', 0.95);
        });
    }, [initialImage, croppedAreaPixels, targetWidth, targetHeight]);

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
                            Save
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PopUpImageCropperModal;
