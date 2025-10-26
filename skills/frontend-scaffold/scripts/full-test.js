#!/usr/bin/env node

/**
 * Full Integration Test Script for Frontend Scaffold
 * Tests all templates with pnpm package manager
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { ProjectGenerator } = require('./generate-project.js');

class FullIntegrationTester {
  constructor() {
    this.testDir = path.resolve(__dirname, '../test-output');
    this.templates = [
      {
        name: 'npm-package',
        inputs: {
          'PROJECT_TYPE': 'npm-package',
          'PACKAGE_NAME': 'test-library',
          'PACKAGE_DESCRIPTION': 'Test library for integration testing',
          'AUTHOR': 'Test Runner'
        },
        expectedFiles: [
          'package.json',
          'tsconfig.json',
          'rollup.config.js',
          'src/index.ts',
          'src/__tests__/index.test.ts'
        ],
        testCommands: ['build', 'test']
      },
      {
        name: 'react-vite',
        inputs: {
          'PROJECT_TYPE': 'react-vite',
          'PROJECT_NAME': 'test-react-app'
        },
        expectedFiles: [
          'package.json',
          'vite.config.ts',
          'tsconfig.json',
          'src/main.tsx',
          'src/App.tsx',
          'src/test/setup.ts'
        ],
        testCommands: ['build']
      },
      {
        name: 'nextjs-app-router',
        inputs: {
          'PROJECT_TYPE': 'nextjs-app-router',
          'PROJECT_NAME': 'test-nextjs-app'
        },
        expectedFiles: [
          'package.json',
          'next.config.js',
          'tsconfig.json',
          'jest.config.js',
          'jest.setup.js',
          'src/app/page.tsx',
          'src/app/layout.tsx'
        ],
        testCommands: ['build', 'lint']
      }
    ];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      info: 'ℹ️',
      success: '✅',
      error: '❌',
      warning: '⚠️',
      progress: '🔄'
    }[type] || 'ℹ️';

    console.log(`[${timestamp}] ${prefix} ${message}`);
  }

  async setupTestDirectory() {
    this.log('Setting up test directory...', 'info');

    // Clean up previous test directory
    if (fs.existsSync(this.testDir)) {
      fs.rmSync(this.testDir, { recursive: true, force: true });
    }

    // Create fresh test directory
    fs.mkdirSync(this.testDir, { recursive: true });
    this.log('Test directory created', 'success');
  }

  async generateProject(template) {
    this.log(`Generating ${template.name} project...`, 'progress');

    const generator = new ProjectGenerator(path.resolve(__dirname, '..'));
    const projectDir = path.join(this.testDir, template.inputs.PROJECT_NAME || template.inputs.PACKAGE_NAME);

    try {
      await generator.copyTemplate(template.name, projectDir, template.inputs);
      this.log(`${template.name} project generated successfully`, 'success');
      return projectDir;
    } catch (error) {
      this.log(`Failed to generate ${template.name} project: ${error.message}`, 'error');
      throw error;
    }
  }

  async verifyFiles(projectDir, template) {
    this.log(`Verifying expected files for ${template.name}...`, 'progress');

    const missingFiles = [];
    for (const file of template.expectedFiles) {
      const filePath = path.join(projectDir, file);
      if (!fs.existsSync(filePath)) {
        missingFiles.push(file);
      }
    }

    if (missingFiles.length > 0) {
      this.log(`Missing files in ${template.name}: ${missingFiles.join(', ')}`, 'error');
      throw new Error(`Missing files: ${missingFiles.join(', ')}`);
    }

    this.log(`All expected files found for ${template.name}`, 'success');
  }

  async installDependencies(projectDir, templateName) {
    this.log(`Installing dependencies for ${templateName} with pnpm...`, 'progress');

    try {
      execSync('pnpm install', {
        cwd: projectDir,
        stdio: 'pipe',
        timeout: 120000 // 2 minutes timeout
      });
      this.log(`Dependencies installed for ${templateName}`, 'success');
    } catch (error) {
      this.log(`Failed to install dependencies for ${templateName}: ${error.message}`, 'error');
      throw error;
    }
  }

  async runTests(projectDir, template) {
    this.log(`Running tests for ${template.name}...`, 'progress');

    for (const command of template.testCommands) {
      try {
        this.log(`Running 'pnpm run ${command}' for ${template.name}...`, 'progress');
        execSync(`pnpm run ${command}`, {
          cwd: projectDir,
          stdio: 'pipe',
          timeout: 120000 // 2 minutes timeout
        });
        this.log(`Command '${command}' passed for ${template.name}`, 'success');
      } catch (error) {
        this.log(`Command '${command}' failed for ${template.name}: ${error.message}`, 'error');
        throw error;
      }
    }
  }

  async testTemplate(template) {
    this.log(`Starting tests for ${template.name} template...`, 'info');

    try {
      // Generate project
      const projectDir = await this.generateProject(template);

      // Verify expected files
      await this.verifyFiles(projectDir, template);

      // Install dependencies
      await this.installDependencies(projectDir, template.name);

      // Run test commands
      await this.runTests(projectDir, template);

      this.log(`✅ ${template.name} template passed all tests!`, 'success');

      // Clean up project directory only on success
      fs.rmSync(projectDir, { recursive: true, force: true });

      return { success: true, template: template.name };

    } catch (error) {
      this.log(`❌ ${template.name} template failed: ${error.message}`, 'error');
      return { success: false, template: template.name, error: error.message };
    }
  }

  async runAllTests() {
    this.log('🚀 Starting Full Integration Tests for Frontend Scaffold', 'info');
    this.log(`Testing with pnpm package manager`, 'info');
    this.log(`Found ${this.templates.length} templates to test`, 'info');

    await this.setupTestDirectory();

    const results = [];

    for (const template of this.templates) {
      const result = await this.testTemplate(template);
      results.push(result);
    }

    // Cleanup test directory only if all tests passed
    const hasFailures = results.some(r => !r.success);
    if (!hasFailures && fs.existsSync(this.testDir)) {
      fs.rmSync(this.testDir, { recursive: true, force: true });
      this.log('All tests passed, cleaned up test directory', 'info');
    } else if (hasFailures) {
      this.log('Keeping test directory for debugging (some tests failed)', 'warning');
    }

    // Generate summary report
    this.generateSummaryReport(results);

    // Exit with appropriate code
    const failedTests = results.filter(r => !r.success);
    if (failedTests.length > 0) {
      process.exit(1);
    }
  }

  generateSummaryReport(results) {
    this.log('\n📊 Integration Test Summary Report', 'info');
    this.log('='.repeat(50), 'info');

    const passed = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    this.log(`Total Templates Tested: ${results.length}`, 'info');
    this.log(`✅ Passed: ${passed.length}`, 'success');
    this.log(`❌ Failed: ${failed.length}`, failed.length > 0 ? 'error' : 'info');

    if (passed.length > 0) {
      this.log('\n✅ Passed Templates:', 'success');
      passed.forEach(result => {
        this.log(`  - ${result.template}`, 'success');
      });
    }

    if (failed.length > 0) {
      this.log('\n❌ Failed Templates:', 'error');
      failed.forEach(result => {
        this.log(`  - ${result.template}: ${result.error}`, 'error');
      });
    }

    this.log('\n' + '='.repeat(50), 'info');

    if (failed.length === 0) {
      this.log('🎉 All templates are working correctly with pnpm!', 'success');
    } else {
      this.log('⚠️  Some templates need attention. Please check the errors above.', 'warning');
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new FullIntegrationTester();
  tester.runAllTests().catch(error => {
    console.error('❌ Test runner failed:', error.message);
    process.exit(1);
  });
}

module.exports = { FullIntegrationTester };