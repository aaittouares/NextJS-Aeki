import { PrismaClient } from '../generated/client.ts'
import { PrismaPg } from '@prisma/adapter-pg'
import products from './products.json' with { type: 'json' }
import 'dotenv/config' // add this lib to be able to read process.env

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
