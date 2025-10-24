#!/usr/bin/env node

/**
 * Simplified CLI for project generation
 */

const { ProjectGenerator } = require('./generate-project.js');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    type: null,
    name: null,
    description: null,
    author: 'Unknown Author'
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];

    switch (arg) {
      case '--name':
        options.name = args[i + 1];
        i += 2;
        break;
      case '--description':
        options.description = args[i + 1];
        i += 2;
        break;
      case '--author':
        options.author = args[i + 1];
        i += 2;
        break;
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
      default:
        if (!options.type) {
          options.type = arg;
        } else if (!options.name) {
          options.name = arg;
        }
        i++;
        break;
    }
  }

  if (!options.type) {
    console.log('❌ Project type is required');
    showHelp();
    process.exit(1);
  }

  const validTypes = ['npm-package', 'react-vite', 'nextjs-app-router'];
  if (!validTypes.includes(options.type)) {
    console.log('❌ Invalid project type. Valid types:', validTypes.join(', '));
    process.exit(1);
  }

  return options;
}

function showHelp() {
  console.log(`
Frontend Project Generator

Usage: node cli.js <type> [options]

Project Types:
  npm-package           Generate TypeScript npm package
  react-vite           Generate React + Vite application
  nextjs-app-router    Generate Next.js application with App Router

Options:
  --name <name>        Project/package name (required for react-vite/nextjs-app-router)
  --description <desc> Package description (required for npm-package)
  --author <author>    Package author (required for npm-package)
  --help, -h          Show this help message

Examples:
  # Generate npm package
  node cli.js npm-package --name my-lib --description "My awesome library" --author "John Doe"

  # Generate React app
  node cli.js react-vite --name my-react-app

  # Generate Next.js app
  node cli.js nextjs-app-router --name my-nextjs-app
  `);
}

async function main() {
  try {
    const args = parseArgs();

    const skillPath = path.resolve(__dirname, '..');
    const generator = new ProjectGenerator(skillPath);

    // Prepare inputs based on project type
    const inputs = {
      PROJECT_TYPE: args.type
    };

    if (args.type === 'npm-package') {
      if (!args.name) {
        console.log('❌ Package name is required for npm-package type');
        console.log('   Use: node cli.js npm-package --name <package-name> --description "<desc>" --author "<author>"');
        process.exit(1);
      }
      if (!args.description) {
        console.log('❌ Package description is required for npm-package type');
        process.exit(1);
      }

      inputs['PACKAGE_NAME'] = args.name;
      inputs['PACKAGE_DESCRIPTION'] = args.description;
      inputs['AUTHOR'] = args.author;
    } else {
      if (!args.name) {
        console.log('❌ Project name is required for', args.type);
        console.log(`   Use: node cli.js ${args.type} --name <project-name>`);
        process.exit(1);
      }
      inputs['PROJECT_NAME'] = args.name;
    }

    // Validate inputs
    if (!generator.validateInputs(inputs)) {
      console.log('❌ Input validation failed');
      process.exit(1);
    }

    // Determine project directory
    const projectName = inputs['PROJECT_NAME'] || inputs['PACKAGE_NAME'];
    const projectDir = path.join(process.cwd(), projectName);

    // Generate project
    console.log(`🚀 Creating ${args.type} project: ${projectName}`);
    const success = await generator.copyTemplate(args.type, projectDir, inputs);

    if (!success) {
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}