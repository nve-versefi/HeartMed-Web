import React, { useState, useEffect, useRef } from 'react';
import Toast from './Toast';
import Modal from './modal';
import PopUpModalPreview from './PopUpModalPreview'; 
import PopUpImageCropperModal from './ImageCropperModal4';
import 'tailwindcss/tailwind.css';

interface PopUpModal {
  _id: string;
  title: string;
  mainText: string;
  imageUrl: string;
  triggerType: 'time' | 'scroll' | 'exit';
  triggerValue: number;
  isActive: boolean;
  template: 'template1' | 'template2';
  ctaButtonText: string;
  ctaButtonLink: string;
  inputLabel1?: string;
  inputLabel2?: string;
  smallText?: string;
}

interface CroppedImageData {
  croppedImageUrl: string;
  crop: { x: number; y: number };
  zoom: number;
  aspect: number;
}

const PopUpModalManagement: React.FC = () => {
  const [popUpModals, setPopUpModals] = useState<PopUpModal[]>([]);
  const [editingModal, setEditingModal] = useState<PopUpModal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<PopUpModal>({} as PopUpModal);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'error' | 'success'>('success');
  const formRef = useRef<HTMLFormElement>(null);
  const [isCropperModalOpen, setIsCropperModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    fetchPopUpModals();
  }, []);

  const fetchPopUpModals = async () => {
    try {
      const response = await fetch('/api/popUpModals');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPopUpModals(data);
    } catch (error) {
      console.error('Failed to fetch pop-up modals:', error);
    }
  };

  const fetchModalDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/popUpModals?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEditingModal(data);
      setModalData(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch modal details:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: name === 'triggerValue' ? parseFloat(value) : name === 'isActive' ? value === 'true' : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result as string);
        setIsCropperModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCroppedImageSave = async (croppedImageData: CroppedImageData) => {
    try {
      const response = await fetch(croppedImageData.croppedImageUrl);
      const blob = await response.blob();
  
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setModalData((prevData) => ({
          ...prevData,
          imageUrl: base64data, // Save the Base64 string to imageUrl
        }));
      };
    } catch (error) {
      console.error('Failed to save cropped image:', error);
      setToastMessage('Failed to save cropped image');
      setToastType('error');
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    formData.delete('imageUrl');

    const body: Partial<PopUpModal> = {
      ...Object.fromEntries(formData),
      imageUrl: modalData.imageUrl, 
      triggerValue: parseFloat(formData.get('triggerValue') as string),
      isActive: formData.get('isActive') === 'true',
    };

    if (editingModal && editingModal._id) {
      body._id = editingModal._id;
      await updatePopUpModal(body);
    } else {
      await addPopUpModal(body);
    }

    if (formRef.current) {
      formRef.current.reset();
      resetFormFields();
      setIsModalOpen(false);
    }
  };

  const addPopUpModal = async (modal: Partial<PopUpModal>) => {
    try {
      const response = await fetch('/api/addPopUpModal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modal),
      });

      if (response.ok) {
        setToastMessage('Pop-up modal added successfully.');
        setToastType('success');
        fetchPopUpModals();
      } else {
        setToastMessage('Failed to add pop-up modal');
        setToastType('error');
      }
    } catch (error) {
      console.error('Failed to add pop-up modal:', error);
      setToastMessage('Failed to add pop-up modal');
      setToastType('error');
    }
  };

  const updatePopUpModal = async (modal: Partial<PopUpModal>) => {
    try {
      const response = await fetch('/api/updatePopUpModal', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modal),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setToastMessage('Pop-up modal updated successfully.');
      setToastType('success');
      fetchPopUpModals();
    } catch (error) {
      console.error('Failed to update pop-up modal:', error);
      if (error instanceof Error) {
        setToastMessage(`Failed to update pop-up modal: ${error.message}`);
      } else {
        setToastMessage('Failed to update pop-up modal');
      }
      setToastType('error');
    }
  };

  const deletePopUpModal = async (modalId: string) => {
    try {
      const response = await fetch(`/api/deletePopUpModal?id=${modalId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPopUpModals();
        setToastMessage('Pop-up modal deleted successfully.');
        setToastType('success');
      } else {
        setToastMessage('Failed to delete pop-up modal');
        setToastType('error');
      }
    } catch (error) {
      console.error('Failed to delete pop-up modal:', error);
      setToastMessage('Failed to delete pop-up modal');
      setToastType('error');
    }
  };

  const handleToggleActive = async (modalId: string, currentIsActive: boolean) => {
    try {
      const response = await fetch('/api/updatePopUpModal', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: modalId, isActive: !currentIsActive }),  
      });
  
      if (response.ok) {
        setToastMessage('Pop-up modal status updated successfully.');
        setToastType('success');
        fetchPopUpModals(); 
      } else {
        setToastMessage('Failed to update pop-up modal status');
        setToastType('error');
      }
    } catch (error) {
      console.error('Failed to update pop-up modal status:', error);
      setToastMessage('Failed to update pop-up modal status');
      setToastType('error');
    }
  };
  

  const handleCancel = () => {
    resetFormFields();
    setIsModalOpen(false);
  };

  const resetFormFields = () => {
    setModalData({} as PopUpModal);
    setEditingModal(null);
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4 text-center">Pop-Up Modal Management</h1>
      <button
        onClick={() => {
          resetFormFields();
          setIsModalOpen(true);
          setModalData({} as PopUpModal);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Pop-Up Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCancel}>
        <div className="w-[95vw] h-[95vh] max-w-[1800px] max-h-[1000px] mx-auto flex flex-col">
          <div className="flex-grow overflow-hidden flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 overflow-y-auto p-6">
              <h2 className="text-2xl font-semibold mb-6">{editingModal ? 'Edit Pop-Up Modal' : 'Add Pop-Up Modal'}</h2>
              <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Template</label>
                  <select
                    name="template"
                    value={modalData.template || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  >
                    <option value="template1">Template 1</option>
                    <option value="template2">Template 2</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={modalData.title || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                </div>

                {modalData.template === 'template1' && (
                  <>
                    <div className="flex flex-col">
                      <label className="font-semibold mb-1">Input Label 1</label>
                      <input
                        type="text"
                        name="inputLabel1"
                        placeholder="Input Label 1"
                        value={modalData.inputLabel1 || ''}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold mb-1">Input Label 2</label>
                      <input
                        type="text"
                        name="inputLabel2"
                        placeholder="Input Label 2"
                        value={modalData.inputLabel2 || ''}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                      />
                    </div>
                  </>
                )}

                {modalData.template === 'template2' && (
                  <div className="flex flex-col">
                    <label className="font-semibold mb-1">Small Text</label>
                    <input
                      type="text"
                      name="smallText"
                      placeholder="Small Text"
                      value={modalData.smallText || ''}
                      onChange={handleChange}
                      className="border rounded p-2 w-full"
                    />
                  </div>
                )}

                <div className="flex flex-col">
                  <label className="font-semibold mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    name="ctaButtonText"
                    placeholder="CTA Button Text"
                    value={modalData.ctaButtonText || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold mb-1">CTA Button Link</label>
                  <input
                    type="text"
                    name="ctaButtonLink"
                    placeholder="CTA Button Link"
                    value={modalData.ctaButtonLink || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Image URL</label>
                  <input
                    type="file"
                    name="imageUrl"
                    onChange={handleImageUpload}
                    className="border rounded p-2 w-full"
                    accept="image/*"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Trigger Type</label>
                  <select
                    name="triggerType"
                    value={modalData.triggerType || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  >
                    <option value="time">Time</option>
                    <option value="scroll">Scroll</option>
                    <option value="exit">Exit Intent</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Trigger Value</label>
                  <input
                    type="number"
                    name="triggerValue"
                    placeholder="Trigger Value"
                    value={modalData.triggerValue || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Active</label>
                  <select
                    name="isActive"
                    value={modalData.isActive?.toString() || ''}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="flex justify-center space-x-4">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    {editingModal ? 'Update' : 'Save'}
                  </button>
                  <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            {/* Preview Section */}
            <div className="w-full lg:w-1/2 overflow-y-auto p-6 border-t lg:border-t-0 lg:border-l">
              <div className="bg-gray-100 p-4 rounded">
                <h2 className="text-xl font-semibold mb-4">Modal Preview</h2>
                {modalData && (
                  <PopUpModalPreview modalData={modalData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <PopUpImageCropperModal
        isOpen={isCropperModalOpen}
        onClose={() => setIsCropperModalOpen(false)}
        onImageSave={handleCroppedImageSave}
        initialImage={currentImage || ''}
        template={modalData.template || 'template1'}
      />

      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={closeToast} />
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4">Pop-Up Modals List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {popUpModals.map((modal) => (
          <li key={modal._id} className="border rounded p-4 flex flex-col">
            <h3 className="font-bold mb-2">{modal.title}</h3>
            <p className="text-sm mb-2">Trigger: {modal.triggerType} - {modal.triggerValue}</p>
            <p className="text-sm mb-2">
              Active: 
              <button
                onClick={() => handleToggleActive(modal._id, modal.isActive)}
                className={`ml-2 px-4 py-2 rounded ${modal.isActive ? 'bg-green-500' : 'bg-gray-500'} text-white`}
              >
                {modal.isActive ? 'On' : 'Off'}
              </button>
            </p>
            {modal.imageUrl && (
              <img src={modal.imageUrl} alt={modal.title} className="w-full h-40 object-cover mb-2" />
            )}
            <div className="mt-auto">
              <button
                onClick={() => fetchModalDetails(modal._id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => deletePopUpModal(modal._id)}
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

export default PopUpModalManagement;