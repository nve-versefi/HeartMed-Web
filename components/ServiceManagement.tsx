//components/ServiceManagement.tsx

import React, { useState, useEffect, useRef } from 'react';
import Modal from './modal';  
import ServiceInfoPreview from './ServiceInfoPreview';  
import 'tailwindcss/tailwind.css';
import {
  GiArm, GiAbdominalArmor, GiChestArmor, GiLips, GiLeg, GiBodyHeight,
  GiBrain, GiNeckBite, GiKneeCap, GiBarefoot, GiFootprint, GiHand, GiBackPain,
  GiElbowPad, GiUnderwearShorts
} from 'react-icons/gi';
import { ImCross } from "react-icons/im";
import { FaFaceLaughBeam, FaRegEye, FaEarListen } from "react-icons/fa6";
import { MdOutlineAirlineSeatLegroomExtra } from "react-icons/md";
import { IoBody } from "react-icons/io5";

interface Service {
  _id: string;
  title: string;
  category: string;
  subcategory: string;
  image1_title: string;
  image2_title: string;
  image3_title: string;
  image1?: string;
  image2?: string;
  image3?: string;
  subtitle1?: string;
  what?: string;
  anesthesia?: string;
  time?: string;
  finance?: string;
  results?: string;
  hospital?: string;
  subtitle2?: string;
  how?: string;
  subtitle3?: string;
  area?: string;
  objective1?: string;
  objective2?: string;
  extra?: string;
  faq1?: string;
  answer1?: string;
  faq2?: string;
  answer2?: string;
  faq3?: string;
  answer3?: string;
  faq4?: string;
  answer4?: string;
  faq5?: string;
  answer5?: string;
  faq6?: string;
  answer6?: string;
  faq7?: string;
  answer7?: string;
  faq8?: string;
  answer8?: string;
  faq9?: string;
  answer9?: string;
  targetAreas?: string[];
  objectives?: string[];
  relatedProd?: string[];
}

