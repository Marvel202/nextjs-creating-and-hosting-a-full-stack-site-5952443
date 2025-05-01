import ShoppingCartList from "./ShoppingCartList";
import { getCartProducts } from "@/lib/cart";

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const cartProducts = await getCartProducts('2');

  return (
    <ShoppingCartList initialCartProducts={cartProducts} />
  )
}