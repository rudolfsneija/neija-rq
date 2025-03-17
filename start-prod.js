/**
 * This is a simple CommonJS starter script to avoid
 * module system conflicts when starting the server.
 */
const path = require('path');
const { spawn } = require('child_process');

// Start the server with NODE_PATH environment variable
const env = Object.assign({}, process.env);
env.NODE_PATH = path.resolve(__dirname);

const server = spawn('node', ['api-dist/api/server.js'], {
  env,
  stdio: 'inherit'
});

server.on('exit', (code) => {
  process.exit(code);
});