const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [imageFiles, setImageFiles] = useState<{ [key: string]: File | string | null }>({ image1: null, image2: null, image3: null });
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterSubcategory, setFilterSubcategory] = useState<string>('');
  const [filterProblem, setFilterProblem] = useState<string>('');
  const [sortField, setSortField] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);  
  const [serviceData, setServiceData] = useState<Service>({} as Service);  

  const iconMapping: { [key: string]: React.ReactNode } = {
    'hombros': <GiArm />,
    'piernas': <GiLeg />,
    'cuerpo': <GiBodyHeight />,
    'cabeza': <GiBrain />,
    'cuello': <GiNeckBite />,
    'rodillas': <GiKneeCap />,
    'tobillos': <GiBarefoot />,
    'pies': <GiFootprint />,
    'manos': <GiHand />,
    'codos': <GiElbowPad />,
    'cadera': <GiUnderwearShorts />,
    'espalda': <GiBackPain />,
    'facial': <FaFaceLaughBeam />,
    'mejillas': <FaFaceLaughBeam />,
    'ojos': <FaRegEye />,
    'labios': <GiLips />,
    'gluteos': < MdOutlineAirlineSeatLegroomExtra />,
    'abdomen': <GiAbdominalArmor />,
    'pecho': <GiChestArmor />,
    'orejas': <FaEarListen />,
    'corporal': <IoBody />
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterAndSortServices();
  }, [services, filterCategory, filterSubcategory, filterProblem, sortField, sortOrder]);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/service');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      //console.log('Fetched services data:', data); 
      setServices(data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  const filterAndSortServices = () => {
    let filtered = [...services];

    if (filterCategory) {
      filtered = filtered.filter(service => service.category === filterCategory);
    }

    if (filterSubcategory) {
      filtered = filtered.filter(service => service.subcategory === filterSubcategory);
    }

    if (filterProblem) {
      filtered = filtered.filter(service => service.objectives?.includes(filterProblem));
    }

    filtered.sort((a, b) => {
      const aValue = a[sortField as keyof Service];
      const bValue = b[sortField as keyof Service];

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

    setFilteredServices(filtered);
  };

  const fetchServiceDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/service?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEditingService(data.service);
      setServiceData(data.service); 
      setIsModalOpen(true);  
    } catch (error) {
      console.error('Failed to fetch service details:', error);
    }
  };

  const addService = async (service: Omit<Service, '_id'>) => {
    try {
      const formData = new FormData();
      formData.append('title', service.title);
      formData.append('category', service.category);
      formData.append('subcategory', service.subcategory);
      formData.append('image1_title', service.image1_title);
      formData.append('image2_title', service.image2_title);
      formData.append('image3_title', service.image3_title);
      if (imageFiles.image1) formData.append('image1', imageFiles.image1 as File);
      if (imageFiles.image2) formData.append('image2', imageFiles.image2 as File);
      if (imageFiles.image3) formData.append('image3', imageFiles.image3 as File);
      formData.append('subtitle1', service.subtitle1 || '');
      formData.append('what', service.what || '');
      formData.append('subtitle2', service.subtitle2 || '');
      formData.append('how', service.how || '');
      formData.append('subtitle3', service.subtitle3 || '');
      formData.append('area', service.area || '');
      formData.append('objective1', service.objective1 || '');
      formData.append('objective2', service.objective2 || '');
      formData.append('extra', service.extra || '');
      formData.append('time', service.time || '');
      formData.append('anesthesia', service.anesthesia || '');
      formData.append('finance', service.finance || '');
      formData.append('results', service.results || '');
      formData.append('hospital', service.hospital || '');
      formData.append('faq1', service.faq1 || '');
      formData.append('answer1', service.answer1 || '');
      formData.append('faq2', service.faq2 || '');
      formData.append('answer2', service.answer2 || '');
      formData.append('faq3', service.faq3 || '');
      formData.append('answer3', service.answer3 || '');
      formData.append('faq4', service.faq4 || '');
      formData.append('answer4', service.answer4 || '');
      formData.append('faq5', service.faq5 || '');
      formData.append('answer5', service.answer5 || '');
      formData.append('faq6', service.faq6 || '');
      formData.append('answer6', service.answer6 || '');
      formData.append('faq7', service.faq7 || '');
      formData.append('answer7', service.answer7 || '');
      formData.append('faq8', service.faq8 || '');
      formData.append('answer8', service.answer8 || '');
      formData.append('faq9', service.faq9 || '');
      formData.append('answer9', service.answer9 || '');
      formData.append('targetAreas', JSON.stringify(service.targetAreas || []));
      formData.append('objectives', JSON.stringify(service.objectives || []));
      formData.append('relatedProd', JSON.stringify(service.relatedProd || []));

      const response = await fetch('/api/addService', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Service added successfully.');
        setTimeout(() => setSuccessMessage(null), 5000);
        fetchServices();
      } else {
        console.error('Failed to add service', response.statusText);
      }
    } catch (error) {
      console.error('Failed to add service:', error);
    }
  };

  const updateService = async (service: Service) => {
    try {
      const formData = new FormData();
      formData.append('_id', service._id);
      formData.append('title', service.title);
      formData.append('category', service.category);
      formData.append('subcategory', service.subcategory);
      formData.append('image1_title', service.image1_title);
      formData.append('image2_title', service.image2_title);
      formData.append('image3_title', service.image3_title);
      formData.append('subtitle1', service.subtitle1 || '');
      formData.append('what', service.what || '');
      formData.append('subtitle2', service.subtitle2 || '');
      formData.append('how', service.how || '');
      formData.append('subtitle3', service.subtitle3 || '');
      formData.append('area', service.area || '');
      formData.append('objective1', service.objective1 || '');
      formData.append('objective2', service.objective2 || '');
      formData.append('extra', service.extra || '');
      formData.append('time', service.time || '');
      formData.append('anesthesia', service.anesthesia || '');
      formData.append('finance', service.finance || '');
      formData.append('results', service.results || '');
      formData.append('hospital', service.hospital || '');
      formData.append('faq1', service.faq1 || '');
      formData.append('answer1', service.answer1 || '');
      formData.append('faq2', service.faq2 || '');
      formData.append('answer2', service.answer2 || '');
      formData.append('faq3', service.faq3 || '');
      formData.append('answer3', service.answer3 || '');
      formData.append('faq4', service.faq4 || '');
      formData.append('answer4', service.answer4 || '');
      formData.append('faq5', service.faq5 || '');
      formData.append('answer5', service.answer5 || '');
      formData.append('faq6', service.faq6 || '');
      formData.append('answer6', service.answer6 || '');
      formData.append('faq7', service.faq7 || '');
      formData.append('answer7', service.answer7 || '');
      formData.append('faq8', service.faq8 || '');
      formData.append('answer8', service.answer8 || '');
      formData.append('faq9', service.faq9 || '');
      formData.append('answer9', service.answer9 || '');
      formData.append('targetAreas', JSON.stringify(service.targetAreas || []));
      formData.append('objectives', JSON.stringify(service.objectives || []));
      formData.append('relatedProd', JSON.stringify(service.relatedProd || []));

      if (imageFiles.image1) formData.append('image1', imageFiles.image1 as File);
      if (imageFiles.image2) formData.append('image2', imageFiles.image2 as File);
      if (imageFiles.image3) formData.append('image3', imageFiles.image3 as File);

      const response = await fetch('/api/updateService', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        console.log('Service updated successfully.');
        setSuccessMessage('Service updated successfully.');
        setTimeout(() => setSuccessMessage(null), 5000);
        fetchServices();
      } else {
        console.error('Failed to update service', response.statusText);
      }
    } catch (error) {
      console.error('Failed to update service:', error);
    }
  };

  const deleteService = async (serviceId: string) => {
    try {
      const response = await fetch(`/api/deleteService?id=${serviceId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchServices();
      } else {
        console.error('Failed to delete service');
      }
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'image1' | 'image2' | 'image3') => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFiles(prevFiles => ({
        ...prevFiles,
        [field]: file,
      }));
      setServiceData(prevData => ({
        ...prevData,
        [field]: URL.createObjectURL(file)  
      }));
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setServiceData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const service: Omit<Service, '_id'> = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      subcategory: formData.get('subcategory') as string,
      image1_title: formData.get('image1_title') as string,
      image2_title: formData.get('image2_title') as string,
      image3_title: formData.get('image3_title') as string,
      subtitle1: formData.get('subtitle1') as string,
      what: formData.get('what') as string,
      subtitle2: formData.get('subtitle2') as string,
      how: formData.get('how') as string,
      subtitle3: formData.get('subtitle3') as string,
      area: formData.get('area') as string,
      objective1: formData.get('objective1') as string,
      objective2: formData.get('objective2') as string,
      extra: formData.get('extra') as string,
      time: formData.get('time') as string,
      anesthesia: formData.get('anesthesia') as string,
      finance: formData.get('finance') as string,
      results: formData.get('results') as string,
      hospital: formData.get('hospital') as string,
      faq1: formData.get('faq1') as string,
      answer1: formData.get('answer1') as string,
      faq2: formData.get('faq2') as string,
      answer2: formData.get('answer2') as string,
      faq3: formData.get('faq3') as string,
      answer3: formData.get('answer3') as string,
      faq4: formData.get('faq4') as string,
      answer4: formData.get('answer4') as string,
      faq5: formData.get('faq5') as string,
      answer5: formData.get('answer5') as string,
      faq6: formData.get('faq6') as string,
      answer6: formData.get('answer6') as string,
      faq7: formData.get('faq7') as string,
      answer7: formData.get('answer7') as string,
      faq8: formData.get('faq8') as string,
      answer8: formData.get('answer8') as string,
      faq9: formData.get('faq9') as string,
      answer9: formData.get('answer9') as string,
      targetAreas: (formData.get('targetAreas') as string)?.split(',').map(area => area.trim()) || [],
      objectives: (formData.get('objectives') as string)?.split(',').map(obj => obj.trim()) || [],
      relatedProd: (formData.get('relatedProd') as string)?.split(',').map(prod => prod.trim()) || [],
    };

    if (editingService) {
      await updateService({ ...service, _id: editingService._id });
    } else {
      await addService(service);
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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, type: 'category' | 'subcategory' | 'problem') => {
    if (type === 'category') {
      setFilterCategory(e.target.value);
    } else if (type === 'subcategory') {
      setFilterSubcategory(e.target.value);
    } else if (type === 'problem') {
      setFilterProblem(e.target.value);
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

  const getIconForTargetArea = (targetAreas: string[] | undefined): React.ReactNode => {
    //console.log("getIconForTargetArea input:", targetAreas);  

    if (!targetAreas || targetAreas.length === 0) {
      //console.log("No target areas found"); 
      return <ImCross />;
    }

    const area = targetAreas[0].toLowerCase().trim();
    //console.log("Selected area:", area); 

    const icon = iconMapping[area];
    if (icon) {
      //console.log("Icon found for area:", area); 
      return icon;
    } else {
      //console.log("No icon found for area:", area);  
      return <ImCross />;
    }
  };

  const resetFormFields = () => {
    setServiceData({} as Service);
    setEditingService(null);
    setImageFiles({ image1: null, image2: null, image3: null });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4 text-center">Plataforma de Edición de Tratamientos</h1>
      
      <button onClick={() => { resetFormFields(); setIsModalOpen(true); setServiceData({} as Service); }} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Añadir Tratamiento</button>  {/* Add button to open modal */}

      <Modal isOpen={isModalOpen} onClose={() => {resetFormFields(); setIsModalOpen(false);}}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">{editingService ? 'Editar Tratamiento' : 'Añadir Tratamiento'}</h2>
            <form onSubmit={handleSubmit} ref={formRef} className="grid grid-cols-1 gap-6">
              <div className="flex flex-col">
                <label className="font-semibold">Título</label>
                <input type="text" name="title" placeholder="Title" defaultValue={editingService?.title} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Categoría</label>
                <input type="text" name="category" placeholder="Categoría" defaultValue={editingService?.category} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Subcategoría</label>
                <input type="text" name="subcategory" placeholder="Subcategoría" defaultValue={editingService?.subcategory} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Imagen 1 {editingService?.image1_title ? '✔️' : '❌'}</label>
                <input type="file" name="image1" onChange={(e) => handleImageUpload(e, 'image1')} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Subtítulo 1</label>
                <input type="text" name="subtitle1" placeholder="Subtítulo de Texto 1" defaultValue={editingService?.subtitle1} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Texto 1</label>
                <textarea name="what" placeholder="What" defaultValue={editingService?.what} onChange={handleChange} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Subtítulo 2</label>
                <input type="text" name="subtitle2" placeholder="Subtítulo de Texto 2" defaultValue={editingService?.subtitle2} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Texto 2</label>
                <textarea name="how" placeholder="How" defaultValue={editingService?.how} onChange={handleChange} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Subtítulo 3</label>
                <input type="text" name="subtitle3" placeholder="Subtítulo de Texto 3" defaultValue={editingService?.subtitle3} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Texto 3</label>
                <textarea name="area" placeholder="Area" defaultValue={editingService?.area} onChange={handleChange} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Texto Pequeño 1</label>
                <input type="text" name="objective1" placeholder="Objective 1" defaultValue={editingService?.objective1} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Texto Pequeño 2</label>
                <input type="text" name="objective2" placeholder="Objective 2" defaultValue={editingService?.objective2} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Extra</label>
                <textarea name="extra" placeholder="Extra" defaultValue={editingService?.extra} onChange={handleChange} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Imagen 2 {editingService?.image2_title ? '✔️' : '❌'}</label>
                <input type="file" name="image2" onChange={(e) => handleImageUpload(e, 'image2')} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Imagen 3 {editingService?.image3_title ? '✔️' : '❌'}</label>
                <input type="file" name="image3" onChange={(e) => handleImageUpload(e, 'image3')} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Tiempo de Realización</label>
                <input type="text" name="time" placeholder="Tiempo de Realización" defaultValue={editingService?.time} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Anestesia</label>
                <input type="text" name="anesthesia" placeholder="Anestesia" defaultValue={editingService?.anesthesia} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Financiación</label>
                <textarea name="finance" placeholder="Financiación" defaultValue={editingService?.finance} onChange={handleChange} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Resultados</label>
                <textarea name="results" placeholder="Resultados" defaultValue={editingService?.results} onChange={handleChange} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Hospitalización</label>
                <textarea name="hospital" placeholder="Detalles, tiempo, etc" defaultValue={editingService?.hospital} onChange={handleChange} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">FAQ 1</label>
                <input type="text" name="faq1" placeholder="Pregunta Frecuente 1" defaultValue={editingService?.faq1} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Respuesta 1</label>
                <textarea name="answer1" placeholder="Respuesta 1" defaultValue={editingService?.answer1} onChange={handleChange} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">FAQ 2</label>
                <input type="text" name="faq2" placeholder="Pregunta Frecuente 2" defaultValue={editingService?.faq2} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="font-semibold">Área Corporal</label>
                <input type="text" name="targetAreas" placeholder="En que zona? Facial, Corporal, etc" defaultValue={editingService?.targetAreas?.join(',')} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="font-semibold">Objetivos</label>
                <input type="text" name="objectives" placeholder="Que arregla? Reducir Arrugas, Corregir Acné, etc" defaultValue={editingService?.objectives?.join(',')} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="font-semibold">Tratamientos/Productos Relacionados</label>
                <input type="text" name="relatedProd" placeholder="Cualquier tratamiento o producto relacionado por objetivo o área" defaultValue={editingService?.relatedProd?.join(',')} onChange={handleChange} className="border rounded p-2" />
              </div>
              <div className="flex justify-end md:col-span-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingService ? 'Actualizar' : 'Añadir'}</button>
                {editingService && <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancelar</button>}
              </div>
              {successMessage && <div className="bg-green-500 text-white p-2 rounded mt-2">{successMessage}</div>}
            </form>
          </div>
          <div>
            <ServiceInfoPreview serviceData={serviceData} />
          </div>
        </div>
      </Modal>

      <h2 className="text-xl font-semibold mt-8 mb-4">Lista de Tratamientos</h2>
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2 font-semibold">Filtrar por Categoría:</label>
          <select value={filterCategory} onChange={(e) => handleFilterChange(e, 'category')} className="border rounded p-2">
            <option value="">Todas</option>
            {Array.from(new Set(services.map(service => service.category))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Filtrar por Subcategoría:</label>
          <select value={filterSubcategory} onChange={(e) => handleFilterChange(e, 'subcategory')} className="border rounded p-2">
            <option value="">Todas</option>
            {Array.from(new Set(services.map(service => service.subcategory))).map(subcategory => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Filtrar por Problema:</label>
          <select value={filterProblem} onChange={(e) => handleFilterChange(e, 'problem')} className="border rounded p-2">
            <option value="">Todos</option>
            {Array.from(new Set(services.flatMap(service => service.objectives || []))).map(problem => (
              <option key={problem} value={problem}>{problem}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Ordenar por:</label>
          <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="border rounded p-2">
            <option value="title">Título</option>
            <option value="category">Categoría</option>
          </select>
          <button onClick={() => handleSortChange(sortField)} className="ml-2 border rounded p-2">{sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}</button>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {filteredServices.map(service => {
          //console.log("Rendering service:", service.title, "Target Areas:", service.targetAreas);  
          const missingFields = [];
          if (!service.finance) missingFields.push('Financiación');
          if (!service.time) missingFields.push('Tiempo');
          if (!service.results) missingFields.push('Resultados');
          if (!service.anesthesia) missingFields.push('Anestesia');
          if (!service.hospital) missingFields.push('Hospitalización');

          return (
            <li key={service._id} className="border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">{service.title}</h3>
                <div className="text-2xl">
                  {getIconForTargetArea(service.targetAreas)}
                  {service.targetAreas && service.targetAreas.length > 0 && (
                    <div className="text-sm text-center">{service.targetAreas[0]}</div>
                  )}
                </div>
              </div>
              <p className='text-sm'>
                {service.category} &gt; {service.subcategory} &gt; 
                <span className="text-green-500 font-bold">{service.objectives ? service.objectives.join(', ') : 'Falta objetivo/problema'}</span>
              </p>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <p>Banner Servicio: {service.image1_title ? '✔️' : '❌'}</p>
                <p>Imagen 1: {service.image2_title ? '✔️' : '❌'}</p>
                <p>Imagen 2: {service.image3_title ? '✔️' : '❌'}</p>
              </div>
              <div>
                {missingFields.length > 0 || 
                !(service.what && service.how && service.area) ? (
                  <>
                    {missingFields.length > 0 && (
                      <p className="text-red-500">Falta: {missingFields.join(', ')}</p>
                    )}
                    {!(service.what && service.how && service.area) && (
                      <p className="text-red-500">Faltan algunos textos de la página</p>
                    )}
                  </>
                ) : (
                  <p className="text-green-500">Campos de texto en orden</p>
                )}
              </div>
              <button onClick={() => fetchServiceDetails(service._id)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Editar</button>
              <button onClick={() => deleteService(service._id)} className="bg-red-500 text-white px-4 py-2 rounded">Borrar</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ServiceManagement;
