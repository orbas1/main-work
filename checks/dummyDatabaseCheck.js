const url = process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/db';

if (!url) {
  console.error('Dummy database check failed: DATABASE_URL is not set');
  process.exit(1);
}

console.log('Dummy database check passed');
