import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

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
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterUseCase, setFilterUseCase] = useState<string>('');
  const [filterPrice, setFilterPrice] = useState<string>('');
  const [filterBrand, setFilterBrand] = useState<string>('');
  const [sortField, setSortField] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, filterCategory, filterUseCase, filterPrice, filterBrand, sortField, sortOrder]);

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

  const filterAndSortProducts = () => {
    let filtered = [...products];

    if (filterCategory) {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    if (filterUseCase) {
      filtered = filtered.filter(product => product.useCase === filterUseCase);
    }

    if (filterPrice) {
      const priceNumber = parseFloat(filterPrice);
      filtered = filtered.filter(product => product.price <= priceNumber);
    }

    if (filterBrand) {
      filtered = filtered.filter(product => product.brand === filterBrand);
    }

    filtered.sort((a, b) => {
      const aValue = a[sortField as keyof Product];
      const bValue = b[sortField as keyof Product];

      if (aValue && bValue) {
        if (aValue < bValue) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortOrder === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });

    setFilteredProducts(filtered);
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

    formData.set('price', (formData.get('price') as string) || '0'); 

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, type: 'category' | 'useCase' | 'price' | 'brand') => {
    const value = e.target.value;
    if (type === 'category') {
      setFilterCategory(value);
    } else if (type === 'useCase') {
      setFilterUseCase(value);
    } else if (type === 'price') {
      setFilterPrice(value);
    } else if (type === 'brand') {
      setFilterBrand(value);
    }
  };

  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4 text-center">Administración de Productos</h1>

      <form onSubmit={handleSubmit} ref={formRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="font-semibold">Título</label>
          <input type="text" name="title" placeholder="Title" defaultValue={editingProduct?.title} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Descripción</label>
          <textarea name="description" placeholder="Description" defaultValue={editingProduct?.description} className="border rounded p-2"></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Categoría</label>
          <input type="text" name="category" placeholder="Category" defaultValue={editingProduct?.category} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Portada</label>
          <input type="file" name="thumbnail" className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Ingrediente Activo</label>
          <input type="text" name="activeIngredient" placeholder="Active Ingredient" defaultValue={editingProduct?.activeIngredient} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Marca</label>
          <input type="text" name="brand" placeholder="Brand" defaultValue={editingProduct?.brand} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Uso</label>
          <input type="text" name="useCase" placeholder="Use Case" defaultValue={editingProduct?.useCase} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Precio</label>
          <input type="number" name="price" placeholder="Price" defaultValue={editingProduct?.price.toString()} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Imagen 1</label>
          <input type="file" name="image1" className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Imagen 2</label>
          <input type="file" name="image2" className="border rounded p-2" />
        </div>
        <div className="flex justify-end md:col-span-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingProduct ? 'Update' : 'Add'}</button>
          {editingProduct && <button type="button" onClick={() => setEditingProduct(null)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancel</button>}
        </div>
        {successMessage && <div className="bg-green-500 text-white p-2 rounded mt-2">{successMessage}</div>}
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-4">Lista de Productos</h2>
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2 font-semibold">Filtrar por Categoría:</label>
          <select value={filterCategory} onChange={(e) => handleFilterChange(e, 'category')} className="border rounded p-2">
            <option value="">Todas</option>
            {Array.from(new Set(products.map(product => product.category))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Filtrar por Uso:</label>
          <select value={filterUseCase} onChange={(e) => handleFilterChange(e, 'useCase')} className="border rounded p-2">
            <option value="">Todos</option>
            {Array.from(new Set(products.map(product => product.useCase))).map(useCase => (
              <option key={useCase} value={useCase}>{useCase}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Filtrar por Precio (Máximo):</label>
          <input type="number" value={filterPrice} onChange={(e) => handleFilterChange(e as unknown as React.ChangeEvent<HTMLSelectElement>, 'price')} className="border rounded p-2" />
        </div>
        <div>
          <label className="mr-2 font-semibold">Filtrar por Marca:</label>
          <select value={filterBrand} onChange={(e) => handleFilterChange(e, 'brand')} className="border rounded p-2">
            <option value="">Todas</option>
            {Array.from(new Set(products.map(product => product.brand))).map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Ordenar por:</label>
          <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="border rounded p-2">
            <option value="title">Título</option>
            <option value="category">Categoría</option>
            <option value="price">Precio</option>
            <option value="brand">Marca</option>
          </select>
          <button onClick={() => handleSortChange(sortField)} className="ml-2 border rounded p-2">{sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}</button>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <li key={product._id} className="border rounded p-4">
            <h3 className="font-bold mb-2">{product.title}</h3>
            <p className="text-sm">{product.category}</p>
            <p className="text-sm">{product.description}</p>
            <p className="text-sm">€{typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}</p>
            <p className="text-sm">
              Thumbnail: {product.thumbnailTitle ? '✔️' : '❌'} | 
              Image 1: {product.image1Title ? '✔️' : '❌'} | 
              Image 2: {product.image2Title ? '✔️' : '❌'}
            </p>
            <button onClick={() => fetchProductDetails(product._id)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Editar</button>
            <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white px-4 py-2 rounded">Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
