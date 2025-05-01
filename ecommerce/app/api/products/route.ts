import { connectToDb } from "../db";

export async function GET() {
  const { db } = await connectToDb();
  const products = await db.collection('products').find({}).toArray();
  const plainProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    description: product.description
  }));
  return new Response(JSON.stringify(plainProducts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}