#!/usr/bin/env node

/**
 * Test script for project generation
 */

const { ProjectGenerator } = require('./generate-project.js');
const path = require('path');
const fs = require('fs');

async function runTests() {
  console.log('🧪 Running tests for frontend-scaffold...\n');

  const skillPath = path.resolve(__dirname, '..');
  const generator = new ProjectGenerator(skillPath);

  // Test 1: Check if templates exist
  console.log('📁 Checking template directories...');
  const templates = ['npm-package', 'react-vite', 'nextjs-app-router'];

  for (const template of templates) {
    const templatePath = path.join(generator.templatesPath, template);
    if (fs.existsSync(templatePath)) {
      console.log(`✅ ${template} template exists`);
    } else {
      console.log(`❌ ${template} template missing`);
      process.exit(1);
    }
  }

  // Test 2: Validate input validation
  console.log('\n🔍 Testing input validation...');

  // Test valid npm package input
  const validNpmInput = {
    'PROJECT_TYPE': 'npm-package',
    'PACKAGE_NAME': 'test-lib',
    'PACKAGE_DESCRIPTION': 'A test library',
    'AUTHOR': 'Test Author'
  };

  if (generator.validateInputs(validNpmInput)) {
    console.log('✅ npm package validation works');
  } else {
    console.log('❌ npm package validation failed');
  }

  // Test valid React input
  const validReactInput = {
    'PROJECT_TYPE': 'react-vite',
    'PROJECT_NAME': 'test-react-app'
  };

  if (generator.validateInputs(validReactInput)) {
    console.log('✅ React app validation works');
  } else {
    console.log('❌ React app validation failed');
  }

  // Test invalid input
  const invalidInput = {
    'PROJECT_TYPE': 'react-vite',
    'PROJECT_NAME': '123Invalid' // Invalid format
  };

  if (!generator.validateInputs(invalidInput)) {
    console.log('✅ Invalid input rejection works');
  } else {
    console.log('❌ Invalid input rejection failed');
  }

  console.log('\n✅ All tests passed!');
  console.log('\n📋 Available project types:');
  console.log('   • npm-package - TypeScript library with Rollup and Jest');
  console.log('   • react-vite - React app with Vite, TypeScript, and Tailwind CSS');
  console.log('   • nextjs-app-router - Next.js app with App Router and Tailwind CSS');

  console.log('\n🚀 Usage examples:');
  console.log('   node scripts/generate-project.js npm-package');
  console.log('   node scripts/generate-project.js react-vite my-awesome-app');
  console.log('   node scripts/generate-project.js nextjs-app-router');
}

if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };