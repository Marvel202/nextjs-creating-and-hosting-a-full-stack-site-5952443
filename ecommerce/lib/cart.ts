import { connectToDb } from "@/app/api/db";

export async function getCartProducts(userId: string) {
  const { db } = await connectToDb();
  const userCart = await db.collection('carts').findOne({ userId });
  if (!userCart)
    return [];

    const products = await db.collection('products').find({ id: { $in: userCart.cartIds } }).toArray();
    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl.startsWith('/') ? product.imageUrl : `${product.imageUrl}`,
      description: product.description,
    }));
  }  

export async function addToCart(userId: string, productId: string) {
  const { db } = await connectToDb();
  const updatedCart = await db.collection('carts').findOneAndUpdate(
    { userId },
    { $push: { cartIds: productId } },
    { $upsert: true, returnDocument: 'after' }
  );
  const products = await db.collection('products').find({ id: { $in: updatedCart.cartIds } }).toArray();
    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl.startsWith('/') ? product.imageUrl : `${product.imageUrl}`,
      description: product.description,
    }));
}

export async function removeFromCart(userId: string, productId: string) {
  const { db } = await connectToDb();
  const updatedCart = await db.collection('carts').findOneAndUpdate(
    { userId },
    { $pull: { cartIds: productId } },
    { returnDocument: 'after' }
  );

  const products = updatedCart ? await db.collection('products').find({ id: { $in: updatedCart.cartIds } }).toArray() 
  : [];
   return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl.startsWith('/') ? product.imageUrl : `${product.imageUrl}`,
      description: product.description,
    }));
}

