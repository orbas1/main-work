const { execSync } = require('child_process');

try {
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('Linting check passed');
} catch (err) {
  console.error('Linting check failed');
  process.exit(1);
}
