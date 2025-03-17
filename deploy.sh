#!/bin/bash

echo "Starting deployment process..."

# Install dependencies
npm install

# Clean build directories
echo "Cleaning build directories..."
rm -rf dist api-dist
mkdir -p logs

# Build the frontend and API
echo "Building application..."
npm run build

# Stop previous instances
echo "Stopping previous instance..."
pm2 delete neija-rt-website || true

# Start with PM2
echo "Starting with PM2..."
pm2 start ecosystem.config.cjs

# Save PM2 configuration
pm2 save

echo "Deployment complete!"