import React from 'react';

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
}

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-xl mb-4">Price: ${product.price.toFixed(2)}</p>
      <p className="mb-4">{product.description}</p>
      <p className="mb-2"><strong>Category:</strong> {product.category}</p>
      <p className="mb-2"><strong>Brand:</strong> {product.brand}</p>
      {product.activeIngredient && (
        <p className="mb-2"><strong>Active Ingredient:</strong> {product.activeIngredient}</p>
      )}
      {product.useCase && (
        <p className="mb-2"><strong>Use Case:</strong> {product.useCase}</p>
      )}
      {product.image1 && (
        <img src={product.image1} alt={product.title} className="mt-4 max-w-full h-auto" />
      )}
      {product.image2 && (
        <img src={product.image2} alt={`${product.title} - additional image`} className="mt-4 max-w-full h-auto" />
      )}
    </div>
  );
};

export default ProductDetails;