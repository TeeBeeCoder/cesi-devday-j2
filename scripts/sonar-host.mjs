import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

if (existsSync('.env')) process.loadEnvFile('.env');
const host = process.env.SONAR_HOST_URL || 'http://127.0.0.1:9000';

if (!/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?\/?$/.test(host)) {
  console.error('SONAR_HOST_URL must be an HTTP loopback URL for this exercise.');
  process.exit(1);
}
if (!process.env.SONAR_TOKEN) {
  console.error('Set SONAR_TOKEN in the ignored .env file before running the local scan.');
  process.exit(1);
}

const result = spawnSync('npm', [
  'exec', '--yes', '--package=@sonar/scan@5.0.2', '--', 'sonar-scanner-npm',
  `-Dsonar.host.url=${host}`,
  '-Dsonar.qualitygate.wait=true',
  '-Dsonar.qualitygate.timeout=90',
], {
  stdio: 'inherit',
  env: { ...process.env, SONAR_HOST_URL: host },
});
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
