// components/MachineryManagement.tsx
import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

interface Machinery {
  _id: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  status: 'For Sale' | 'For Rent';
  price: number;
  rentalPrice: number;
  image1Title?: string;
  image2Title?: string;
}

const MachineryManagement: React.FC = () => {
  const [machineries, setMachineries] = useState<Machinery[]>([]);
  const [filteredMachineries, setFilteredMachineries] = useState<Machinery[]>([]);
  const [editingMachinery, setEditingMachinery] = useState<Machinery | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterBrand, setFilterBrand] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterPrice, setFilterPrice] = useState<string>('');
  const [sortField, setSortField] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchMachineries();
  }, []);

  useEffect(() => {
    filterAndSortMachineries();
  }, [machineries, filterCategory, filterBrand, filterStatus, filterPrice, sortField, sortOrder]);

  const fetchMachineries = async () => {
    try {
      const response = await fetch('/api/getMachineries');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMachineries(data.machineries);
    } catch (error) {
      console.error('Failed to fetch machineries:', error);
    }
  };

  const filterAndSortMachineries = () => {
    let filtered = [...machineries];

    if (filterCategory) {
      filtered = filtered.filter(machinery => machinery.category === filterCategory);
    }

    if (filterBrand) {
      filtered = filtered.filter(machinery => machinery.brand === filterBrand);
    }

    if (filterStatus) {
      filtered = filtered.filter(machinery => machinery.status === filterStatus);
    }

    if (filterPrice) {
      const priceNumber = parseFloat(filterPrice);
      filtered = filtered.filter(machinery => machinery.price <= priceNumber || machinery.rentalPrice <= priceNumber);
    }

    filtered.sort((a, b) => {
      const aValue = a[sortField as keyof Machinery];
      const bValue = b[sortField as keyof Machinery];

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

    setFilteredMachineries(filtered);
  };

  const fetchMachineryDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/getMachineries?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEditingMachinery(data.machinery);
    } catch (error) {
      console.error('Failed to fetch machinery details:', error);
    }
  };

  const addMachinery = async (machinery: FormData) => {
    try {
      const response = await fetch('/api/addMachinery', {
        method: 'POST',
        body: machinery,
      });

      if (response.ok) {
        setSuccessMessage('Machinery added successfully.');
        setTimeout(() => setSuccessMessage(null), 5000);
        fetchMachineries();
      } else {
        console.error('Failed to add machinery', response.statusText);
      }
    } catch (error) {
      console.error('Failed to add machinery:', error);
    }
  };

  const updateMachinery = async (machinery: FormData) => {
    try {
      const response = await fetch('/api/updateMachinery', {
        method: 'PUT',
        body: machinery,
      });

      if (response.ok) {
        setSuccessMessage('Machinery updated successfully.');
        setTimeout(() => setSuccessMessage(null), 5000);
        fetchMachineries();
      } else {
        console.error('Failed to update machinery', response.statusText);
      }
    } catch (error) {
      console.error('Failed to update machinery:', error);
    }
  };

  const deleteMachinery = async (machineryId: string) => {
    try {
      const response = await fetch(`/api/deleteMachinery?id=${machineryId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchMachineries();
      } else {
        console.error('Failed to delete machinery');
      }
    } catch (error) {
      console.error('Failed to delete machinery:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.set('price', (formData.get('price') as string) || '0');
    formData.set('rentalPrice', (formData.get('rentalPrice') as string) || '0');

    if (editingMachinery) {
      formData.append('_id', editingMachinery._id);
      await updateMachinery(formData);
    } else {
      await addMachinery(formData);
    }

    if (formRef.current) {
      formRef.current.reset();
      setEditingMachinery(null);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>, type: 'category' | 'brand' | 'status' | 'price') => {
    const value = e.target.value;
    if (type === 'category') {
      setFilterCategory(value);
    } else if (type === 'brand') {
      setFilterBrand(value);
    } else if (type === 'status') {
      setFilterStatus(value);
    } else if (type === 'price') {
      setFilterPrice(value);
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
      <h1 className="text-2xl font-bold my-4 text-center">Administración de Maquinaria</h1>

      <form onSubmit={handleSubmit} ref={formRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="font-semibold">Título</label>
          <input type="text" name="title" placeholder="Title" defaultValue={editingMachinery?.title} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Descripción</label>
          <textarea name="description" placeholder="Description" defaultValue={editingMachinery?.description} className="border rounded p-2"></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Categoría</label>
          <input type="text" name="category" placeholder="Category" defaultValue={editingMachinery?.category} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Marca</label>
          <input type="text" name="brand" placeholder="Brand" defaultValue={editingMachinery?.brand} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Estado</label>
          <select name="status" defaultValue={editingMachinery?.status} className="border rounded p-2">
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Precio</label>
          <input type="number" name="price" placeholder="Price" defaultValue={editingMachinery?.price.toString()} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Precio de Alquiler</label>
          <input type="number" name="rentalPrice" placeholder="Rental Price" defaultValue={editingMachinery?.rentalPrice.toString()} className="border rounded p-2" />
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingMachinery ? 'Update' : 'Add'}</button>
          {editingMachinery && <button type="button" onClick={() => setEditingMachinery(null)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancel</button>}
        </div>
        {successMessage && <div className="bg-green-500 text-white p-2 rounded mt-2">{successMessage}</div>}
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-4">Lista de Maquinaria</h2>
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2 font-semibold">Filtrar por Categoría:</label>
          <select value={filterCategory} onChange={(e) => handleFilterChange(e, 'category')} className="border rounded p-2">
            <option value="">Todas</option>
            {Array.from(new Set(machineries.map(machinery => machinery.category))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Filtrar por Marca:</label>
          <select value={filterBrand} onChange={(e) => handleFilterChange(e, 'brand')} className="border rounded p-2">
            <option value="">Todas</option>
            {Array.from(new Set(machineries.map(machinery => machinery.brand))).map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Filtrar por Estado:</label>
          <select value={filterStatus} onChange={(e) => handleFilterChange(e, 'status')} className="border rounded p-2">
            <option value="">Todos</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Filtrar por Precio (Máximo):</label>
          <input type="number" value={filterPrice} onChange={(e) => handleFilterChange(e as unknown as React.ChangeEvent<HTMLSelectElement>, 'price')} className="border rounded p-2" />
        </div>
        <div>
          <label className="mr-2 font-semibold">Ordenar por:</label>
          <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="border rounded p-2">
            <option value="title">Título</option>
            <option value="category">Categoría</option>
            <option value="price">Precio</option>
            <option value="brand">Marca</option>
            <option value="status">Estado</option>
          </select>
          <button onClick={() => handleSortChange(sortField)} className="ml-2 border rounded p-2">{sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}</button>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filteredMachineries.map(machinery => (
          <li key={machinery._id} className="border rounded p-4">
            <h3 className="font-bold mb-2">{machinery.title}</h3>
            <p className="text-sm">{machinery.category}</p>
            <p className="text-sm">{machinery.description}</p>
            <p className="text-sm">Marca: {machinery.brand}</p>
            <p className="text-sm">Estado: {machinery.status}</p>
            <p className="text-sm">€{typeof machinery.price === 'number' ? machinery.price.toFixed(2) : '0.00'} (Venta)</p>
            <p className="text-sm">€{typeof machinery.rentalPrice === 'number' ? machinery.rentalPrice.toFixed(2) : '0.00'} (Alquiler)</p>
            <p className="text-sm">
              Imagen 1: {machinery.image1Title ? '✔️' : '❌'} | 
              Imagen 2: {machinery.image2Title ? '✔️' : '❌'}
            </p>
            <button onClick={() => fetchMachineryDetails(machinery._id)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Editar</button>
            <button onClick={() => deleteMachinery(machinery._id)} className="bg-red-500 text-white px-4 py-2 rounded">Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MachineryManagement;
