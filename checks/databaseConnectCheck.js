const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log('Skipping database connection check: DATABASE_URL not set');
    return;
  }
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database connect check passed');
  } catch (err) {
    console.error('Database connect check failed:', err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
