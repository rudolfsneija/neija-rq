#!/bin/bash

echo "Starting quick update..."

# Build the application
echo "Building application..."
npm run build

# Reload the application (keeps it running, just reloads)
echo "Reloading application..."
pm2 reload neija-rt-website

echo "Update complete!"