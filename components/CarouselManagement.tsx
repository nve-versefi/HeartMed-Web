//components/CarouselManagement.tsx:
import React, { useState, useEffect, useRef } from 'react';
import Toast from './Toast';
import Modal from './modal';
import CarouselImageCropperModal from './ImageCropperModal3';
import CarouselItemPreview from './CarouselItemPreview';
import 'tailwindcss/tailwind.css';

interface CarouselItem {
  _id: string;
  imageUrl: string;
  title: string;
  buttonText: string;
  order: number;
}

interface CroppedImageData {
  croppedImageUrl: string;
  crop: { x: number; y: number };
  zoom: number;
  aspect: number;
}

const CarouselManagement: React.FC = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [editingItem, setEditingItem] = useState<CarouselItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemData, setItemData] = useState<CarouselItem>({} as CarouselItem);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'error' | 'success'>('success');
  const formRef = useRef<HTMLFormElement>(null);
  const [isCropperModalOpen, setIsCropperModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    fetchCarouselItems();
  }, []);

  const fetchCarouselItems = async () => {
    try {
      const response = await fetch('/api/carousel');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCarouselItems(data);  
    } catch (error) {
      console.error('Failed to fetch carousel items:', error);
    }
  };

  const fetchItemDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/carousel?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched item details:', data);
      
      if (Array.isArray(data) && data.length > 0) {
        const item = data.find(item => item._id === id);
        if (item) {
          setEditingItem(item);
          setItemData(item);
        } else {
          console.error('Item not found in the fetched data');
        }
      } else if (data._id === id) {
        setEditingItem(data);
        setItemData(data);
      } else {
        console.error('Fetched data does not contain the requested item');
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch item details:', error);
    } 
  };

  const addCarouselItem = async (item: FormData) => {
    try {
      const response = await fetch('/api/addCarouselItem', {
        method: 'POST',
        body: item,
      });

      if (response.ok) {
        setToastMessage('Carousel item added successfully.');
        setToastType('success');
        fetchCarouselItems();
      } else {
        setToastMessage('Failed to add carousel item');
        setToastType('error');
      }
    } catch (error) {
      console.error('Failed to add carousel item:', error);
      setToastMessage('Failed to add carousel item');
      setToastType('error');
    }
  };

  const updateCarouselItem = async (item: FormData) => {
    try {
      const response = await fetch('/api/updateCarouselItem', {
        method: 'PUT',
        body: item,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Update result:', result); 
      setToastMessage('Carousel item updated successfully.');
      setToastType('success');
      fetchCarouselItems();
    } catch (error) {
      console.error('Failed to update carousel item:', error);
      setToastMessage(`Failed to update carousel item: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setToastType('error');
    }
  };

  const deleteCarouselItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/deleteCarouselItem?id=${itemId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCarouselItems();
        setToastMessage('Carousel item deleted successfully.');
        setToastType('success');
      } else {
        setToastMessage('Failed to delete carousel item');
        setToastType('error');
      }
    } catch (error) {
      console.error('Failed to delete carousel item:', error);
      setToastMessage('Failed to delete carousel item');
      setToastType('error');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; 
      if (file.size > maxSize) {
        setToastMessage(`The file "${file.name}" is too large. Maximum allowed size is 5MB.`);
        setToastType('error');
        e.target.value = ''; 
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result as string);
        setIsCropperModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCroppedImage = (croppedImageData: CroppedImageData) => {
    setItemData(prevData => ({
      ...prevData,
      imageUrl: croppedImageData.croppedImageUrl,
    }));
    setIsCropperModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemData(prevData => ({
      ...prevData,
      [name]: name === 'order' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  
    if (itemData.imageUrl) {
      if (typeof itemData.imageUrl === 'string' && itemData.imageUrl.startsWith('data:')) {
        const response = await fetch(itemData.imageUrl);
        const blob = await response.blob();
        formData.set('image', blob, 'image.jpg');
      }
    }
  
    if (editingItem && editingItem._id) {
      console.log('Editing item:', editingItem);
      formData.append('_id', editingItem._id);
      await updateCarouselItem(formData);
    } else {
      await addCarouselItem(formData);
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

  const resetFormFields = () => {
    setItemData({} as CarouselItem);
    setEditingItem(null); 
  };
  

  const closeToast = () => {
    setToastMessage(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4 text-center">Carousel Management</h1>
      <button onClick={() => { resetFormFields(); setIsModalOpen(true); setItemData({} as CarouselItem); }} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Carousel Item</button>
      
      <Modal isOpen={isModalOpen} onClose={handleCancel}>
  <div className="w-[95vw] max-w-[800px] mx-auto">
    <h2 className="text-2xl font-semibold mb-6">{editingItem ? 'Edit Carousel Item' : 'Add Carousel Item'}</h2>
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2">
        <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={itemData.title || ''}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Button Text</label>
              <input
                type="text"
                name="buttonText"
                placeholder="Button Text"
                value={itemData.buttonText || ''}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Order</label>
              <input
                type="number"
                name="order"
                placeholder="Order"
                value={itemData.order || ''}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageUpload}
                className="border rounded p-2 w-full"
                accept="image/*"
              />
              <p className="text-sm text-gray-500 mt-1">Maximum size: 5MB</p>
            </div>
            {itemData.imageUrl && (
              <div className="mt-4">
                <img src={itemData.imageUrl} alt="Preview" className="max-w-full h-auto" />
              </div>
            )}
            <div className="flex justify-center space-x-4">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                {editingItem ? 'Update' : 'Save'}
              </button>
              <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                Cancel
              </button>
            </div>
            </form>
      </div>
      <div className="w-full md:w-1/2">
        <CarouselItemPreview item={itemData} />
      </div>
    </div>
  </div>
</Modal>

      <CarouselImageCropperModal
        isOpen={isCropperModalOpen}
        onClose={() => setIsCropperModalOpen(false)}
        onImageSave={handleCroppedImage}
        initialImage={currentImage || ''}
      />

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={closeToast}
        />
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4">Carousel Items List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {carouselItems.map(item => (
    <li key={item._id} className="border rounded p-4 flex flex-col">
      <h3 className="font-bold mb-2">{item.title}</h3>
      <p className="text-sm mb-2">Button Text: {item.buttonText}</p>
      <p className="text-sm mb-2">Order: {item.order}</p>
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover mb-2" />
      )}
      <div className="mt-auto">
        <button 
          onClick={() => fetchItemDetails(item._id)}  
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600 transition-colors"
        >
          Edit
        </button>
        <button 
          onClick={() => deleteCarouselItem(item._id)} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
};

export default CarouselManagement;