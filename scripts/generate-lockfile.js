import { execSync } from 'child_process';

try {
  console.log('Running npm install to generate lockfile...');
  const result = execSync('cd /vercel/share/v0-project && npm install --package-lock-only 2>&1', {
    encoding: 'utf-8',
    timeout: 120000,
  });
  console.log(result);
  console.log('Done!');
} catch (error) {
  console.error('Error:', error.message);
  if (error.stdout) console.log('stdout:', error.stdout);
  if (error.stderr) console.log('stderr:', error.stderr);
}
