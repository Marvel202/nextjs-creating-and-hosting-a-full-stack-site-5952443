'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import Link from 'next/link';
import Image from 'next/image'

export default function ShoppingCartList({ initialCartProducts }: {initialCartProducts: Product[] }) {
   const [cartProducts, 
    setCartProducts
   ] = useState(initialCartProducts); 

   async function removeFromCart(productId: string) {
        try {
        const response = await fetch('/api/users/2/cart', {
          method: 'DELETE',
          body: JSON.stringify({
            productId,
          }),
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const updatedCartProducts = await response.json();
        setCartProducts(updatedCartProducts);
      } catch (error) {
        console.error('Error removing product from cart:', error);
      }
    }
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <ul className="space-y-4">
        {cartProducts.map(product => (
          <li key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Image container with fixed dimensions */}
              <div className="w-full md:w-1/4 h-48 relative">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={"/" + product.imageUrl}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </Link>
              </div>
              
              {/* Product info */}
              <div className="flex-1 flex flex-col">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </Link>
                <div className="mt-auto flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromCart(product.id);
                    }}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}