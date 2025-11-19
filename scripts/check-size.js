#!/usr/bin/env node
// Display bundle size information
const fs = require('fs');
const path = require('path');

const distPath = 'dist';

console.log('📦 Package size analysis:\n');

if (!fs.existsSync(distPath)) {
  console.error('❌ dist/ directory not found');
  process.exit(1);
}

const files = fs.readdirSync(distPath);

if (files.length === 0) {
  console.error('❌ dist/ directory is empty');
  process.exit(1);
}

let totalSize = 0;

files.forEach(file => {
  const filePath = path.join(distPath, file);
  const stats = fs.statSync(filePath);
  const sizeKB = (stats.size / 1024).toFixed(2);
  totalSize += stats.size;
  console.log(`  ${file.padEnd(20)} ${sizeKB.padStart(8)} KB`);
});

const totalKB = (totalSize / 1024).toFixed(2);
console.log(`\n  Total:               ${totalKB.padStart(8)} KB`);
console.log('\n✅ Size check completed');
