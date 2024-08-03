import React, { useState, useEffect, useRef } from 'react';
import Toast from './Toast';
import Modal from './modal';
import ProductInfoPreview from './ServiceInfoPreview';
import 'tailwindcss/tailwind.css';
import ImageCropperModal from './ImageCropperModal2';

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

interface CroppedImageData {
  croppedImageUrl: string;
  crop: { x: number; y: number };
  zoom: number;
  aspect: number;
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
  const [imageFiles, setImageFiles] = useState<{ [key: string]: File | string | null }>({ thumbnail: null, image1: null, image2: null });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productData, setProductData] = useState<Product>({} as Product);
  const [isCropperModalOpen, setIsCropperModalOpen] = useState(false);
  const [currentImageField, setCurrentImageField] = useState<'thumbnail' | 'image1' | 'image2' | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'error' | 'success'>('success');

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
      setProductData(data.product);
      setIsModalOpen(true);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'thumbnail' | 'image1' | 'image2') => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 250 * 1024;
      if (file.size > maxSize) {
        setToastMessage(`El archivo "${file.name}" es demasiado grande. El tamaño máximo permitido es 250KB/0.25MB.`);
        setToastType('error');
        e.target.value = ''; 
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result as string);
        setCurrentImageField(field);
        setIsCropperModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  const handleCroppedImage = (croppedImageData: CroppedImageData) => {
    if (currentImageField) {
      setProductData(prevData => ({
        ...prevData,
        [currentImageField]: croppedImageData.croppedImageUrl,
        [`${currentImageField}Data`]: croppedImageData,
      }));
    }
    setIsCropperModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (editingProduct) {
      formData.append('_id', editingProduct._id);
      await updateProduct(formData);
    } else {
      await addProduct(formData);
    }

    if (formRef.current) {
      formRef.current.reset();
      resetFormFields();
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    resetFormFields();
    setIsModalOpen(false);
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

  const resetFormFields = () => {
    setProductData({} as Product);
    setEditingProduct(null);
    setImageFiles({ thumbnail: null, image1: null, image2: null });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4 text-center">Administración de Productos</h1>
      <button onClick={() => { resetFormFields(); setIsModalOpen(true); setProductData({} as Product); }} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Añadir Producto</button>
      
      <Modal isOpen={isModalOpen} onClose={handleCancel}>
        <div className="w-[95vw] h-[95vh] max-w-[1800px] max-h-[1000px] mx-auto flex flex-col">
          <div className="flex-grow overflow-hidden flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 overflow-y-auto p-6">
              <h2 className="text-2xl font-semibold mb-6">{editingProduct ? 'Editar Producto' : 'Añadir Producto'}</h2>
              <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Título</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={productData.title || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Descripción</label>
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={productData.description || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full h-24"
                  ></textarea>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Categoría</label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={productData.category || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Portada {productData.thumbnailTitle ? '✔️' : '❌'}</label>
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={(e) => handleImageUpload(e, 'thumbnail')}
                    className="border rounded p-2 w-full"
                    accept="image/*"
                  />
                  <p className="text-sm text-gray-500 mt-1">Tamaño máximo: 250KB/0.25MB</p>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Ingrediente Activo</label>
                  <input
                    type="text"
                    name="activeIngredient"
                    placeholder="Active Ingredient"
                    value={productData.activeIngredient || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Marca</label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={productData.brand || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Uso</label>
                  <input
                    type="text"
                    name="useCase"
                    placeholder="Use Case"
                    value={productData.useCase || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Precio</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={productData.price || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Imagen 1 {productData.image1Title ? '✔️' : '❌'}</label>
                  <input
                    type="file"
                    name="image1"
                    onChange={(e) => handleImageUpload(e, 'image1')}
                    className="border rounded p-2 w-full"
                    accept="image/*"
                  />
                  <p className="text-sm text-gray-500 mt-1">Tamaño máximo: 250KB/0.25MB</p>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Imagen 2 {productData.image2Title ? '✔️' : '❌'}</label>
                  <input
                    type="file"
                    name="image2"
                    onChange={(e) => handleImageUpload(e, 'image2')}
                    className="border rounded p-2 w-full"
                    accept="image/*"
                  />
                  <p className="text-sm text-gray-500 mt-1">Tamaño máximo: 250KB/0.25MB</p>
                </div>
                <div className="flex justify-center space-x-4 pb-24">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    {editingProduct ? 'Actualizar' : 'Guardar'}
                  </button>
                  <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full lg:w-1/2 overflow-y-auto p-6 border-t lg:border-t-0 lg:border-l">
              <div className="overflow-x-hidden">
                <div className="max-w-full">
                  <ProductInfoPreview productData={productData} />
                </div>
              </div>
            </div>
          </div>
          {successMessage && <div className="bg-green-500 text-white p-2 rounded mt-2 text-center">{successMessage}</div>}
        </div>
      </Modal>

      <ImageCropperModal
        isOpen={isCropperModalOpen}
        onClose={() => setIsCropperModalOpen(false)}
        onImageSave={handleCroppedImage}
        initialImage={currentImage || ''}
        imageType={currentImageField || 'thumbnail'}
      />

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={closeToast}
        />
      )}

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
          <input 
            type="number" 
            value={filterPrice} 
            onChange={(e) => setFilterPrice(e.target.value)}
            className="border rounded p-2" 
          />
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
          <button onClick={() => handleSortChange(sortField)} className="ml-2 border rounded p-2">
            {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
          </button>
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