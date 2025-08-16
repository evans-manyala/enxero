import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create default roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      description: 'Administrator role with full access',
      permissions: [
        'read:all',
        'write:all',
        'read:users',
        'write:users',
        'read:roles',
        'write:roles'
      ],
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: {
      name: 'USER',
      description: 'Default user role with basic permissions',
      permissions: ['read:own', 'write:own'],
      isActive: true,
    },
  });

  // Create default company
  const company = await prisma.company.upsert({
    where: { identifier: 'DEFAULT' },
    update: {},
    create: {
      name: 'Default Company',
      identifier: 'DEFAULT',
    },
  });

  // Create admin user
  const hashedPassword = await hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      companyId: company.id,
      roleId: adminRole.id,
    },
  });

  // Create test users
  const testUsers = [
    {
      email: 'john.doe@example.com',
      username: 'johndoe',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      email: 'jane.smith@example.com',
      username: 'janesmith',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Smith',
    },
    {
      email: 'bob.wilson@example.com',
      username: 'bobwilson',
      password: 'password123',
      firstName: 'Bob',
      lastName: 'Wilson',
    },
    {
      email: 'alice.johnson@example.com',
      username: 'alicejohnson',
      password: 'password123',
      firstName: 'Alice',
      lastName: 'Johnson',
    },
  ];

  // Create test users with the same password hash
  const userPasswordHash = await hash('password123', 10);
  for (const user of testUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        password: userPasswordHash,
        companyId: company.id,
        roleId: userRole.id,
      },
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 