#!/usr/bin/env node

/**
 * Marketplace Manager for Frontend Scaffold Skills
 */

const fs = require('fs');
const path = require('path');

function loadMarketplaceConfig() {
  try {
    const configPath = path.resolve(__dirname, 'marketplace.json');
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (error) {
    console.error('❌ Error loading marketplace configuration:', error.message);
    process.exit(1);
  }
}

function listSkills() {
  const config = loadMarketplaceConfig();

  console.log('\n🛍️  Frontend Scaffold Marketplace\n');
  console.log('Available Skills:\n');

  config.skills.forEach((skill, index) => {
    console.log(`${index + 1}. ${skill.name}`);
    console.log(`   📝 ${skill.description}`);
    console.log(`   📁 Location: ${skill.path}`);
    console.log(`   🏷️  Tags: ${skill.tags.join(', ')}`);
    console.log(`   ⚡ Entry Point: ${skill.entry_point}`);
    console.log();
  });
}

function getSkillPath(skillName) {
  const config = loadMarketplaceConfig();
  const skill = config.skills.find(s => s.name === skillName);

  if (!skill) {
    console.error(`❌ Skill '${skillName}' not found in marketplace`);
    console.log('\nAvailable skills:');
    config.skills.forEach(s => console.log(`  - ${s.name}`));
    process.exit(1);
  }

  return path.resolve(__dirname, skill.path);
}

function runSkill(skillName, args = []) {
  const skillPath = getSkillPath(skillName);
  const entryPoint = path.join(skillPath, 'scripts/cli.js');

  if (!fs.existsSync(entryPoint)) {
    console.error(`❌ Entry point not found: ${entryPoint}`);
    process.exit(1);
  }

  console.log(`🚀 Running skill: ${skillName}`);

  try {
    const { spawn } = require('child_process');
    const process = spawn('node', [entryPoint, ...args], {
      stdio: 'inherit',
      cwd: skillPath
    });

    // Process will exit automatically when child process exits

  } catch (error) {
    console.error('❌ Error running skill:', error.message);
    process.exit(1);
  }
}

function testSkill(skillName) {
  const skillPath = getSkillPath(skillName);
  const testScript = path.join(skillPath, 'scripts/test-generation.js');

  if (!fs.existsSync(testScript)) {
    console.log(`ℹ️  No tests found for skill: ${skillName}`);
    return;
  }

  console.log(`🧪 Testing skill: ${skillName}`);

  try {
    const { spawnSync } = require('child_process');
    const result = spawnSync('node', [testScript], {
      cwd: skillPath,
      stdio: 'inherit'
    });

    if (result.status === 0) {
      console.log(`✅ Tests passed for skill: ${skillName}`);
    } else {
      console.log(`❌ Tests failed for skill: ${skillName}`);
      process.exit(result.status);
    }

  } catch (error) {
    console.error('❌ Error running tests:', error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
Frontend Scaffold Marketplace Manager

Usage: node marketplace-manager.js <command> [skill-name] [options]

Commands:
  list                          List all available skills
  use <skill-name> [args...]     Use a specific skill
  test <skill-name>               Test a specific skill
  help                           Show this help message

Examples:
  node marketplace-manager.js list
  node marketplace-manager.js use frontend-scaffold --help
  node marketplace-manager.js use frontend-scaffold npm-package --name my-app
  node marketplace-manager.js test frontend-scaffold

Skills are located in the skills/ directory. Each skill contains its own
documentation (SKILL.md) and can be used independently.
  `);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    showHelp();
    return;
  }

  const command = args[0].toLowerCase();

  switch (command) {
    case 'list':
      listSkills();
      break;

    case 'use':
      if (args.length < 2) {
        console.error('❌ Skill name is required');
        console.log('Usage: node marketplace-manager.js use <skill-name> [args...]');
        process.exit(1);
      }
      const skillName = args[1];
      const skillArgs = args.slice(2);
      runSkill(skillName, skillArgs);
      break;

    case 'test':
      if (args.length < 2) {
        console.error('❌ Skill name is required');
        console.log('Usage: node marketplace-manager.js test <skill-name>');
        process.exit(1);
      }
      testSkill(args[1]);
      break;

    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;

    default:
      console.error(`❌ Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { listSkills, runSkill, testSkill, loadMarketplaceConfig };