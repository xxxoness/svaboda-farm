import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { prisma } from '../src/lib/prisma.js'

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME || 'Admin'

  if (!email || !password) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env before running seed')
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name, role: 'ADMIN' },
    create: {
      email,
      passwordHash,
      name,
      role: 'ADMIN',
    },
  })
  // eslint-disable-next-line no-console
  console.log(`Seed complete. Admin user: ${email}`)
}

main()
  .finally(async () => prisma.$disconnect())
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
