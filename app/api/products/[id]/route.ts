import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function GET(
  _request: Request,
  context: RouteContext<'/api/products/[id]'>
) {
  const { id } = await context.params
  const productId = parseInt(id)

  if (isNaN(productId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function PUT(
  request: Request,
  context: RouteContext<'/api/products/[id]'>
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await context.params
  const productId = parseInt(id)
  const body = await request.json()

  const data: Record<string, unknown> = {
    name: body.name,
    category: body.category,
    description: body.description || '',
    price: parseFloat(body.price),
    specs: JSON.stringify(body.specs || {}),
    images: JSON.stringify(body.images || []),
    inStock: body.inStock !== false,
  }

  if (body.name) {
    data.slug = slugify(body.name)
  }

  const product = await prisma.product.update({
    where: { id: productId },
    data,
  })

  return NextResponse.json(product)
}

export async function DELETE(
  _request: Request,
  context: RouteContext<'/api/products/[id]'>
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await context.params
  const productId = parseInt(id)

  await prisma.product.delete({ where: { id: productId } })
  return NextResponse.json({ success: true })
}
