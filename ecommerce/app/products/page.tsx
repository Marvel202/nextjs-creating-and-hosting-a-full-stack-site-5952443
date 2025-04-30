import ProductsList from "../ProductsList";


export default async function ProductsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/products`);
        if (!response.ok) {
            throw new Error(`Fetch failed with status: ${response.status}`);
        }
  const products  = await response.json();
  
  const response2 = await fetch(`${baseUrl}/api/users/2/cart`, {
    cache: 'no-cache'
  });
  const cartProducts = await response2.json();

  return (
    <div className="container mx-auto p-8">
    <h1 className="text-4xl font-bold mb-8">Products</h1>
    <ProductsList products={products} initialCartProducts={cartProducts}/>
    </div>
  )
}