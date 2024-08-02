'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import DefaultLayout from '../(default)/layout';
import { FaPlus } from 'react-icons/fa';
import { useCart } from '@/components/ui/CartContext';
import 'rc-slider/assets/index.css';
import Link from 'next/link';

const Slider = dynamic(() => import('rc-slider'), { ssr: false });

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

function ShopContent({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams ? searchParams.get('search') || '' : '';
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedUseCase, setSelectedUseCase] = useState<string>('');
  const { dispatch } = useCart();

  useEffect(() => {
    filterProducts();
  }, [search, priceRange, selectedCategory, selectedUseCase, selectedBrand]);

  const filterProducts = () => {
    let filtered = products;

    if (search) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter(product =>
        product.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    if (selectedUseCase) {
      filtered = filtered.filter(product =>
        product.useCase.toLowerCase() === selectedUseCase.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length >= 2) {
      setPriceRange([value[0], value[1]]);
    } else if (typeof value === 'number') {
      setPriceRange([value, value]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!searchParams) return;

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const value = e.target.value;

    if (value) {
      current.set('search', value);
    } else {
      current.delete('search');
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };

  const handleAddToCart = (product: Product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product._id,
        name: product.title,
        price: product.price,
        quantity: 1
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          className="w-full max-w-lg p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex">
        <div className="w-1/4 pr-4">
          <h2 className="text-xl mb-4">Filtros</h2>
          <div className="mb-4">
            <label className="block mb-2">Rango de Precio</label>
            <Slider
              range
              min={0}
              max={100}
              defaultValue={priceRange}
              onChange={handlePriceChange}
            />
            <div className="flex justify-between">
              <span>€{priceRange[0]}</span>
              <span>€{priceRange[1]}</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Categorías</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Todas</option>
              <option value="Material de Prácticas">Material de Prácticas</option>
              <option value="Suplementos">Suplementos</option>
              <option value="Salud y Belleza">Salud y Belleza</option>
              <option value="Aparatología Profesional">Aparatología Profesional</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Usos</label>
            <select
              value={selectedUseCase}
              onChange={e => setSelectedUseCase(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Todos</option>
              <option value="Hidratar">Hidratar</option>
              <option value="Practicar">Practicar</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Marcas</label>
            <select
              value={selectedBrand}
              onChange={e => setSelectedBrand(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Todas</option>
              <option value="Alfa Cosmetica">Alfa Cosmetica</option>
              <option value="Indiba">Indiba</option>
            </select>
          </div>
        </div>
        <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Link href={`/tienda/${product._id}`} key={product._id}>
                <div className="border p-4 rounded relative cursor-pointer hover:shadow-lg transition-shadow duration-300">
                  <img src={product.thumbnail} alt={product.title} className="mb-4" />
                  <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                  <p className="text-gray-700 mb-4">{product.description.substring(0, 100)}...</p>
                  <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  >
                    <FaPlus />
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function fetchWithRetry(url: string, options = {}, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying fetch. Attempts left: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

export default function ShopWrapper() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchWithRetry('/api/getProducts');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <ShopContent products={products} />
      </Suspense>
    </DefaultLayout>
  );
}