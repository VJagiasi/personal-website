#!/bin/bash

# Migration script for reorganizing the project structure

# Create src directory structure if it doesn't exist
mkdir -p src/{app,components/{common,layout,features,ui},hooks,lib,context,styles,types}

# Copy app files to src/app
if [ -d "app" ]; then
  cp -r app/* src/app/ 2>/dev/null || true
  echo "Copied app files to src/app"
fi

# Copy components to src/components
if [ -d "components" ]; then
  # Move Navbar to layout
  if [ -f "components/Navbar.tsx" ]; then
    cp components/Navbar.tsx src/components/layout/
    echo "Moved Navbar to src/components/layout"
  fi
  
  # Move theme-provider to common
  if [ -f "components/theme-provider.tsx" ]; then
    cp components/theme-provider.tsx src/components/common/
    echo "Moved theme-provider to src/components/common"
  fi
  
  # Copy UI components
  if [ -d "components/ui" ]; then
    cp -r components/ui/* src/components/ui/ 2>/dev/null || true
    echo "Copied UI components to src/components/ui"
  fi
fi

# Copy hooks to src/hooks
if [ -d "hooks" ]; then
  cp -r hooks/* src/hooks/ 2>/dev/null || true
  echo "Copied hooks to src/hooks"
fi

# Copy lib to src/lib
if [ -d "lib" ]; then
  cp -r lib/* src/lib/ 2>/dev/null || true
  echo "Copied lib to src/lib"
fi

# Copy context to src/context
if [ -d "context" ]; then
  cp -r context/* src/context/ 2>/dev/null || true
  echo "Copied context to src/context"
fi

# Copy styles to src/styles
if [ -d "styles" ]; then
  cp -r styles/* src/styles/ 2>/dev/null || true
  echo "Copied styles to src/styles"
fi

echo "Migration completed. Please review the changes and update imports as needed."
echo "You can now safely remove the old directories after verifying the migration." 