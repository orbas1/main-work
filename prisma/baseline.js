const { execSync } = require('child_process');

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

resetDatabase();
