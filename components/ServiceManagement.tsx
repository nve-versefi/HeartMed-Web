import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { GiArm, GiLeg, GiBodyHeight, GiBrain, GiNeckBite } from 'react-icons/gi';

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
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [imageFiles, setImageFiles] = useState<{ [key: string]: File | string | null }>({ image1: null, image2: null, image3: null });

  const iconMapping: { [key: string]: React.ReactNode } = {
    'Arm': <GiArm />,
    'Leg': <GiLeg />,
    'Body': <GiBodyHeight />,
    'Head': <GiBrain />,
    'Neck': <GiNeckBite />
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/service');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setServices(data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  const fetchServiceDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/service?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEditingService(data.service);
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
        formData.append('subtitle2', service.subtitle2|| '');
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
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
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
      targetAreas: (formData.get('targetAreas') as string)?.split(',') || [],
      objectives: (formData.get('objectives') as string)?.split(',') || [],
      relatedProd: (formData.get('relatedProd') as string)?.split(',') || [],
    };

    if (editingService) {
      await updateService({ ...service, _id: editingService._id });
    } else {
      await addService(service);
    }

    if (formRef.current) {
      formRef.current.reset();
      setEditingService(null);
      setImageFiles({ image1: null, image2: null, image3: null });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4 text-center">Plataforma de Edición de Tratamientos</h1>

      <h2 className="text-xl font-semibold mb-4">Campos de Datos</h2>
      <form onSubmit={handleSubmit} ref={formRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="font-semibold">Título</label>
          <input type="text" name="title" placeholder="Title" defaultValue={editingService?.title} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Categoría</label>
          <input type="text" name="category" placeholder="Categoría" defaultValue={editingService?.category} className="border rounded p-2" />
        </div>
        <div className="flex.flex-col">
          <label className="font-semibold">Subcategoría</label>
          <input type="text" name="subcategory" placeholder="Subcategoría" defaultValue={editingService?.subcategory} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Imagen 1 {editingService?.image1_title ? '✔️' : '❌'}</label>
          <input type="file" name="image1" onChange={(e) => handleImageUpload(e, 'image1')} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Subtítulo 1</label>
          <input type="text" name="subtitle1" placeholder="Subtítulo de Texto 1" defaultValue={editingService?.subtitle1} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Texto 1</label>
          <textarea name="what" placeholder="What" defaultValue={editingService?.what} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Subtítulo 2</label>
          <input type="text" name="subtitle2" placeholder="Subtítulo de Texto 2" defaultValue={editingService?.subtitle2} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Texto 2</label>
          <textarea name="how" placeholder="How" defaultValue={editingService?.how} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Subtítulo 3</label>
          <input type="text" name="subtitle3" placeholder="Subtítulo de Texto 3" defaultValue={editingService?.subtitle3} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Texto 3</label>
          <textarea name="area" placeholder="Area" defaultValue={editingService?.area} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Texto Pequeño 1</label>
          <input type="text" name="objective1" placeholder="Objective 1" defaultValue={editingService?.objective1} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Texto Pequeño 2</label>
          <input type="text" name="objective2" placeholder="Objective 2" defaultValue={editingService?.objective2} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Extra</label>
          <textarea name="extra" placeholder="Extra" defaultValue={editingService?.extra} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
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
          <input type="text" name="time" placeholder="Tiempo de Realización" defaultValue={editingService?.time} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Anestesia</label>
          <input type="text" name="anesthesia" placeholder="Anestesia" defaultValue={editingService?.anesthesia} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Financiación</label>
          <textarea name="finance" placeholder="Financiación" defaultValue={editingService?.finance} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Resultados</label>
          <textarea name="results" placeholder="Resultados" defaultValue={editingService?.results} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Hospitalización</label>
          <textarea name="hospital" placeholder="Detalles, tiempo, etc" defaultValue={editingService?.hospital} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">FAQ 1</label>
          <input type="text" name="faq1" placeholder="Pregunta Frecuente 1" defaultValue={editingService?.faq1} className="border rounded p-2" />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Respuesta 1</label>
          <textarea name="answer1" placeholder="Respuesta 1" defaultValue={editingService?.answer1} className="border rounded p-2" onChange={handleTextareaChange}></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">FAQ 2</label>
          <input type="text" name="faq2" placeholder="Pregunta Frecuente 2" defaultValue={editingService?.faq2} className="border rounded p-2" />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold">Área Corporal</label>
          <input type="text" name="targetAreas" placeholder="En que zona? Facial, Corporal, etc" defaultValue={editingService?.targetAreas?.join(',')} className="border rounded p-2" />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold">Objetivos</label>
          <input type="text" name="objectives" placeholder="Que arregla? Reducir Arrugas, Corregir Acné, etc" defaultValue={editingService?.objectives?.join(',')} className="border rounded p-2" />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold">Tratamientos/Productos Relacionados</label>
          <input type="text" name="relatedProd" placeholder="Cualquier tratamiento o producto relacionado por objetivo o área" defaultValue={editingService?.relatedProd?.join(',')} className="border rounded p-2" />
        </div>
        <div className="flex justify-end md:col-span-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingService ? 'Actualizar' : 'Añadir'}</button>
          {editingService && <button type="button" onClick={() => setEditingService(null)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancelar</button>}
        </div>
        {successMessage && <div className="bg-green-500 text-white p-2 rounded mt-2">{successMessage}</div>}
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-4">Lista de Tratamientos</h2>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {services.map(service => {
          const missingFields = [];
          if (!service.finance) missingFields.push('Financiación');
          if (!service.time) missingFields.push('Tiempo');
          if (!service.results) missingFields.push('Resultados');
          if (!service.anesthesia) missingFields.push('Anestesia');
          if (!service.hospital) missingFields.push('Hospitalización');

          return (
            <li key={service._id} className="border rounded p-4">
              <h3 className="font-bold mb-2">{service.title}</h3>
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

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const envUsername = process.env.NEXT_PUBLIC_ENV_USERNAME;
    const envPassword = process.env.NEXT_PUBLIC_ENV_PASSWORD;

    if (username === envUsername && password === envPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Portal HeartMed</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex items-center mb-4 border-b-2 py-2">
          <FaUser className="mr-2 text-gray-400" />
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 focus:outline-none"
          />
        </div>
        <div className="flex items-center mb-6 border-b-2 py-2">
          <FaLock className="mr-2 text-gray-400" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 focus:outline-none"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Entrar
        </button>
      </form>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return isLoggedIn ? <ServiceManagement /> : <LoginPage onLogin={handleLogin} />;
};

export default App;
