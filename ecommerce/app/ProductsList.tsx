'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from "./product-data";

export default function ProductsList({ products, initialCartProducts = [] }: { products: Product[], initialCartProducts: Product[] }) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts)
  
  async function addToCart(productId: string) {
    try {
      const response = await fetch('/api/users/2/cart', {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
      
      const updatedCartProducts = await response.json();
      setCartProducts(updatedCartProducts);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  async function removeFromCart(productId: string) {
    try {
      const response = await fetch('/api/users/2/cart', {
        method: 'DELETE',
        body: JSON.stringify({ productId }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove from cart');
      }
      
      const updatedCartProducts = await response.json();
      setCartProducts(updatedCartProducts);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }

  function productIsInCart(productId: string) {
    return cartProducts.some(cp => cp.id === productId);
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map(product => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
        >
          <div className="flex justify-center mb-4 h-48 relative">
            <Image
              src={'/' + product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-600">${product.price}</p>
          <button
            className={`mt-4 w-full py-2 px-4 rounded font-bold text-white ${
              productIsInCart(product.id) 
                ? 'bg-pink-500 hover:bg-pink-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onClick={(e) => {
              e.preventDefault();
              productIsInCart(product.id) 
                ? removeFromCart(product.id) 
                : addToCart(product.id);
            }}
          >
            {productIsInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </Link>
      ))}
    </div>
  );
}