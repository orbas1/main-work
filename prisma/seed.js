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

  await prisma.feature.createMany({
    data: [
      {
        title: 'AI-Powered Matching',
        description: 'Connect with the right opportunities using intelligent algorithms.',
        imageUrl: 'https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1456244440184-1d494704a505.jpg',
      },
      {
        title: 'Integrated Gig Management',
        description: 'Manage tasks and projects seamlessly in one place.',
        imageUrl: 'https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1500393734221-584dd6dbf92a.jpg',
      },
      {
        title: 'Real-Time Analytics',
        description: 'Gain insights with up-to-the-minute data and reports.',
        imageUrl: 'https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1462332420958-a05d1e002413.jpg',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.solution.createMany({
    data: [
      {
        title: 'Recruiting Suite',
        description: 'Automate sourcing and streamline applicant tracking with one unified hub.',
        imageUrl: 'https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1489343511429-5482f78c15cf.jpg',
        ctaText: 'Learn More',
      },
      {
        title: 'Gig Marketplace',
        description: 'Connect freelancers and employers with secure contracts and messaging.',
        imageUrl: 'https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1494253188410-ff0cdea5499e.jpg',
        ctaText: 'Explore',
      },
      {
        title: 'Analytics Portal',
        description: 'Visualize performance trends and make data-driven decisions instantly.',
        imageUrl: 'https://raw.githubusercontent.com/ServiceStack/images/master/hero/photo-1504888302758-9adb6780e7c8.jpg',
        ctaText: 'View Dashboard',
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

    await prisma.volunteerOpportunity.createMany({
      data: [
        {
          title: 'Community Clean-Up',
          organization: 'City Helpers',
          location: 'Remote',
          description: 'Assist in organizing a community clean-up event.',
          creatorId: admin.id,
        },
        {
          title: 'Food Bank Support',
          organization: 'Helping Hands',
          location: 'New York',
          description: 'Help sort and pack food donations for families in need.',
          creatorId: admin.id,
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
