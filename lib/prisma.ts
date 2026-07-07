import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import path from 'node:path'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const raw = process.env.DATABASE_URL || 'file:./dev.db'
  const dbPath = raw.replace(/^file:/, '')
  const resolved = path.resolve(dbPath)
  const adapter = new PrismaLibSql({ url: `file:${resolved}` })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
