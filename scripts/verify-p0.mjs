import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const requiredFiles = [
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'vite.config.ts',
  'playwright.config.ts',
  'eslint.config.js',
  '.prettierrc.json',
  'vercel.json',
  '.github/workflows/ci.yml',
  'docs/PASS_4_PROJECT_DEFINITION.md',
  'docs/PASS_5_TECHNICAL_BLUEPRINT.md',
  'docs/PASS_6_IMPLEMENTATION_PLAN.md',
  'docs/CHANGE_GATE.md',
];

const failures = [];

async function text(relativePath) {
  try {
    return await readFile(path.join(root, relativePath), 'utf8');
  } catch {
    failures.push(`Missing required file: ${relativePath}`);
    return '';
  }
}

for (const file of requiredFiles) {
  await text(file);
}

const packageJson = JSON.parse(await text('package.json'));
const lock = JSON.parse(await text('package-lock.json'));
const tsconfig = JSON.parse(await text('tsconfig.json'));
const vercel = JSON.parse(await text('vercel.json'));
const ci = await text('.github/workflows/ci.yml');
const changeGate = await text('docs/CHANGE_GATE.md');

for (const dependency of ['react', 'react-dom', 'zod']) {
  if (!packageJson.dependencies?.[dependency]) failures.push(`Missing dependency: ${dependency}`);
}

for (const dependency of [
  'vite',
  'vitest',
  '@playwright/test',
  'eslint',
  'prettier',
  'typescript',
  '@vitejs/plugin-react',
]) {
  if (!packageJson.devDependencies?.[dependency]) failures.push(`Missing devDependency: ${dependency}`);
}

if (tsconfig.compilerOptions?.strict !== true) failures.push('TypeScript strict mode is not enabled.');
if (lock.lockfileVersion !== 3) failures.push('package-lock.json must use lockfileVersion 3.');
if (vercel.framework !== 'vite') failures.push('Vercel framework must be vite.');
if (vercel.outputDirectory !== 'dist') failures.push('Vercel output directory must be dist.');

for (const command of ['npm ci', 'npm run lint', 'npm run typecheck', 'npm run test', 'npm run build', 'npm run verify:p0']) {
  if (!ci.includes(command)) failures.push(`CI missing command: ${command}`);
}

for (const frozenTerm of ['research question', 'eight scenario', 'KPI', 'safety boundaries', 'READY | BLOCKED']) {
  if (!changeGate.toLowerCase().includes(frozenTerm.toLowerCase())) failures.push(`Change gate missing frozen contract: ${frozenTerm}`);
}

const srcEntries = await readdir(path.join(root, 'src'));
const forbiddenP0 = ['domain', 'gate', 'workflow', 'experiment', 'audit', 'metrics', 'roi', 'scenarios'];
for (const name of forbiddenP0) {
  if (srcEntries.includes(name)) failures.push(`P0 scope violation: src/${name} exists before its approved phase.`);
}

const allTopLevel = await readdir(root, { withFileTypes: true });
for (const entry of allTopLevel) {
  if (entry.name.startsWith('.env') && entry.name !== '.env.example') {
    failures.push(`Secret-risk file present: ${entry.name}`);
  }
}

if (failures.length > 0) {
  console.error('P0 VERIFY: FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('P0 VERIFY: PASS');
console.log('Foundation/tooling/freeze contracts are present; domain and business logic remain unimplemented.');
