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
  if (admin) {
    await prisma.project.createMany({
      data: [
        { title: 'Neon Launch', ownerId: admin.id, status: 'Active' },
        { title: 'Marketing Site', ownerId: admin.id, status: 'Planning' },
      ],
      skipDuplicates: true,
    });

    await prisma.notification.createMany({
      data: [
        { userId: admin.id, message: 'Welcome to Orbas, Admin!' },
        { userId: admin.id, message: 'Your dashboard has been updated.' },
      ],
      skipDuplicates: true,
    });
  }

  const alice = await prisma.user.findUnique({ where: { email: 'alice@example.com' } });
  const bob = await prisma.user.findUnique({ where: { email: 'bob@example.com' } });
  if (alice && bob) {
    const logoGig = await prisma.gig.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: 'Logo Design',
        sellerId: alice.id,
        price: 100,
        views: 10,
        clicks: 5,
        orders: 2,
        earnings: 200,
      },
    });
    const websiteGig = await prisma.gig.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: 'Website Build',
        sellerId: bob.id,
        price: 500,
        views: 20,
        clicks: 10,
        orders: 1,
        earnings: 500,
      },
    });

    await prisma.order.upsert({
      where: { id: 1 },
      update: {},
      create: {
        gigId: logoGig.id,
        buyerId: bob.id,
        status: 'completed',
        price: logoGig.price,
      },
    });
    await prisma.order.upsert({
      where: { id: 2 },
      update: {},
      create: {
        gigId: websiteGig.id,
        buyerId: alice.id,
        status: 'pending',
        price: websiteGig.price,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
