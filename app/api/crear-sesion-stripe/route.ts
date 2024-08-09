// app/api/crear-sesion-stripe/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { 
        nombre, 
        apellido, 
        email, 
        direccion, 
        ciudad, 
        codigoPostal, 
        pais, 
        items,
        total
      } = await req.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item: any) => ({
          price_data: {
            currency: 'eur',
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${req.headers.get('origin')}/exito`,
        cancel_url: `${req.headers.get('origin')}/cancelado`,
        customer_email: email,
        shipping_address_collection: {
          allowed_countries: ['ES'], // Adjust as needed
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 500, // 5 EUR in cents
                currency: 'eur',
              },
              display_name: 'Envío Estándar',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 3,
                },
                maximum: {
                  unit: 'business_day',
                  value: 5,
                },
              },
            },
          },
        ],
      });

      return NextResponse.json({ sessionId: session.id });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Método No Permitido' }, { status: 405 });
  }
}