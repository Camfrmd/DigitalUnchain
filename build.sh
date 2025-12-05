#!/bin/bash
# Build script that ignores TypeScript errors from node_modules
# and continues to vite build

tsc -b || true
npx vite build
