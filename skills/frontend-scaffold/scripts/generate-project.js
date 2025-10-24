#!/usr/bin/env node

/**
 * Frontend Project Generator Script
 * Generates frontend projects from templates using the frontend-scaffold skill.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

class ProjectGenerator {
  constructor(skillPath) {
    this.skillPath = path.resolve(skillPath);
    this.templatesPath = path.join(this.skillPath, 'assets');
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async question(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async getUserInput(projectType) {
    const inputs = {};

    if (projectType === 'npm-package') {
      inputs['PACKAGE_NAME'] = await this.question('Package name (e.g., my-awesome-lib): ');
      inputs['PACKAGE_DESCRIPTION'] = await this.question('Package description: ');
      inputs['AUTHOR'] = await this.question('Author name: ');
    } else {
      inputs['PROJECT_NAME'] = await this.question('Project name (e.g., my-awesome-app): ');
    }

    inputs['PROJECT_TYPE'] = projectType;
    return inputs;
  }

  validateInputs(inputs) {
    const requiredFields = {
      'npm-package': ['PACKAGE_NAME', 'PACKAGE_DESCRIPTION', 'AUTHOR'],
      'react-vite': ['PROJECT_NAME'],
      'nextjs-app-router': ['PROJECT_NAME']
    };

    const projectType = inputs['PROJECT_TYPE'];
    if (!requiredFields[projectType]) {
      console.log(`❌ Invalid project type: ${projectType}`);
      return false;
    }

    for (const field of requiredFields[projectType]) {
      if (!inputs[field] || inputs[field].trim() === '') {
        console.log(`❌ ${field} is required`);
        return false;
      }
    }

    // Validate package/project name format
    const nameField = projectType === 'npm-package' ? 'PACKAGE_NAME' : 'PROJECT_NAME';
    const name = inputs[nameField];
    const nameRegex = /^[a-z][a-z0-9-_]*$/;

    if (!nameRegex.test(name)) {
      console.log(`❌ ${nameField} should start with a lowercase letter and contain only lowercase letters, numbers, hyphens, and underscores`);
      return false;
    }

    return true;
  }

  async copyTemplate(templateName, targetDir, inputs) {
    const templatePath = path.join(this.templatesPath, templateName);
    const targetPath = path.resolve(targetDir);

    // Check if template exists
    if (!fs.existsSync(templatePath)) {
      console.log(`❌ Template '${templateName}' not found at ${templatePath}`);
      return false;
    }

    // Check if target directory exists
    if (fs.existsSync(targetPath)) {
      const response = await this.question(`⚠️  Directory '${targetDir}' already exists. Overwrite? (y/N): `);
      if (response.toLowerCase() !== 'y') {
        console.log('❌ Project generation cancelled');
        return false;
      }
      fs.rmSync(targetPath, { recursive: true, force: true });
    }

    try {
      // Copy template directory
      fs.cpSync(templatePath, targetPath, { recursive: true });

      // Replace placeholders in files
      this._replacePlaceholders(targetPath, inputs);

      const projectName = inputs['PROJECT_NAME'] || inputs['PACKAGE_NAME'];
      console.log(`✅ Project '${projectName}' created successfully!`);
      console.log(`📁 Location: ${targetPath}`);

      // Show next steps
      this._showNextSteps(templateName, targetPath);

      return true;

    } catch (error) {
      console.log(`❌ Error creating project: ${error.message}`);
      if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
      }
      return false;
    } finally {
      this.rl.close();
    }
  }

  _replacePlaceholders(directory, inputs) {
    const files = this._getAllFiles(directory);

    for (const filePath of files) {
      try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace placeholders
        for (const [placeholder, value] of Object.entries(inputs)) {
          const placeholderPattern = `{{${placeholder}}}`;
          content = content.replace(new RegExp(placeholderPattern.replace(/[{}]/g, '\\$&'), 'g'), value);
        }

        fs.writeFileSync(filePath, content, 'utf8');
      } catch (error) {
        // Skip binary files or files we can't read
        continue;
      }
    }
  }

  _getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = this._getAllFiles(fullPath, arrayOfFiles);
      } else {
        arrayOfFiles.push(fullPath);
      }
    });

    return arrayOfFiles;
  }

  _showNextSteps(templateName, projectPath) {
    const projectName = path.basename(projectPath);

    console.log('\n🚀 Next steps:');
    console.log(`   cd ${projectName}`);

    switch (templateName) {
      case 'npm-package':
        console.log('   npm install');
        console.log('   npm run dev    # Start development');
        console.log('   npm test       # Run tests');
        console.log('   npm run build  # Build for production');
        break;

      case 'react-vite':
        console.log('   npm install');
        console.log('   npm run dev    # Start development server');
        console.log('   npm test       # Run tests');
        console.log('   npm run build  # Build for production');
        console.log('   npm run lint   # Check code quality');
        break;

      case 'nextjs-app-router':
        console.log('   npm install');
        console.log('   npm run dev    # Start development server');
        console.log('   npm test       # Run tests');
        console.log('   npm run build  # Build for production');
        console.log('   npm start      # Start production server');
        break;
    }

    console.log('\n📚 Documentation:');
    console.log('   Read the README.md file for more information');
    console.log('   Check package.json for available scripts');
  }
}

function showHelp() {
  console.log(`
Usage: node generate-project.js <type> [name]

Arguments:
  type                    Type of project to generate
                          Choices: npm-package, react-vite, nextjs-app-router
  name                   Project name (optional, will prompt if not provided)

Options:
  --skill-path <path>     Path to the frontend-scaffold skill directory
                          Default: ./frontend-scaffold
  --help, -h             Show this help message

Examples:
  node generate-project.js npm-package
  node generate-project.js react-vite my-awesome-app
  node generate-project.js nextjs-app-router --skill-path /path/to/skill
  `);
}

function parseArguments() {
  const args = process.argv.slice(2);
  const options = {
    type: null,
    name: null,
    skillPath: path.resolve(__dirname, '..')
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      showHelp();
      process.exit(0);
    } else if (arg === '--skill-path' && i + 1 < args.length) {
      options.skillPath = args[i + 1];
      i++; // Skip next argument
    } else if (!options.type) {
      options.type = arg;
    } else if (!options.name) {
      options.name = arg;
    }
  }

  const validTypes = ['npm-package', 'react-vite', 'nextjs-app-router'];

  if (!options.type || !validTypes.includes(options.type)) {
    console.log('❌ Please specify a valid project type: npm-package, react-vite, nextjs-app-router');
    showHelp();
    process.exit(1);
  }

  return options;
}

async function main() {
  try {
    const args = parseArguments();

    // Initialize generator
    const generator = new ProjectGenerator(args.skillPath);

    // Get user input
    const inputs = await generator.getUserInput(args.type);

    // Override name if provided in command line
    if (args.name) {
      if (args.type === 'npm-package') {
        inputs['PACKAGE_NAME'] = args.name;
      } else {
        inputs['PROJECT_NAME'] = args.name;
      }
    }

    // Validate inputs
    if (!generator.validateInputs(inputs)) {
      process.exit(1);
    }

    // Determine project directory
    const projectName = inputs['PROJECT_NAME'] || inputs['PACKAGE_NAME'];
    const projectDir = path.join(process.cwd(), projectName);

    // Generate project
    const success = await generator.copyTemplate(args.type, projectDir, inputs);

    if (!success) {
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    process.exit(1);
  }
}

// Export the class for testing
module.exports = { ProjectGenerator };

// Run main function
if (require.main === module) {
  main();
}