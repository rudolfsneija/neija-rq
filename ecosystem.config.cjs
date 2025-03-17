module.exports = {
  apps: [{
    name: "neija-rt-website",
    script: "./api-dist/api/server.js",
    instances: 1,
    exec_mode: "fork",
    env: {
      NODE_ENV: "production",
      PORT: 3001
    },
    max_memory_restart: "300M",
    log_date_format: "YYYY-MM-DD HH:mm:ss Z"
  }]
};