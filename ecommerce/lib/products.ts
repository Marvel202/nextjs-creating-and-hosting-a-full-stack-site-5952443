import { connectToDb } from "@/app/api/db";


export async function getAllProducts() {
  const { db } = await connectToDb();
  const products = await db.collection('products').find().toArray();
  return products.map(product => ({
   
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl.startsWith('/') ? product.imageUrl : `${product.imageUrl}`,
      description: product.description,
    }));

}

export async function getProductById(id: string) {
  const { db } = await connectToDb();
  const product = await db.collection('products').findOne({ id });
  return product ? {
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl.startsWith('/') ? product.imageUrl : `${product.imageUrl}`,
    description: product.description} 
    : null;
}