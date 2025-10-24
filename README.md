# Frontend Scaffold Marketplace

A collection of frontend project scaffolds and templates for rapid development.

## 🚀 Skills Available

### Frontend Scaffold Generator
**Location**: `skills/frontend-scaffold/`

**Description**: Generate modern frontend project scaffolds with TypeScript, React, Vite, and Next.js templates.

**Features**:
- ✅ npm Package scaffolding with TypeScript, Rollup, Jest, and ESLint
- ✅ React + Vite application with TypeScript, Tailwind CSS, and React Router
- ✅ Next.js App Router application with TypeScript and Tailwind CSS
- ✅ Interactive and CLI-based project generation
- ✅ Complete development environments with testing and linting

**Usage**:
```bash
# Navigate to skill directory
cd skills/frontend-scaffold

# Interactive project generation
node scripts/generate-project.js <project-type>

# CLI project generation
node scripts/cli.js npm-package --name my-lib --description "My library" --author "Author"
node scripts/cli.js react-vite --name my-react-app
node scripts/cli.js nextjs-app-router --name my-nextjs-app
```

## 📁 Project Structure

```
├── skills/
│   └── frontend-scaffold/          # Frontend scaffold generator skill
│       ├── SKILL.md              # Skill documentation
│       ├── package.json           # Node.js package configuration
│       ├── scripts/              # Generation scripts
│       │   ├── generate-project.js    # Interactive generator
│       │   ├── cli.js               # CLI version
│       │   └── test-generation.js    # Test utilities
│       └── assets/               # Project templates
│           ├── npm-package/       # TypeScript library template
│           ├── react-vite/        # React + Vite template
│           └── nextjs-app-router/ # Next.js App Router template
└── README.md                   # This file
```

## 🔧 Development

Each skill is self-contained and can be used independently:

```bash
# Test a specific skill
cd skills/frontend-scaffold
node scripts/test-generation.js

# Use a skill for project generation
cd skills/frontend-scaffold
node scripts/cli.js --help
```

## 📦 Installation

This marketplace collection contains skills that can be installed individually or as a complete set.

### Install Individual Skill
```bash
# Navigate to specific skill directory
cd skills/frontend-scaffold

# Install dependencies (if needed)
npm install

# Use the skill
node scripts/cli.js --help
```

### Use with Claude Code
The skills in this marketplace are designed to work with Claude Code and can be loaded for automated project generation and development assistance.

## 🤝 Contributing

To add new skills to this marketplace:

1. Create a new directory under `skills/`
2. Follow the skill structure format
3. Include proper documentation (SKILL.md)
4. Add tests and examples
5. Update this README.md

## 📄 License

MIT License - See individual skill directories for specific licensing information.