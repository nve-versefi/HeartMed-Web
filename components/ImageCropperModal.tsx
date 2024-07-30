import React, { useState, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import Modal from './modal';

interface ImageCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSave: (croppedImage: string) => void;
  initialImage: string;
  imageType: 'image1' | 'image2' | 'image3';
}

const ImageCropperModal: React.FC<ImageCropperModalProps> = ({ isOpen, onClose, onImageSave, initialImage, imageType }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [imageInfo, setImageInfo] = useState<{ width: number; height: number; size: string } | null>(null);

  const aspectRatios = {
    image1: 16 / 9,
    image2: 1,
    image3: 1,
  };

  useEffect(() => {
    if (initialImage) {
      const img = new Image();
      img.onload = () => {
        const size = getImageSizeInMB(initialImage);
        setImageInfo({
          width: img.width,
          height: img.height,
          size: size,
        });
      };
      img.src = initialImage;
    }
  }, [initialImage]);

  const getImageSizeInMB = (dataURL: string): string => {
    const base64Length = dataURL.split(',')[1].length;
    const sizeInBytes = (base64Length * 3) / 4;
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
    return `${sizeInMB} MB`;
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(initialImage, croppedAreaPixels);
      if (croppedImage) {
        onImageSave(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getCroppedImg = (imageSrc: string, pixelCrop: any): Promise<string | null> => {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return Promise.resolve(null);

    return new Promise((resolve) => {
      image.onload = () => {
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
          image,
          pixelCrop.x * scaleX,
          pixelCrop.y * scaleY,
          pixelCrop.width * scaleX,
          pixelCrop.height * scaleY,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        canvas.toBlob((blob) => {
          if (blob) {
            const fileUrl = URL.createObjectURL(blob);
            resolve(fileUrl);
          } else {
            resolve(null);
          }
        }, 'image/jpeg');
      };
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-[90vh]">
        <div className="flex-grow relative">
          <Cropper
            image={initialImage}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatios[imageType]}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="bg-gray-100 p-16 flex justify-between items-center">
          <div className="text-sm space-y-1">
            {imageInfo && (
              <>
                <p>Dimensiones Originales: {imageInfo.width} x {imageInfo.height} px</p>
                <p>Tamaño de Archivo: {imageInfo.size}</p>
                <p>Tipo de Imagen: {imageType === 'image1' ? 'Banner (16:9)' : 'Square (1:1)'}</p>
              </>
            )}
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={showCroppedImage} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded"
            >
              Guardar
            </button>
            <button 
              onClick={onClose} 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageCropperModal;