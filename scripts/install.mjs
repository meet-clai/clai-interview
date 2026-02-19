import { execSync } from 'child_process'

try {
  console.log('Running pnpm install --no-frozen-lockfile...')
  const result = execSync('cd /vercel/share/v0-project && pnpm install --no-frozen-lockfile 2>&1', {
    encoding: 'utf-8',
    timeout: 120000,
  })
  console.log(result)
  console.log('Install completed successfully')
} catch (error) {
  console.error('Install failed:', error.message)
  if (error.stdout) console.log('stdout:', error.stdout)
  if (error.stderr) console.log('stderr:', error.stderr)
}
