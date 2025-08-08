const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const bcrypt = require('bcryptjs');
  const password = await bcrypt.hash('Marley_36', 10);
  await prisma.user.upsert({
    where: { email: 'jamahlthomas1996@gmail.com' },
    update: {},
    create: {
      email: 'jamahlthomas1996@gmail.com',
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

  const admin = await prisma.user.findUnique({
    where: { email: 'jamahlthomas1996@gmail.com' },
  });
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

    await prisma.gig.createMany({
      data: [
        {
          title: 'Logo Design',
          description: 'Professional logo design for your brand',
          price: 100,
          category: 'Design',
          sellerId: admin.id,
          rating: 4.8,
        },
        {
          title: 'Website Development',
          description: 'Responsive website built with modern technologies',
          price: 500,
          category: 'Development',
          sellerId: admin.id,
          rating: 4.5,
        },
        {
          title: 'SEO Audit',
          description: 'Comprehensive SEO analysis and recommendations',
          price: 200,
          category: 'Marketing',
          sellerId: admin.id,
          rating: 4.7,
        },
      ],
      skipDuplicates: true,
    });

    await prisma.jobPost.createMany({
      data: [
        {
          title: 'Senior Backend Developer',
          description: 'Build scalable APIs using Node.js and PostgreSQL.',
          requirements: '5+ years experience, Node.js, PostgreSQL',
          salaryMin: 90000,
          salaryMax: 120000,
          benefits: 'Health, 401k',
          jobType: 'full-time',
          location: 'Remote',
          status: 'active',
          employerId: admin.id,
        },
        {
          title: 'Part-time Designer',
          description: 'Create marketing materials and product mockups.',
          requirements: 'Adobe Suite, portfolio required',
          salaryMin: 30000,
          salaryMax: 45000,
          jobType: 'part-time',
          location: 'New York, NY',
          status: 'draft',
          employerId: admin.id,
        },
      ],
      skipDuplicates: true,
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
