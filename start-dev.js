import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\x1b[32m%s\x1b[0m', '══════════════════════════════════════════════════════════════');
console.log('\x1b[32m%s\x1b[0m', '  ⚖️ Law_BD: Launching Integrated Development Environment');
console.log('\x1b[32m%s\x1b[0m', '  • Backend API:      http://localhost:5000');
console.log('\x1b[32m%s\x1b[0m', '  • Frontend App:     http://localhost:5173');
console.log('\x1b[32m%s\x1b[0m', '══════════════════════════════════════════════════════════════\n');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

// Start Backend API Server
const backend = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'pipe',
  shell: true,
  env: { ...process.env, PORT: '5000' }
});

backend.stdout.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => console.log('\x1b[36m[Backend]\x1b[0m', line));
});

backend.stderr.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => console.error('\x1b[31m[Backend Error]\x1b[0m', line));
});

// Start Frontend Vite Dev Server
const frontend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'pipe',
  shell: true
});

frontend.stdout.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => console.log('\x1b[32m[Frontend]\x1b[0m', line));
});

frontend.stderr.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => console.error('\x1b[33m[Frontend Msg]\x1b[0m', line));
});

function cleanup() {
  console.log('\nShutting down Law_BD development servers...');
  try {
    backend.kill();
    frontend.kill();
  } catch (e) {}
  process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
