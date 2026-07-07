import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  const where: Record<string, unknown> = {}
  if (category && category !== 'all') where.category = category
  if (search) where.name = { contains: search }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const slug = slugify(body.name)

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug,
      category: body.category,
      description: body.description || '',
      price: parseFloat(body.price),
      specs: JSON.stringify(body.specs || {}),
      images: JSON.stringify(body.images || []),
      inStock: body.inStock !== false,
    },
  })

  return NextResponse.json(product, { status: 201 })
}
