const { spawnSync } = require('child_process');

const checks = [
  'lintCheck.js',
  'renderCheck.js',
  'check404.js',
  'dummyDatabaseCheck.js',
  'check500.js',
  'backendCheck.js',
  'databaseConnectCheck.js'
];

for (const check of checks) {
  const result = spawnSync('node', [`checks/${check}`], { stdio: 'inherit' });
  if (result.status !== 0) {
    console.error(`${check} failed`);
    process.exit(result.status ?? 1);
  }
}

console.log('All checks passed');
