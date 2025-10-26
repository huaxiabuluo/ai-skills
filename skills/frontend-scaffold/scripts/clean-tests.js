#!/usr/bin/env node

/**
 * Clean Test Directories Script
 * Removes all test-related directories and files
 */

const fs = require('fs');
const path = require('path');

class TestCleaner {
  constructor() {
    this.rootDir = path.resolve(__dirname, '..');
    this.testDirs = ['test-output', 'temp', 'test-results', 'test-reports'];
    this.testPrefixes = ['test-', 'temp-', 'debug-'];
  }

  log(message, type = 'info') {
    const prefix = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    }[type] || 'ℹ️';

    console.log(`${prefix} ${message}`);
  }

  cleanDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      this.log(`Removed directory: ${dirPath}`, 'success');
      return true;
    }
    return false;
  }

  cleanTestFiles() {
    let cleaned = 0;

    // Remove standard test directories
    for (const dir of this.testDirs) {
      const dirPath = path.join(this.rootDir, dir);
      if (this.cleanDirectory(dirPath)) {
        cleaned++;
      }
    }

    // Remove directories with test prefixes
    const items = fs.readdirSync(this.rootDir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        const hasTestPrefix = this.testPrefixes.some(prefix =>
          item.name.startsWith(prefix)
        );

        if (hasTestPrefix) {
          const dirPath = path.join(this.rootDir, item.name);
          if (this.cleanDirectory(dirPath)) {
            cleaned++;
          }
        }
      }
    }

    return cleaned;
  }

  run() {
    this.log('🧹 Cleaning up test directories and files...', 'info');

    try {
      const cleaned = this.cleanTestFiles();

      if (cleaned > 0) {
        this.log(`✅ Successfully cleaned ${cleaned} test directories`, 'success');
      } else {
        this.log('ℹ️ No test directories found to clean', 'info');
      }

      this.log('🎉 Cleanup completed!', 'success');
    } catch (error) {
      this.log(`❌ Cleanup failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run cleaner if this file is executed directly
if (require.main === module) {
  const cleaner = new TestCleaner();
  cleaner.run();
}

module.exports = { TestCleaner };