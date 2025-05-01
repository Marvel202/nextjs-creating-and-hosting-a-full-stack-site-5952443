import ProductsList from "../ProductsList";
import { getAllProducts } from "@/lib/products";
import { getCartProducts } from "@/lib/cart";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const [products, cartProducts] = await Promise.all([
    getAllProducts(),
    getCartProducts('2')
  ]);
  
  return (
    <div className="container mx-auto p-8">
    <h1 className="text-4xl font-bold mb-8">Products</h1>
    <ProductsList products={products} initialCartProducts={cartProducts}/>
    </div>
  )
}