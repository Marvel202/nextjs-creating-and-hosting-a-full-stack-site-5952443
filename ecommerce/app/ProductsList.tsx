'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from "./product-data";

export default function ProductsList({ products, initialCartProducts = [] }: { 
  products: Product[], 
  initialCartProducts: Product[] 
}) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  async function handleCartAction(productId: string, action: 'add' | 'remove') {
    try {
      setLoadingStates(prev => ({ ...prev, [productId]: true }));
      
      const response = await fetch(`/api/users/2/cart`, {
        method: action === 'add' ? 'POST' : 'DELETE',
        body: JSON.stringify({ productId }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update cart');
      }

      const updatedCartProducts = await response.json();
      setCartProducts(updatedCartProducts);
    } catch (error) {
      console.error(`Error ${action === 'add' ? 'adding to' : 'removing from'} cart:`, error);
      // Consider adding user feedback here (toast, alert, etc.)
    } finally {
      setLoadingStates(prev => ({ ...prev, [productId]: false }));
    }
  }

  function productIsInCart(productId: string) {
    return cartProducts.some(cp => cp.id === productId);
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
          <Link href={`/products/${product.id}`}>
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
          </Link>
          <button
            disabled={loadingStates[product.id]}
            className={`mt-4 w-full py-2 px-4 rounded font-bold text-white transition-colors ${
              productIsInCart(product.id) 
                ? 'bg-pink-500 hover:bg-pink-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } ${loadingStates[product.id] ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={() => handleCartAction(
              product.id, 
              productIsInCart(product.id) ? 'remove' : 'add'
            )}
          >
            {loadingStates[product.id] ? (
              'Processing...'
            ) : productIsInCart(product.id) ? (
              'Remove from Cart'
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      ))}
    </div>
  );
}