import { appendFileSync, existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';

const read = (path) => existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : null;
const lint = read('reports/eslint.json');
const coverage = read('coverage/coverage-summary.json');
const errors = lint ? lint.reduce((sum, file) => sum + file.errorCount, 0) : 'non produit';
const warnings = lint ? lint.reduce((sum, file) => sum + file.warningCount, 0) : 'non produit';
const lines = coverage ? `${coverage.total.lines.pct} %` : 'non produite';
const summary = `## Preuves de qualité\n\n| Mesure | Résultat |\n|---|---|\n| Erreurs ESLint | ${errors} |\n| Avertissements ESLint | ${warnings} |\n| Couverture des lignes | ${lines} |\n\nDate : ${new Date().toISOString()}. Révision : ${process.env.GITHUB_SHA || 'copie locale'}.\n\nLes tests fonctionnels sont détaillés dans le rapport Playwright. Une absence de rapport ne vaut pas zéro défaut. Le dashboard Sonar et son gate sont à lire séparément.\n`;
mkdirSync('reports', { recursive: true });
writeFileSync('reports/qualite.md', summary);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
console.log(summary);
