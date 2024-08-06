import React, { useState } from 'react';
import Image from 'next/image';

interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnailTitle?: string;
  activeIngredient: string;
  brand: string;
  useCase: string;
  price: number;
  image1Title?: string;
  image2Title?: string;
  stock?: number;
}

interface ProductInfoPreviewProps {
  productData: Partial<Product>;
}

const ProductInfoPreview: React.FC<ProductInfoPreviewProps> = ({ productData }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    productData.thumbnailTitle,
    productData.image1Title,
    productData.image2Title
  ].filter((img): img is string => !!img).map(img => `/api/placeholder/400/400`);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 2));
    return deliveryDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const isInStock = productData.stock ? productData.stock > 0 : true;
  
  return (
    <div className="container mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-3/4 pr-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 mb-8">
              <div className="relative">
                {images.length > 0 && (
                  <Image 
                    src={images[currentImage]}
                    alt={`${productData.title || 'Product'} - image ${currentImage + 1}`} 
                    width={400}
                    height={400}
                    className="w-full h-auto cursor-pointer"
                  />
                )}
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage} 
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
                    >
                      &#10094;
                    </button>
                    <button 
                      onClick={nextImage} 
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
                    >
                      &#10095;
                    </button>
                  </>
                )}
              </div>
              <div className="flex mt-4 space-x-2">
                {images.map((img, index) => (
                  <Image 
                    key={index}
                    src={img}
                    alt={`${productData.title || 'Product'} - thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className={`w-16 h-16 object-cover cursor-pointer ${currentImage === index ? 'border-2 border-blue-500' : ''}`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full md:w-2/3 px-4">
              <h1 className="text-3xl font-bold mb-4">{productData.title || 'Título del Producto'}</h1>
              <p className="mb-4">{productData.description || 'Descripción del producto'}</p>
              <p className="mb-2"><strong>Categoría:</strong> {productData.category || 'No especificada'}</p>
              <p className="mb-2"><strong>Marca:</strong> {productData.brand || 'No especificada'}</p>
              {productData.activeIngredient && (
                <p className="mb-2"><strong>Ingredientes Activos:</strong> {productData.activeIngredient}</p>
              )}
              {productData.useCase && (
                <p className="mb-2"><strong>Uso:</strong> {productData.useCase}</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/4 mt-8 lg:mt-0">
          <div className="border rounded p-4 sticky top-4">
            <p className="text-3xl font-bold text-red-600 mb-4">€{(productData.price || 0).toFixed(2)}</p>
            <p className="text-sm mb-2">Sin devolución/devoluciones gratis?</p>
            {isInStock ? (
              <>
                <p className="text-sm mb-4">Entrega estimada: <span className="font-bold">{getEstimatedDeliveryDate()}</span></p>
                <p className="text-lg font-bold text-green-700 mb-4">En stock</p>
                <div className="mb-4">
                  <label htmlFor="quantity" className="block mb-2">Cantidad:</label>
                  <select 
                    id="quantity" 
                    className="w-full p-2 border rounded"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <button 
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded mb-2"
                >
                  Añadir al carrito
                </button>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                  Comprar ahora
                </button>
              </>
            ) : (
              <p className="text-lg font-bold text-red-600 mb-4">Fuera de stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoPreview;