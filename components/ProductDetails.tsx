import React, { useState } from 'react';
import Image from 'next/image';
import ImagePopup from './ImagePopup';
import { useCart } from '@/components/ui/CartContext';

interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnail?: string;
  activeIngredient: string;
  brand: string;
  useCase: string;
  price: number;
  image1?: string;
  image2?: string;
  stock: number;
}

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const images = [product.thumbnail, product.image1, product.image2].filter((img): img is string => !!img);
  const { dispatch } = useCart();

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openPopup = (index: number) => {
    setCurrentImage(index);
    setShowPopup(true);
  };

  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 2));
    return deliveryDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product._id,
        name: product.title,
        price: product.price,
        quantity: quantity
      }
    });
  };

  const isInStock = product.stock > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-3/4 pr-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 mb-8">
              <div className="relative">
                <Image 
                  src={images[currentImage]} 
                  alt={`${product.title} - image ${currentImage + 1}`} 
                  width={400}
                  height={400}
                  className="w-full h-auto cursor-pointer"
                  onClick={() => openPopup(currentImage)}
                />
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
              </div>
              <div className="flex mt-4 space-x-2">
                {images.map((img, index) => (
                  <div key={index} className="w-16 h-16 relative">
                    <Image 
                      src={img} 
                      alt={`${product.title} - thumbnail ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className={`cursor-pointer ${currentImage === index ? 'border-2 border-blue-500' : ''}`}
                      onClick={() => setCurrentImage(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-2/3 px-4">
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="mb-4">{product.description}</p>
              <p className="mb-2"><strong>Categoría:</strong> {product.category}</p>
              <p className="mb-2"><strong>Marca:</strong> {product.brand || 'No especificada'}</p>
              {product.activeIngredient && (
                <p className="mb-2"><strong>Ingredientes Activos:</strong> {product.activeIngredient}</p>
              )}
              {product.useCase && (
                <p className="mb-2"><strong>Uso:</strong> {product.useCase}</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/4 mt-8 lg:mt-0">
          <div className="border rounded p-4 sticky top-4">
            <p className="text-3xl font-bold text-red-600 mb-4">€{product.price.toFixed(2)}</p>
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
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[...Array(Math.min(5, product.stock))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <button 
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded mb-2"
                  onClick={handleAddToCart}
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

      {showPopup && (
        <ImagePopup 
          images={images}
          currentIndex={currentImage}
          onClose={() => setShowPopup(false)}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
};

export default ProductDetails;