import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@stepsync.com";
  const password = process.env.ADMIN_PASSWORD || "AdminPassword123!";
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN" }, // Ensure role is admin
    create: {
      email,
      name: "StepSync Admin",
      password: hashedPassword,
      role: "ADMIN"
    }
  });

  console.log(`Admin user ensured: ${admin.email} (${admin.role})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });