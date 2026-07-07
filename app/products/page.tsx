import { prisma } from '@/lib/prisma'
import ProductCard from '../ProductCard'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  const { category, search } = await searchParams

  const where: Record<string, unknown> = {}
  if (category && category !== 'all') where.category = category
  if (search) where.name = { contains: search }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  const categories = ['all', 'Phone', 'Case', 'Charger', 'AirPods', 'Cable', 'Accessory']

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <a
              key={cat}
              href={cat === 'all' ? '/products' : `/products?category=${cat}`}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                (cat === 'all' && !category) || cat === category
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </a>
          ))}
        </div>

        <form method="GET" action="/products" className="sm:ml-auto">
          <input
            type="text"
            name="search"
            defaultValue={search || ''}
            placeholder="Search products..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </form>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">No products found.</p>
          <a href="/products" className="text-blue-600 hover:underline mt-2 inline-block">
            Clear filters
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
