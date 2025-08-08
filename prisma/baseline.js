const { execSync } = require('child_process');

function deployMigrations() {
  // Only run in production-like environments where a database URL is provided
  if (
    !(process.env.VERCEL || process.env.NODE_ENV === 'production') ||
    !process.env.DATABASE_URL
  ) {
    console.log('Skipping prisma migrate deploy');
    return;
  }

  try {
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to deploy migrations', error);
  }
}

function resetDatabase() {
  // Avoid running reset in environments where a database connection
  // isn't expected (e.g. production, CI or missing env vars)
  if (
    process.env.CI ||
    process.env.VERCEL ||
    process.env.NODE_ENV === 'production' ||
    !process.env.DATABASE_URL
  ) {
    console.log('Skipping prisma migrate reset');
    return;
  }

  try {
    execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to reset database', error);
  }
}

function generateClient() {
  try {
    execSync('npx prisma generate', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to generate Prisma client', error);
  }
}

deployMigrations();
resetDatabase();
generateClient();
