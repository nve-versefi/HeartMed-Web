import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

interface Training {
  _id: string;
  title: string;
  description: string;
  category: string;
  trainer: string;
  duration: number;
  price: number;
  date: string;
}

const TrainingManagement: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [filteredTrainings, setFilteredTrainings] = useState<Training[]>([]);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterTrainer, setFilterTrainer] = useState<string>('');
  const [filterPrice, setFilterPrice] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>('');
  const [sortField, setSortField] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchTrainings();
  }, []);

  useEffect(() => {
    filterAndSortTrainings();
  }, [trainings, filterCategory, filterTrainer, filterPrice, filterDate, sortField, sortOrder]);

  const fetchTrainings = async () => {
    try {
      const response = await fetch('/api/getTrainings');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTrainings(data.trainings);
    } catch (error) {
      console.error('Failed to fetch trainings:', error);
    }
  };

  const filterAndSortTrainings = () => {
    let filtered = [...trainings];

    if (filterCategory) {
      filtered = filtered.filter(training => training.category === filterCategory);
    }

    if (filterTrainer) {
      filtered = filtered.filter(training => training.trainer === filterTrainer);
    }

    if (filterPrice) {
      const priceNumber = parseFloat(filterPrice);
      filtered = filtered.filter(training => training.price <= priceNumber);
    }

    if (filterDate) {
      filtered = filtered.filter(training => new Date(training.date) >= new Date(filterDate));
    }

    filtered.sort((a, b) => {
      const aValue = a[sortField as keyof Training];
      const bValue = b[sortField as keyof Training];

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

    setFilteredTrainings(filtered);
  };

  const fetchTrainingDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/getTrainings?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEditingTraining(data.training);
    } catch (error) {
      console.error('Failed to fetch training details:', error);
    }
  };

  const addTraining = async (training: FormData) => {
    try {
      const response = await fetch('/api/addTraining', {
        method: 'POST',
        body: training,
      });

      if (response.ok) {
        setSuccessMessage('Training added successfully.');
        setTimeout(() => setSuccessMessage(null), 5000);
        fetchTrainings();
      } else {
        console.error('Failed to add training', response.statusText);
      }
    } catch (error) {
      console.error('Failed to add training:', error);
    }
  };

  const updateTraining = async (training: FormData) => {
    try {
      const response = await fetch('/api/updateTraining', {
        method: 'PUT',
        body: training,
      });

      if (response.ok) {
        setSuccessMessage('Training updated successfully.');
        setTimeout(() => setSuccessMessage(null), 5000);
        fetchTrainings();
      } else {
        console.error('Failed to update training', response.statusText);
      }
    } catch (error) {
      console.error('Failed to update training:', error);
    }
  };

  const deleteTraining = async (trainingId: string) => {
    try {
      const response = await fetch(`/api/deleteTraining?id=${trainingId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTrainings();
      } else {
        console.error('Failed to delete training');
      }
    } catch (error) {
      console.error('Failed to delete training:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.set('duration', (formData.get('duration') as string) || '0');
    formData.set('price', (formData.get('price') as string) || '0');

    if (editingTraining) {
      formData.append('_id', editingTraining._id);
      await updateTraining(formData);
    } else {
      await addTraining(formData);
    }

    if (formRef.current) {
      formRef.current.reset();
      setEditingTraining(null);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>, type: 'category' | 'trainer' | 'price' | 'date') => {
    const value = e.target.value;
    if (type === 'category') {
      setFilterCategory(value);
    } else if (type === 'trainer') {
      setFilterTrainer(value);
    } else if (type === 'price') {
      setFilterPrice(value);
    } else if (type === 'date') {
      setFilterDate(value);
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
      <h1 className="text-2xl font-bold my-4 text-center">Administración de Formaciones</h1>

      <form onSubmit={handleSubmit} ref={formRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="font-semibold">Título</label>
          <input type="text" name="title" placeholder="Title" defaultValue={editingTraining?.title} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Descripción</label>
          <textarea name="description" placeholder="Description" defaultValue={editingTraining?.description} className="border rounded p-2"></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Categoría</label>
          <input type="text" name="category" placeholder="Category" defaultValue={editingTraining?.category} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Trainer</label>
          <input type="text" name="trainer" placeholder="Trainer" defaultValue={editingTraining?.trainer} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Duración (horas)</label>
          <input type="number" name="duration" placeholder="Duration" defaultValue={editingTraining?.duration.toString()} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Precio</label>
          <input type="number" name="price" placeholder="Price" defaultValue={editingTraining?.price.toString()} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Fecha</label>
          <input type="date" name="date" placeholder="Date" defaultValue={editingTraining?.date} className="border rounded p-2" />
        </div>
        <div className="flex justify-end md:col-span-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingTraining ? 'Update' : 'Add'}</button>
          {editingTraining && <button type="button" onClick={() => setEditingTraining(null)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancel</button>}
        </div>
        {successMessage && <div className="bg-green-500 text-white p-2 rounded mt-2">{successMessage}</div>}
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-4">Lista de Formaciones</h2>
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2 font-semibold">Filtrar por Categoría:</label>
          <select value={filterCategory} onChange={(e) => handleFilterChange(e, 'category')} className="border rounded p-2">
            <option value="">Todas</option>
            {Array.from(new Set(trainings.map(training => training.category))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Filtrar por Trainer:</label>
          <select value={filterTrainer} onChange={(e) => handleFilterChange(e, 'trainer')} className="border rounded p-2">
            <option value="">Todos</option>
            {Array.from(new Set(trainings.map(training => training.trainer))).map(trainer => (
              <option key={trainer} value={trainer}>{trainer}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Filtrar por Precio (Máximo):</label>
          <input type="number" value={filterPrice} onChange={(e) => handleFilterChange(e as unknown as React.ChangeEvent<HTMLSelectElement>, 'price')} className="border rounded p-2" />
        </div>
        <div>
          <label className="mr-2 font-semibold">Filtrar por Fecha (Desde):</label>
          <input type="date" value={filterDate} onChange={(e) => handleFilterChange(e as unknown as React.ChangeEvent<HTMLSelectElement>, 'date')} className="border rounded p-2" />
        </div>
        <div>
          <label className="mr-2 font-semibold">Ordenar por:</label>
          <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="border rounded p-2">
            <option value="title">Título</option>
            <option value="category">Categoría</option>
            <option value="price">Precio</option>
            <option value="trainer">Trainer</option>
            <option value="date">Fecha</option>
          </select>
          <button onClick={() => handleSortChange(sortField)} className="ml-2 border rounded p-2">{sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}</button>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filteredTrainings.map(training => (
          <li key={training._id} className="border rounded p-4">
            <h3 className="font-bold mb-2">{training.title}</h3>
            <p className="text-sm">{training.category}</p>
            <p className="text-sm">{training.description}</p>
            <p className="text-sm">Trainer: {training.trainer}</p>
            <p className="text-sm">Duración: {training.duration} horas</p>
            <p className="text-sm">€{typeof training.price === 'number' ? training.price.toFixed(2) : '0.00'}</p>
            <p className="text-sm">Fecha: {training.date}</p>
            <button onClick={() => fetchTrainingDetails(training._id)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Editar</button>
            <button onClick={() => deleteTraining(training._id)} className="bg-red-500 text-white px-4 py-2 rounded">Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainingManagement;
