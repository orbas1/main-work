const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const bcrypt = require('bcryptjs');
  const password = await bcrypt.hash('password', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password,
    },
  });

  await prisma.user.createMany({
    data: [
      { email: 'alice@example.com', name: 'Alice', password },
      { email: 'bob@example.com', name: 'Bob', password },
    ],
    skipDuplicates: true,
  });

  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Jane Doe',
        message: 'Orbas helped us hire top talent quickly and efficiently.',
        avatarUrl: null,
      },
      {
        name: 'John Smith',
        message: 'The gig management tools saved our team countless hours.',
        avatarUrl: null,
      },
    ],
    skipDuplicates: true,
  });

  const admin = await prisma.user.findUnique({ where: { email: 'admin@example.com' } });
  const alice = await prisma.user.findUnique({ where: { email: 'alice@example.com' } });
  const bob = await prisma.user.findUnique({ where: { email: 'bob@example.com' } });
  if (admin) {
    await prisma.project.createMany({
      data: [
        { title: 'Neon Launch', ownerId: admin.id, status: 'Active' },
        { title: 'Marketing Site', ownerId: admin.id, status: 'Planning' },
      ],
      skipDuplicates: true,
    });
  }

  await prisma.notification.createMany({
    data: [
      { userId: admin?.id, message: 'Welcome to Orbas!', type: 'system' },
      { userId: admin?.id, message: 'Project "Neon Launch" updated.', type: 'project' },
      { userId: alice?.id, message: 'Your profile was viewed.', type: 'profile' },
      { userId: bob?.id, message: 'You received a new testimonial.', type: 'social' },
    ].filter((n) => n.userId),
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
