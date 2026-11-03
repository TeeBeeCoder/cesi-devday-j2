import { mkdirSync, writeFileSync } from 'node:fs';
import { ESLint } from 'eslint';

const eslint = new ESLint();
const results = await eslint.lintFiles(['src', 'test', 'e2e', 'scripts', '*.js']);
mkdirSync('reports', { recursive: true });
writeFileSync('reports/eslint.json', JSON.stringify(results, null, 2));
console.log((await eslint.loadFormatter('stylish')).format(results));
process.exitCode = results.some((result) => result.errorCount > 0) ? 1 : 0;
