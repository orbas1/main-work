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
        imageUrl: '/api/image',
      },
      {
        title: 'Integrated Gig Management',
        description: 'Manage tasks and projects seamlessly in one place.',
        imageUrl: '/api/image',
      },
      {
        title: 'Real-Time Analytics',
        description: 'Gain insights with up-to-the-minute data and reports.',
        imageUrl: '/api/image',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.solution.createMany({
    data: [
      {
        title: 'Recruiting Suite',
        description: 'Automate sourcing and streamline applicant tracking with one unified hub.',
        imageUrl: '/api/image',
        ctaText: 'Learn More',
      },
      {
        title: 'Gig Marketplace',
        description: 'Connect freelancers and employers with secure contracts and messaging.',
        imageUrl: '/api/image',
        ctaText: 'Explore',
      },
      {
        title: 'Analytics Portal',
        description: 'Visualize performance trends and make data-driven decisions instantly.',
        imageUrl: '/api/image',
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

    await prisma.goal.createMany({
      data: [
        { userId: admin.id, title: 'Applications', target: 10, current: 3 },
        { userId: admin.id, title: 'Earnings', target: 1000, current: 400 }
      ],
      skipDuplicates: true,
    });
    await prisma.networkingSession.createMany({
      data: [
        {
          title: 'Tech Networking Mixer',
          description: 'Connect with tech enthusiasts and professionals.',
          industry: 'Technology',
          topic: 'Innovation',
          date: new Date(Date.now() + 86400000),
          duration: 60,
          capacity: 50,
          price: 0,
          type: 'standard',
          hostId: admin.id,
        },
        {
          title: 'Startup Speed Networking',
          description: 'Rapid introductions for startup founders.',
          industry: 'Startups',
          topic: 'Pitching',
          date: new Date(Date.now() + 172800000),
          duration: 30,
          capacity: 20,
          price: 10,
          type: 'speed',
          hostId: admin.id,
        },
      ],
      skipDuplicates: true,
    });

    await prisma.job.createMany({
      data: [
        {
          title: 'Frontend Developer',
          company: 'Tech Corp',
          location: 'Remote',
          salaryMin: 70000,
          salaryMax: 90000,
          type: 'full-time',
          description: 'Build and maintain web applications using React and TypeScript.',
          postedById: admin.id,
        },
        {
          title: 'Marketing Specialist',
          company: 'Growth Gurus',
          location: 'New York, NY',
          salaryMin: 50000,
          salaryMax: 65000,
          type: 'contract',
          description: 'Develop marketing strategies and manage campaigns across channels.',
          postedById: admin.id,
        },
        {
          title: 'Backend Engineer',
          company: 'Innovate LLC',
          location: 'New York, NY',
          salaryMin: 90000,
          salaryMax: 110000,
          type: 'full-time',
          description: 'Develop scalable APIs with Node and Prisma.',
          postedById: admin.id,
        },
      ],
      skipDuplicates: true,
    });

    await prisma.opportunity.createMany({
      data: [
        {
          title: 'Community Cleanup',
          description: 'Organize local cleanup event',
          employerId: admin.id,
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

    await prisma.task.createMany({
      data: [
        {
          title: 'Update Landing Page',
          instructions: 'Revise hero section copy',
          payment: 150,
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          taskerId: admin.id,
        },
        {
          title: 'Customer Research Calls',
          instructions: 'Schedule and conduct 5 interviews',
          payment: 300,
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          taskerId: admin.id,
        },
      ],
      skipDuplicates: true,
    });


    const job = await prisma.job.findFirst({ where: { postedById: admin.id } });
    const alice = await prisma.user.findUnique({ where: { email: 'alice@example.com' } });
    if (job && alice) {
      await prisma.jobApplication.create({
        data: { jobId: job.id, applicantId: alice.id },
      });
    }


    await prisma.experience.create({
      data: {
        userId: admin.id,
        projects: 2,
        reviews: 5,
        skills: 8,
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
