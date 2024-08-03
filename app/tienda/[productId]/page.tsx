'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DefaultLayout from '../../(default)/layout';
import ProductDetails from '@/components/ProductDetails';

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
  stock: number; // Changed from inStock to stock
}

const ProductPage: React.FC = () => {
  const params = useParams();
  const productId = params.productId as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/tienda/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          if (data.product) {
            // Ensure stock is set, defaulting to 0 if not provided by the API
            setProduct({
              ...data.product,
              stock: data.product.stock ?? 0
            });
          } else {
            setError('Product not found');
          }
        } else {
          throw new Error("Oops, we haven't got JSON!");
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setError('Failed to load product. Please try again later.');
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (error) {
    return (
      <DefaultLayout>
        <div className="text-red-500">{error}</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      {product ? (
        <ProductDetails product={product} />
      ) : (
        <div>Loading...</div>
      )}
    </DefaultLayout>
  );
};

export default ProductPage;