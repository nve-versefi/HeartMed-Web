import React, { useState, useEffect } from 'react';
import { MenuItem, SubMenuItem, Problem, Service } from './menudata.types';

interface EditingItem {
  level: 'menuItem' | 'submenu' | 'problem' | 'service';
  item: MenuItem | SubMenuItem | Problem | Service;
  parentId?: string;
  problemId?: string;
}

function isMenuItem(item: any): item is MenuItem {
  return item && typeof item === 'object' && 'title' in item && 'id' in item;
}

function isSubMenuItem(item: any): item is SubMenuItem {
  return item && typeof item === 'object' && 'name' in item && 'path' in item && !('services' in item);
}

function isProblem(item: any): item is Problem {
  return item && typeof item === 'object' && 'name' in item && 'services' in item;
}

function isService(item: any): item is Service {
  return item && typeof item === 'object' && 'serviceName' in item && 'servicePath' in item;
}

const NavbarManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [addingItem, setAddingItem] = useState<{level: string; parentId?: string; problemId?: string} | null>(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/menu');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
      setError('Failed to fetch menu items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEdit = (level: 'menuItem' | 'submenu' | 'problem' | 'service', item: any, parentId?: string, problemId?: string) => {
    setEditingItem({ level, item, parentId, problemId });
  };

  const handleDelete = async (level: string, id: string, parentId?: string, problemId?: string) => {
    if (window.confirm('Seguro que quieres borrar este elemento y todos sus sub-elementos?')) {
      try {
        const queryParams = new URLSearchParams({ level, id });
        if (parentId) queryParams.append('parentId', parentId);
        if (problemId) queryParams.append('problemId', problemId);
  
        console.log('Sending delete request:', { level, id, parentId, problemId });
  
        const response = await fetch(`/api/deleteMenuItem?${queryParams.toString()}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          console.log('Elemento borrado con éxito');
          fetchMenuItems(); 
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error borrando elemento');
        }
      } catch (error) {
        console.error('Error borrando elementom:', error);
        alert('Error borrando elemento. Por favor inténtelo de nuevo.');
      }
    }
  };

  const handleAdd = (level: string, parentId?: string | number, problemId?: string) => {
    console.log('Adding item:', { level, parentId, problemId });
    setAddingItem({ level, parentId: parentId?.toString(), problemId });
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const itemData: { [k: string]: FormDataEntryValue } = Object.fromEntries(formData);
  
    try {
      let url;
      let method;
      let queryParams = new URLSearchParams();
  
      if (editingItem) {
        url = '/api/updateMenuItem';
        method = 'PUT';
        queryParams.append('level', editingItem.level);
        queryParams.append('id', 
          isMenuItem(editingItem.item) ? editingItem.item.id.toString() :
          isSubMenuItem(editingItem.item) || isProblem(editingItem.item) ? editingItem.item.name :
          isService(editingItem.item) ? editingItem.item.serviceName : ''
        );
        if (editingItem.parentId) queryParams.append('parentId', editingItem.parentId);
        if (editingItem.problemId) queryParams.append('problemId', editingItem.problemId);
      } else if (addingItem) {
        url = '/api/addMenuItem';
        method = 'POST';
        queryParams.append('level', addingItem.level);
        if (addingItem.parentId) queryParams.append('parentId', addingItem.parentId);
        if (addingItem.problemId) queryParams.append('problemId', addingItem.problemId);
      } else {
        throw new Error('Invalid operation: neither editing nor adding an item');
      }
  
      console.log('Sending request:', { url, method, queryParams: queryParams.toString(), itemData });
  
      const response = await fetch(`${url}?${queryParams.toString()}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save item');
      }
  
      const result = await response.json();
      console.log('Server response:', result);
  
      fetchMenuItems();
      setEditingItem(null);
      setAddingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item. Please try again.');
    }
  };

  const renderForm = (item?: SubMenuItem | Problem | Service) => {
    return (
      <form onSubmit={handleSubmit} className="mt-4 p-4 bg-gray-100 rounded">
        <input 
          type="text" 
          name="title" 
          defaultValue={
            item ? (
              isMenuItem(item) ? item.title : 
              (isSubMenuItem(item) || isProblem(item)) ? item.name : 
              isService(item) ? item.serviceName : ''
            ) : ''
          } 
          placeholder="Title/Name" 
          required 
          className="w-full p-2 mb-2" 
        />
        <input 
          type="text" 
          name="path" 
          defaultValue={
            item ? (
              isMenuItem(item) || isSubMenuItem(item) ? item.path : 
              isService(item) ? item.servicePath : ''
            ) : ''
          } 
          placeholder="Path" 
          className="w-full p-2 mb-2" 
        />
        <input 
          type="text" 
          name="image" 
          defaultValue={
            item ? (
              isMenuItem(item) ? item.image : 
              isSubMenuItem(item) || isProblem(item) ? item.imageUrl : ''
            ) : ''
          } 
          placeholder="Image URL" 
          className="w-full p-2 mb-2" 
        />
        {(editingItem?.level === 'menuItem' || addingItem?.level === 'menuItem') && (
          <select 
            name="newTab" 
            defaultValue={item && isMenuItem(item) ? item.newTab.toString() : 'false'} 
            className="w-full p-2 mb-2"
          >
            <option value="false">Open in same tab</option>
            <option value="true">Open in new tab</option>
          </select>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingItem ? 'Actualizar' : 'Añadir'}
        </button>
        <button type="button" onClick={() => { setEditingItem(null); setAddingItem(null); }} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
          Cancel
        </button>
      </form>
    );
  };

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <li key={item.id} className="border rounded p-4 mb-4">
        <h3 className="font-bold mb-2">{item.title}</h3>
        <p className="text-sm">Path: {item.path}</p>
        <p className="text-sm">Imagen: {item.image ? '✔️' : '❌'}</p>
        <p className="text-sm">New Tab: {item.newTab ? 'Yes' : 'No'}</p>
        <div className="mt-2">
          <button onClick={() => handleAdd('submenu', item.id.toString())} className="bg-green-500 text-white px-2 py-1 rounded">Añadir Submenú</button>
        </div>
        {item.submenu && item.submenu.length > 0 && (
          <div className="mt-2">
            <button 
              onClick={() => toggleExpand(`submenu-${item.id}`)}
              className="text-blue-500 underline"
            >
              {expandedItems[`submenu-${item.id}`] ? 'Esconder' : 'Enseñar'} Submenús
            </button>
            {expandedItems[`submenu-${item.id}`] && (
              <ul className="ml-4 mt-2">
                {renderSubmenus(item.submenu, item.id.toString())}
              </ul>
            )}
          </div>
        )}
      </li>
    ));
  };

  const renderSubmenus = (submenus: SubMenuItem[], parentId: string) => {
    return submenus.map((submenu, index) => (
      <li key={`${parentId}-submenu-${index}`} className="border-l-2 border-gray-300 pl-4 py-2">
        <h4 className="font-semibold">{submenu.name}</h4>
        <p className="text-sm">Path: {submenu.path}</p>
        <div className="mt-2">
          <button onClick={() => handleEdit('submenu', submenu, parentId)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Editar</button>
          <button onClick={() => handleDelete('submenu', submenu.name, parentId)} className="bg-red-500 text-white px-2 py-1 rounded mr-2">Borrar</button>
          <button onClick={() => handleAdd('problem', submenu.name)} className="bg-green-500 text-white px-2 py-1 rounded">Añadir Problema</button>
        </div>
        {submenu.problems && submenu.problems.length > 0 && (
          <div className="mt-2">
            <button 
              onClick={() => toggleExpand(`problems-${parentId}-${index}`)}
              className="text-blue-500 underline"
            >
              {expandedItems[`problems-${parentId}-${index}`] ? 'Esconder' : 'Enseñar'} Problemas/Objetivos
            </button>
            {expandedItems[`problems-${parentId}-${index}`] && (
              <ul className="ml-4 mt-2">
                {renderProblems(submenu.problems, submenu.name)}
              </ul>
            )}
          </div>
        )}
        {(editingItem?.level === 'submenu' && editingItem.item === submenu) && renderForm(submenu)}
      </li>
    ));
  };

  const renderProblems = (problems: Problem[], submenuName: string) => {
    return problems.map((problem, index) => (
      <li key={`${submenuName}-problem-${index}`} className="border-l-2 border-gray-300 pl-4 py-2">
        <h5 className="font-semibold">{problem.name}</h5>
        <p className="text-sm">Imagen: {problem.imageUrl ? '✔️' : '❌'}</p>
        <div className="mt-2">
          <button onClick={() => handleEdit('problem', problem, submenuName)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Editar</button>
          <button onClick={() => handleDelete('problem', problem.name, submenuName)} className="bg-red-500 text-white px-2 py-1 rounded mr-2">Borrar</button>
          <button onClick={() => handleAdd('service', submenuName, problem.name)} className="bg-green-500 text-white px-2 py-1 rounded">Añadir Servicio/Tratamiento</button>
        </div>
        {problem.services && problem.services.length > 0 && (
          <div className="mt-2">
            <button 
              onClick={() => toggleExpand(`services-${submenuName}-${index}`)}
              className="text-blue-500 underline"
            >
              {expandedItems[`services-${submenuName}-${index}`] ? 'Esconder' : 'Enseñar'} Servicios/Tratamientos
            </button>
            {expandedItems[`services-${submenuName}-${index}`] && (
              <ul className="ml-4 mt-2">
                {renderServices(problem.services, submenuName, problem.name)}
              </ul>
            )}
          </div>
        )}
        {(editingItem?.level === 'problem' && editingItem.item === problem) && renderForm(problem)}
      </li>
    ));
  };

  const renderServices = (services: Service[], submenuName: string, problemName: string) => {
    return services.map((service, index) => (
      <li key={`service-${index}`} className="border-l-2 border-gray-300 pl-4 py-2">
        <h6 className="font-semibold">{service.serviceName}</h6>
        <p className="text-sm">Path: {service.servicePath}</p>
        <div className="mt-2">
          <button onClick={() => handleEdit('service', service, submenuName, problemName)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Editar</button>
          <button onClick={() => handleDelete('service', service.serviceName, submenuName, problemName)} className="bg-red-500 text-white px-2 py-1 rounded mr-2">Borrar</button>
        </div>
        {(editingItem?.level === 'service' && editingItem.item === service) && renderForm(service)}
      </li>
    ));
  };

  if (loading) {
    return <div>Cargando elementos de los menús...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4 text-center">Administración de Menús</h1>
      {addingItem && renderForm()}
      {menuItems.length > 0 ? (
        <ul>{renderMenuItems(menuItems)}</ul>
      ) : (
        <p>No menu items to display</p>
      )}
    </div>
  );
};

export default NavbarManagement;