const { execSync } = require('child_process');

function resetDatabase() {
  execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
}

resetDatabase();
