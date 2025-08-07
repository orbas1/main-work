#!/usr/bin/env node
const fs = require('fs');
const { spawnSync } = require('child_process');

// Vercel manages environment variables through its dashboard. When building
// on Vercel, the `.env` file is not present and we should not attempt to push
// local values. Detect the Vercel environment and exit gracefully.
if (process.env.VERCEL) {
  console.log('Vercel build detected, skipping env push.');
  process.exit(0);
}

// When developing locally, the `.env` file might not exist if variables are
// already configured. Instead of failing, simply skip pushing the values so the
// build can continue.
if (!fs.existsSync('.env')) {
  console.log('.env file not found, skipping env push.');
  process.exit(0);
}

const env = fs.readFileSync('.env', 'utf8');
env.split(/\r?\n/).forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const [key, ...rest] = trimmed.split('=');
  const value = rest.join('=');
  console.log(`Adding ${key} to Vercel`);
  spawnSync('vercel', ['env', 'add', key, 'production'], {
    input: value,
    stdio: ['pipe', 'inherit', 'inherit']
  });
});
