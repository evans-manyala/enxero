// scripts/check-role.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const role = await prisma.role.findMany();
  console.log('All roles:', role);
  const userRole = await prisma.role.findUnique({ where: { name: 'USER' } });
  console.log('USER role:', userRole);
}

main().finally(() => prisma.$disconnect());