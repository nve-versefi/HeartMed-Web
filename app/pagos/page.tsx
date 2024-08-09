// app/pago/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcAmex, 
  FaCcDiscover, 
  FaCcJcb, 
  FaCcDinersClub,
  FaPaypal,
  FaStripe,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa';
import { useCart } from '../../components/ui/CartContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type FormData = {
  nombre: string;
  apellido: string;
  email: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
};

export default function PaginaPago() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    pais: '',
  });
  const [metodoPago, setMetodoPago] = useState<'stripe' | 'paypal' | null>(null);
  const [emailError, setEmailError] = useState('');
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { state: cartState } = useCart();


  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => setIsGoogleLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'email') {
      setEmailError(validateEmail(value) ? '' : 'Por favor, introduce un email válido');
    }
  };

  const initAutocomplete = (inputId: string) => {
    if (!isGoogleLoaded) return;

    const input = document.getElementById(inputId) as HTMLInputElement;
    const autocomplete = new window.google.maps.places.Autocomplete(input, { types: ['address'] });
    
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.log("No details available for input: '" + place.name + "'");
        return;
      }

      let address = '';
      let postcode = '';
      let city = '';
      let country = '';

      for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
        const componentType = component.types[0];

        switch (componentType) {
          case "street_number":
            address = `${component.long_name} ${address}`;
            break;
          case "route":
            address += component.short_name;
            break;
          case "postal_code":
            postcode = `${component.long_name}${postcode}`;
            break;
          case "postal_code_suffix":
            postcode = `${postcode}-${component.long_name}`;
            break;
          case "locality":
            city = component.long_name;
            break;
          case "country":
            country = component.long_name;
            break;
        }
      }

      setFormData(prev => ({
        ...prev,
        direccion: address,
        ciudad: city,
        codigoPostal: postcode,
        pais: country
      }));
    });
  };

  useEffect(() => {
    if (isGoogleLoaded) {
      initAutocomplete('direccion');
    }
  }, [isGoogleLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(prev => prev + 1);
    } else if (metodoPago === 'stripe') {
      await handleStripePayment();
    }
    // PayPal se maneja a través del botón de PayPal
  };

  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/crear-sesion-stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        items: cartState.items,
        total: cartState.total,
      }),
    });
    const { sessionId } = await response.json();
    
    const result = await stripe?.redirectToCheckout({ sessionId });
    if (result?.error) {
      console.error(result.error);
    }
  };

  const handlePayPalPayment = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: cartState.total.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: cartState.total.toFixed(2),
            },
          },
        },
        items: cartState.items.map(item => ({
          name: item.name,
          unit_amount: {
            currency_code: 'EUR',
            value: item.price.toFixed(2),
          },
          quantity: item.quantity,
        })),
      }],
    });
  };
  
  const onPayPalApprove = async (data: any, actions: any) => {
    const response = await fetch('/api/procesar-pago-paypal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderID: data.orderID,
        ...formData,
        items: cartState.items,
        total: cartState.total,
      }),
    });
    const resultado = await response.json();
    console.log(resultado);
    // Manejar el resultado (p.ej., mostrar mensaje de éxito, redirigir, etc.)
  };

  const renderOrderSummary = () => (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-2">Resumen del Pedido</h3>
      {isClient ? (
        <>
          {cartState.items.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>€{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2 font-bold flex justify-between">
            <span>Total:</span>
            <span>€{cartState.total.toFixed(2)}</span>
          </div>
        </>
      ) : (
        <p>Cargando resumen del pedido...</p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Proceso de Pago</h1>
      
      <div className="mb-8">
        <div className="flex justify-between">
          <span className={`text-sm ${step >= 1 ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>Envío</span>
          <span className={`text-sm ${step >= 2 ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>Revisión</span>
          <span className={`text-sm ${step >= 3 ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>Pago</span>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {renderOrderSummary()}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Información de Envío</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="apellido" className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  emailError ? 'border-red-500' : ''
                }`}
              />
              {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="direccion" className="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="ciudad" className="block text-gray-700 text-sm font-bold mb-2">Ciudad</label>
                <input
                  type="text"
                  id="ciudad"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="codigoPostal" className="block text-gray-700 text-sm font-bold mb-2">Código Postal</label>
                <input
                  type="text"
                  id="codigoPostal"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleInputChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div>
              <label htmlFor="pais" className="block text-gray-700 text-sm font-bold mb-2">País</label>
              <input
                type="text"
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={handleInputChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Revisión del Pedido</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Información de Envío:</h3>
                <p>{formData.nombre} {formData.apellido}</p>
                <p>{formData.email}</p>
                <p>{formData.direccion}</p>
                <p>{formData.ciudad}, {formData.codigoPostal}</p>
                <p>{formData.pais}</p>
              </div>
              {renderOrderSummary()}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setMetodoPago('stripe')}
                className={`w-full p-4 ${metodoPago === 'stripe' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded flex items-center justify-center space-x-2 transition duration-300 ease-in-out hover:bg-blue-600`}
              >
                <FaStripe size={24} />
                <span>Pagar con Tarjeta</span>
              </button>
              <button
                type="button"
                onClick={() => setMetodoPago('paypal')}
                className={`w-full p-4 ${metodoPago === 'paypal' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'} rounded flex items-center justify-center space-x-2 transition duration-300 ease-in-out hover:bg-yellow-600`}
              >
                <FaPaypal size={24} />
                <span>Pagar con PayPal</span>
              </button>
            </div>

            {metodoPago === 'stripe' && (
              <div>
                <div className="flex justify-center space-x-4 mb-4">
                  <FaCcVisa size={32} className="text-blue-600" />
                  <FaCcMastercard size={32} className="text-red-500" />
                  <FaCcAmex size={32} className="text-blue-400" />
                  <FaCcDiscover size={32} className="text-orange-500" />
                  <FaCcJcb size={32} className="text-green-500" />
                  <FaCcDinersClub size={32} className="text-blue-800" />
                </div>
              </div>
            )}

            {metodoPago === 'paypal' && (
              <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
                <PayPalButtons 
                  createOrder={handlePayPalPayment}
                  onApprove={onPayPalApprove}
                  style={{ layout: "vertical" }}
                />
              </PayPalScriptProvider>
            )}
          </>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(prev => prev - 1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaArrowLeft className="mr-2" />
              Anterior
            </button>
          )}
          {step < 3 ? (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              Siguiente
              <FaArrowRight className="ml-2" />
            </button>
          ) : metodoPago === 'stripe' ? (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              Pagar con Stripe
              <FaArrowRight className="ml-2" />
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}