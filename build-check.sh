#!/bin/bash

echo "Running Next.js build..."
npm run build

echo "Checking build output directory..."
if [ -d "dist" ]; then
  echo "✅ dist directory exists"
  
  if [ -f "dist/routes-manifest.json" ]; then
    echo "✅ routes-manifest.json exists in dist directory"
  else
    echo "❌ routes-manifest.json not found in dist directory"
    echo "Files in dist directory:"
    ls -la dist
  fi
else
  echo "❌ dist directory does not exist"
  echo "Current directory contents:"
  ls -la
fi 