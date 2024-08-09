// app/api/procesar-pago-paypal/route.ts
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { 
        orderID,
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
      
      const response = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${orderID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status === 'COMPLETED') {
        return NextResponse.json({ 
          success: true, 
          orderID: orderID,
          customerInfo: {
            nombre,
            apellido,
            email,
            direccion,
            ciudad,
            codigoPostal,
            pais
          },
          items,
          total
        });
      } else {
        return NextResponse.json({ error: 'Pago no completado' }, { status: 400 });
      }
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Método No Permitido' }, { status: 405 });
  }
}