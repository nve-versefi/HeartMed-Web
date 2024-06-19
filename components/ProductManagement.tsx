import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

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

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/getProducts');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const fetchProductDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/getProducts?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEditingProduct(data.product);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
  };

  const addProduct = async (product: FormData) => {
    try {
      const response = await fetch('/api/addProduct', {
        method: 'POST',
        body: product,
      });

      if (response.ok) {
        setSuccessMessage('Product added successfully.');
        setTimeout(() => setSuccessMessage(null), 5000);
        fetchProducts();
      } else {
        console.error('Failed to add product', response.statusText);
      }
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const updateProduct = async (product: FormData) => {
    try {
      const response = await fetch('/api/updateProduct', {
        method: 'PUT',
        body: product,
      });

      if (response.ok) {
        setSuccessMessage('Product updated successfully.');
        setTimeout(() => setSuccessMessage(null), 5000);
        fetchProducts();
      } else {
        console.error('Failed to update product', response.statusText);
      }
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/deleteProduct?id=${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProducts();
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.set('price', (formData.get('price') as string) || '0'); // Ensure price is set and convert to string

    if (editingProduct) {
      formData.append('_id', editingProduct._id);
      await updateProduct(formData);
    } else {
      await addProduct(formData);
    }

    if (formRef.current) {
      formRef.current.reset();
      setEditingProduct(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4 text-center">Product Management</h1>

      <form onSubmit={handleSubmit} ref={formRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="font-semibold">Title</label>
          <input type="text" name="title" placeholder="Title" defaultValue={editingProduct?.title} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Description</label>
          <textarea name="description" placeholder="Description" defaultValue={editingProduct?.description} className="border rounded p-2"></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Category</label>
          <input type="text" name="category" placeholder="Category" defaultValue={editingProduct?.category} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Thumbnail</label>
          <input type="file" name="thumbnail" className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Active Ingredient</label>
          <input type="text" name="activeIngredient" placeholder="Active Ingredient" defaultValue={editingProduct?.activeIngredient} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Brand</label>
          <input type="text" name="brand" placeholder="Brand" defaultValue={editingProduct?.brand} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Use Case</label>
          <input type="text" name="useCase" placeholder="Use Case" defaultValue={editingProduct?.useCase} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Price</label>
          <input type="number" name="price" placeholder="Price" defaultValue={editingProduct?.price.toString()} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Image 1</label>
          <input type="file" name="image1" className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Image 2</label>
          <input type="file" name="image2" className="border rounded p-2" />
        </div>
        <div className="flex justify-end md:col-span-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingProduct ? 'Update' : 'Add'}</button>
          {editingProduct && <button type="button" onClick={() => setEditingProduct(null)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancel</button>}
        </div>
        {successMessage && <div className="bg-green-500 text-white p-2 rounded mt-2">{successMessage}</div>}
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-4">Product List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {products.map(product => (
          <li key={product._id} className="border rounded p-4">
            <h3 className="font-bold mb-2">{product.title}</h3>
            <p className="text-sm">{product.category}</p>
            <p className="text-sm">{product.description}</p>
            <p className="text-sm">${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}</p>
            <button onClick={() => fetchProductDetails(product._id)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
            <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
