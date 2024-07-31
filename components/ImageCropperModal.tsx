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

interface ImageCropperModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImageSave: (croppedImageData: CroppedImageData) => void;
    initialImage: string;
    imageType: 'image1' | 'image2' | 'image3';
}

const ImageCropperModal: React.FC<ImageCropperModalProps> = ({ isOpen, onClose, onImageSave, initialImage, imageType }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);

    const aspectRatios = {
        image1: 16 / 9,
        image2: 1,
        image3: 1,
    };

    const aspect = aspectRatios[imageType];

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

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        );

        return new Promise<string>((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    resolve('');
                    return;
                }
                const croppedImageUrl = URL.createObjectURL(blob);
                resolve(croppedImageUrl);
            }, 'image/jpeg');
        });
    }, [initialImage, croppedAreaPixels]);

    const showCroppedImage = useCallback(async () => {
        if (croppedAreaPixels) {
            const croppedImageUrl = await createCroppedImage();
            console.log('Cropped Image URL:', croppedImageUrl);
            if (croppedImageUrl) {
                const croppedImageData: CroppedImageData = {
                    croppedImageUrl,
                    crop: { x: croppedAreaPixels.x, y: croppedAreaPixels.y },
                    zoom,
                    aspect,
                };
                console.log('Cropped Image Data:', croppedImageData);
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
                    />
                </div>
                <div className="bg-gray-100 p-4 flex justify-end">
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
        </Modal>
    );
};

export default ImageCropperModal;
