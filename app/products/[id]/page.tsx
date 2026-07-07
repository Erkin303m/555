import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const productId = parseInt(id)

  if (isNaN(productId)) notFound()

  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) notFound()

  const images: string[] = JSON.parse(product.images)
  const specs: Record<string, string> = JSON.parse(product.specs)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/products" className="text-sm text-gray-500 hover:text-black transition-colors mb-6 inline-block">
        &larr; Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-2xl border flex items-center justify-center p-8">
            {images.length > 0 ? (
              <img
                src={images[0]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-gray-300 text-lg">No image</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="w-20 h-20 object-contain rounded-xl border bg-gray-50 flex-shrink-0 cursor-pointer hover:border-gray-400 transition-colors"
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</span>
          <h1 className="text-2xl md:text-3xl font-bold mt-1 mb-3">{product.name}</h1>
          <p className="text-3xl font-bold mb-4">${product.price.toFixed(2)}</p>

          {product.inStock ? (
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
              In Stock
            </span>
          ) : (
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full mb-4">
              Out of Stock
            </span>
          )}

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {Object.keys(specs).length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Specifications</h2>
              <div className="border rounded-xl overflow-hidden">
                {Object.entries(specs).map(([key, value]) =>
                  value ? (
                    <div key={key} className="flex border-b last:border-0">
                      <span className="w-1/3 px-4 py-3 bg-gray-50 text-sm font-medium text-gray-600 capitalize">
                        {key}
                      </span>
                      <span className="w-2/3 px-4 py-3 text-sm">{value}</span>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
