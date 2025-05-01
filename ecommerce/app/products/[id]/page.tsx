import { getProductById } from "@/lib/products";
import NotFoundPage from "@/app/not-found";
import Image from "next/image"; 

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="container mx-auto p-8 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <div className="relative aspect-square w-full">
          <Image
            src={`/${product.imageUrl}`}
            alt={product.name}
            fill
            className="object-cover rounded-lg shadow-md"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl text-gray-600 mb-6">${product.price}</p>
        <h3 className="text-2xl font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}