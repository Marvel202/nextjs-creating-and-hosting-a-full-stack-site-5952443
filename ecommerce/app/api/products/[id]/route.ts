import { NextRequest } from 'next/server';
import { connectToDb } from '@/app/api/db';

// Update the params type to match Next.js route segment config
type Params = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

type CartBody = {
  productId: string;
}

export async function GET(request: NextRequest, context: Params) {
  const userId = context.params.id;
  const { db } = await connectToDb();

  const userCart = await db.collection('carts').findOne({ userId });

  if (!userCart) {
    return Response.json([], { status: 200 });
  }

  const cartProducts = await db.collection('products').find({ id: { $in: userCart.cartIds } }).toArray();
  return Response.json(cartProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl,
    description: p.description
  })));
}

export async function POST(request: NextRequest, context: Params) {
  const userId = context.params.id;
  const { db } = await connectToDb();
  const body: CartBody = await request.json();
  const productId = body.productId;

  const updatedCart = await db.collection('carts').findOneAndUpdate(
    { userId },
    { $push: { cartIds: productId } },
    { upsert: true, returnDocument: 'after' },
  );

  const cartProducts = await db.collection('products').find({ id: { $in: updatedCart.cartIds } }).toArray();
  return Response.json(cartProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl,
    description: p.description
  })), { status: 201 });
}

export async function DELETE(request: NextRequest, context: Params) {
  const userId = context.params.id;
  const { db } = await connectToDb();
  const body = await request.json();
  const productId = body.productId;

  const updatedCart = await db.collection('carts').findOneAndUpdate(
    { userId },
    { $pull: { cartIds: productId } },
    { returnDocument: 'after' }
  );

  const cartProducts = updatedCart 
    ? await db.collection('products').find({ id: { $in: updatedCart.cartIds } }).toArray()
    : [];

  return Response.json(cartProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl,
    description: p.description
  })), { status: 202 });
}