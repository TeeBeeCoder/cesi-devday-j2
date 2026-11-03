import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

if (existsSync('.env')) process.loadEnvFile('.env');
const key = process.env.SONAR_PROJECT_KEY || 'delta-web';
if (!process.env.SONAR_TOKEN) {
  console.error('Set SONAR_TOKEN in the ignored .env file before running the local scan.');
  process.exit(1);
}
if (!/^[a-zA-Z0-9_.:-]+$/.test(key) || !/[a-zA-Z]/.test(key)) {
  console.error('SONAR_PROJECT_KEY must be a valid Sonar project key containing a letter.');
  process.exit(1);
}
const args = ['compose', '-f', 'compose.sonar.yml', 'run', '--rm'];
if (process.getuid) args.push('--user', `${process.getuid()}:${process.getgid()}`);
args.push('scanner', '-Dsonar.working.directory=/usr/src/.scannerwork', `-Dsonar.projectKey=${key}`, '-Dsonar.qualitygate.wait=true');
const result = spawnSync('docker', args, { stdio: 'inherit', env: process.env });
if (result.error) console.error('Docker could not start. Check Docker Desktop or your Docker Engine installation.');
process.exit(result.status ?? 1);
