# Frontend Development Skills Marketplace

A collection of frontend development skills including project scaffolds, templates, documentation, and references for rapid development.

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

### Next.js Reference
**Location**: `skills/nextjs/`

**Description**: Comprehensive Next.js documentation and references for App Router and Pages Router patterns.

**Features**:
- 📚 Complete App Router documentation with examples
- 📚 Complete Pages Router documentation with examples
- 🔍 Common patterns and best practices
- 📖 API references and usage examples
- 🎯 Side-by-side comparisons between routing approaches

**Usage**:
```bash
# Navigate to skill directory
cd skills/nextjs

# Read the main documentation
cat SKILL.md

# Explore references
ls references/
ls references/app-router/
ls references/pages-router/
```

This is a documentation-type skill that provides comprehensive reference material for Next.js development without code generation capabilities.

## 📁 Project Structure

```
├── skills/
│   ├── frontend-scaffold/          # Frontend scaffold generator skill
│   │   ├── SKILL.md              # Skill documentation
│   │   ├── package.json           # Node.js package configuration
│   │   ├── scripts/              # Generation scripts
│   │   │   ├── generate-project.js    # Interactive generator
│   │   │   ├── cli.js               # CLI version
│   │   │   └── test-generation.js    # Test utilities
│   │   └── assets/               # Project templates
│   │       ├── npm-package/       # TypeScript library template
│   │       ├── react-vite/        # React + Vite template
│   │       └── nextjs-app-router/ # Next.js App Router template
│   └── nextjs/                   # Next.js reference skill
│       ├── SKILL.md              # Main documentation
│       ├── README.md             # Quick reference guide
│       └── references/           # Documentation by router type
│           ├── app-router/       # App Router docs
│           └── pages-router/     # Pages Router docs
└── README.md                   # This file
```

## 🔧 Development

Each skill is self-contained and can be used independently:

```bash
# Test the scaffold generator skill
cd skills/frontend-scaffold
node scripts/test-generation.js

# Use the scaffold generator for project generation
cd skills/frontend-scaffold
node scripts/cli.js --help

# Access Next.js documentation and references
cd skills/nextjs
cat SKILL.md
```

**Note**: The `frontend-scaffold` skill is a code generation tool, while `nextjs` is a documentation-type skill providing comprehensive reference material.

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