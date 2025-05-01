import { NextRequest } from 'next/server';
import { connectToDb } from '@/app/api/db';

type RouteParams = {
  params: {
    userId: string;
  }
};

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { db } = await connectToDb();
    const body = await request.json();
    
    if (!body.productId) {
      return Response.json(
        { message: 'productId is required' },
        { status: 400 }
      );
    }

    const updatedCart = await db.collection('carts').findOneAndUpdate(
      { userId: params.userId },
      { $push: { cartIds: body.productId } },
      { upsert: true, returnDocument: 'after' }
    );

    const cartProducts = await db.collection('products')
      .find({ id: { $in: updatedCart.cartIds } })
      .toArray();

    return Response.json(cartProducts.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      imageUrl: p.imageUrl,
      description: p.description
    })));
  } catch (error) {
    console.error('Error adding to cart:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { db } = await connectToDb();
    const body = await request.json();
    
    if (!body.productId) {
      return Response.json(
        { message: 'productId is required' },
        { status: 400 }
      );
    }

    const updatedCart = await db.collection('carts').findOneAndUpdate(
      { userId: params.userId },
      { $pull: { cartIds: body.productId } },
      { returnDocument: 'after' }
    );

    const cartProducts = updatedCart 
      ? await db.collection('products')
          .find({ id: { $in: updatedCart.cartIds } })
          .toArray()
      : [];

    return Response.json(cartProducts.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      imageUrl: p.imageUrl,
      description: p.description
    })));
  } catch (error) {
    console.error('Error removing from cart:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}