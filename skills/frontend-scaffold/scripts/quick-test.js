#!/usr/bin/env node

/**
 * Quick Test Script for Frontend Scaffold
 * Tests basic functionality without full integration
 */

const fs = require('fs');
const path = require('path');
const { ProjectGenerator } = require('./generate-project.js');

class QuickTester {
  constructor() {
    this.testDir = path.resolve(__dirname, '../temp');
    this.templates = ['npm-package', 'react-vite', 'nextjs-app-router'];
  }

  log(message, type = 'info') {
    const prefix = {
      info: 'ℹ️',
      success: '✅',
      error: '❌',
      progress: '🔄'
    }[type] || 'ℹ️';

    console.log(`${prefix} ${message}`);
  }

  async setupTestDirectory() {
    // Clean up previous test directory
    if (fs.existsSync(this.testDir)) {
      fs.rmSync(this.testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(this.testDir, { recursive: true });
  }

  async testBasicGeneration() {
    this.log('Running quick tests for frontend-scaffold...', 'info');

    await this.setupTestDirectory();
    const generator = new ProjectGenerator(path.resolve(__dirname, '..'));

    for (const template of this.templates) {
      try {
        this.log(`Testing ${template} template generation...`, 'progress');

        const inputs = template === 'npm-package'
          ? {
              'PROJECT_TYPE': 'npm-package',
              'PACKAGE_NAME': 'quick-test-lib',
              'PACKAGE_DESCRIPTION': 'Quick test library',
              'AUTHOR': 'Quick Test'
            }
          : {
              'PROJECT_TYPE': template,
              'PROJECT_NAME': 'quick-test-' + template.replace('-', '-')
            };

        const projectDir = path.join(this.testDir, inputs.PACKAGE_NAME || inputs.PROJECT_NAME);

        await generator.copyTemplate(template, projectDir, inputs);

        // Check key files exist
        const packageJsonPath = path.join(projectDir, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          this.log(`${template} template generated successfully`, 'success');

          // Clean up
          fs.rmSync(projectDir, { recursive: true, force: true });
        } else {
          throw new Error('package.json not found');
        }

      } catch (error) {
        this.log(`${template} template failed: ${error.message}`, 'error');
        throw error;
      }
    }

    // Cleanup
    fs.rmSync(this.testDir, { recursive: true, force: true });
    this.log('🎉 All quick tests passed!', 'success');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new QuickTester();
  tester.testBasicGeneration().catch(error => {
    console.error('❌ Quick test failed:', error.message);
    process.exit(1);
  });
}

module.exports = { QuickTester };