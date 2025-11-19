#!/usr/bin/env node
// Check that all required build outputs exist
const fs = require('fs');

const requiredFiles = [
  'dist/index.js',
  'dist/index.mjs',
  'dist/index.d.ts',
  'dist/index.d.mts'
];

let hasError = false;

console.log('Checking build outputs...');

requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`❌ Missing: ${file}`);
    hasError = true;
  } else {
    console.log(`✓ ${file}`);
  }
});

if (hasError) {
  console.error('\n❌ Build output check failed!');
  process.exit(1);
}

console.log('\n✅ All build outputs present');
