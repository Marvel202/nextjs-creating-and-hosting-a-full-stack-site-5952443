import ShoppingCartList from "./ShoppingCartList";

export default async function CartPage() {
 const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';             
  const response = await fetch(`${baseUrl}/api/users/2/cart`,{
    cache: 'no-cache',
  });
     if (!response.ok) {
            throw new Error(`Fetch failed with status: ${response.status}`);
        }
  const cartProducts = await response.json();

  return (
    <ShoppingCartList initialCartProducts={cartProducts} />
  )
}