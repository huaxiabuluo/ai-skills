# Testing Guide for Frontend Scaffold

This document explains how to test the frontend-scaffold generator and its templates.

## Overview

Frontend scaffold includes several testing levels to ensure all templates work correctly:

1. **Basic Tests** (`npm test`) - Template validation and basic functionality
2. **Quick Tests** (`npm run test:quick`) - Fast template generation verification
3. **Full Integration Tests** (`npm run test:full`) - Complete build and test verification

## Available Test Scripts

### Basic Tests
```bash
npm test
# or
pnpm test
```
Runs the original test suite that validates:
- Template directories exist
- Input validation works correctly
- Basic functionality verification

### Quick Tests
```bash
npm run test:quick
# or
pnpm run test:quick
```
Fast tests that:
- Generate each template project
- Verify basic file structure
- Clean up automatically
- Takes ~30 seconds

### Full Integration Tests
```bash
npm run test:full
# or
pnpm run test:full
```
Comprehensive tests that:
- Generate each template project
- Install dependencies with pnpm
- Run build and test commands
- Verify all expected files exist
- Generate detailed report
- Takes ~5-10 minutes

### All Tests
```bash
npm run test:all
# or
pnpm run test:all
```
Runs all test suites in sequence: basic → quick → full

## Test Output

### Test Directories
All test artifacts are created in temporary directories that are automatically cleaned up:

- `test-output/` - Full integration test projects
- `temp/` - Quick test projects
- `test-*/` - Individual test projects

These directories are ignored by Git (see `.gitignore`).

### Test Reports

Full integration tests generate a detailed summary report:
```
📊 Integration Test Summary Report
==================================================
Total Templates Tested: 3
✅ Passed: 3
❌ Failed: 0

✅ Passed Templates:
  - npm-package
  - react-vite
  - nextjs-app-router

==================================================
🎉 All templates are working correctly with pnpm!
```

## Template-Specific Tests

### npm-package Template
- Generates: `test-library`
- Verifies: Rollup build, Jest tests
- Expected files: `package.json`, `tsconfig.json`, `rollup.config.js`, `src/index.ts`, `src/__tests__/index.test.ts`
- Test commands: `build`, `test`
- Key dependencies: Rollup v4.52+, TypeScript v5.9+, Jest v30.2+

### react-vite Template
- Generates: `test-react-app`
- Verifies: Vite build, TypeScript compilation
- Expected files: `package.json`, `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, `src/App.tsx`, `src/test/setup.ts`
- Test commands: `build`
- Key dependencies: React v19, Vite v7.1+, Tailwind CSS v4.1+

### nextjs-app-router Template
- Generates: `test-nextjs-app`
- Verifies: Next.js build
- Expected files: `package.json`, `next.config.js`, `tsconfig.json`, `jest.config.js`, `src/app/page.tsx`, `src/app/layout.tsx`
- Test commands: `build`
- Key dependencies: Next.js v16.0+, React v19, Tailwind CSS v4.1+

## Troubleshooting

### Common Issues

1. **pnpm not found**
   ```bash
   npm install -g pnpm
   ```

2. **Permission errors**
   ```bash
   chmod +x scripts/*.js
   ```

3. **Test timeout**
   - Increase timeout in test scripts
   - Check network connectivity for dependency installation

4. **Missing dependencies**
   ```bash
   pnpm install
   ```

### Debug Mode

To debug test failures, you can modify the test scripts to:
- Increase timeout values
- Add more verbose logging
- Keep test directories for inspection
- Run individual template tests

### Manual Testing

For manual testing, use the generation script directly:
```bash
node scripts/generate-project.js npm-package
cd test-library
pnpm install
pnpm run build
pnpm test
```

## Contributing

When adding new templates or modifying existing ones:

1. Update the test configuration in `scripts/full-test.js`
2. Add expected files to the template configuration
3. Update this documentation
4. Run `npm run test:all` to verify everything works

## Continuous Integration

These tests are designed to run in CI/CD environments:
- No interactive prompts
- Automatic cleanup
- Clear exit codes for pass/fail
- Detailed logging for debugging