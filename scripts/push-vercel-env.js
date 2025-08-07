#!/usr/bin/env node
const fs = require('fs');
const { spawnSync } = require('child_process');

if (!fs.existsSync('.env')) {
  console.error('.env file not found');
  process.exit(1);
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
