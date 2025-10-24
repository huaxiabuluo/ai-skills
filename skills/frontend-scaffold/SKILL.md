---
name: frontend-scaffold
description: This skill should be used when users need to create frontend project scaffolds. It supports generating three types of projects: npm packages with TypeScript, React + Vite applications with TypeScript and Tailwind CSS, and Next.js applications with App Router and Tailwind CSS.
---

# Frontend Scaffold Generator

## Overview

This skill enables rapid creation of frontend project scaffolds with modern best practices and development tools pre-configured. It generates production-ready project templates with TypeScript, testing frameworks, linting tools, and development environments set up.

## Quick Start

To create a frontend project, determine which type matches your needs and use the appropriate command:

- **npm Package**: For creating reusable TypeScript libraries and packages
- **React + Vite**: For modern single-page applications with fast development experience
- **Next.js App Router**: For full-stack applications with server-side rendering

## Available Templates

### 1. npm Package Template
**Use when**: Creating reusable TypeScript libraries, utility packages, or components for distribution

**Features**:
- TypeScript with strict configuration
- Rollup for bundling (CommonJS and ESM outputs)
- Jest for testing with jsdom environment
- ESLint for code quality
- Automated build and development scripts
- Package publishing configuration

**Project Structure**:
```
src/
├── index.ts          # Main entry point
├── utils.ts          # Utility functions
└── __tests__/        # Test files
├── package.json
├── tsconfig.json
├── rollup.config.js
├── jest.config.js
└── .eslintrc.js
```

### 2. React + Vite Template
**Use when**: Building modern single-page applications with excellent development experience

**Features**:
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- React Router for navigation
- Vitest for testing with jsdom
- ESLint for code quality
- Husky + lint-staged for pre-commit hooks
- Path aliases (@/*)

**Project Structure**:
```
src/
├── main.tsx          # Application entry
├── App.tsx           # Main app component
├── index.css         # Global styles
├── pages/            # Page components
├── components/       # Reusable components
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
└── test/            # Test setup and utilities
```

### 3. Next.js App Router Template
**Use when**: Building full-stack applications with server-side rendering and SEO optimization

**Features**:
- Next.js 14 with App Router
- TypeScript configuration
- Tailwind CSS for styling
- Jest and React Testing Library for testing
- Server components and client components
- Optimized for production deployment
- Path aliases (@/*)

**Project Structure**:
```
src/
├── app/
│   ├── layout.tsx    # Root layout
│   ├── page.tsx       # Home page
│   ├── globals.css    # Global styles
│   └── about/         # About page
├── components/        # Reusable components
└── lib/              # Utility libraries
```

## Usage Workflow

### Step 1: Determine Project Type
Ask the user about their requirements:
- Are you creating a reusable library? → npm Package
- Building a single-page application? → React + Vite
- Need server-side rendering or full-stack features? → Next.js

### Step 2: Gather Required Information
Collect specific inputs based on project type:

**For npm packages**:
- Package name (kebab-case)
- Package description
- Author name

**For applications**:
- Project name (kebab-case)

### Step 3: Generate Project
Execute the project generation script:

**Interactive version** (prompts for information):
```bash
node scripts/generate-project.js <project-type>
```

**CLI version** (pass all parameters as arguments):
```bash
# npm package
node scripts/cli.js npm-package --name <package-name> --description "<description>" --author "<author>"

# React app
node scripts/cli.js react-vite --name <project-name>

# Next.js app
node scripts/cli.js nextjs-app-router --name <project-name>
```

### Step 4: Post-Generation Setup
Provide the user with next steps:
1. Navigate to project directory
2. Install dependencies
3. Start development server
4. Run tests to verify setup

## Template Customization

Each template can be customized through their respective configuration files:

### Common Customizations
- **Dependencies**: Modify `package.json` to add/remove packages
- **TypeScript**: Adjust `tsconfig.json` for different compiler options
- **Testing**: Update Jest configurations for different testing needs
- **Styling**: Modify Tailwind CSS configurations

### Template-Specific Customizations

#### npm Package
- **Rollup Config**: Adjust bundling options in `rollup.config.js`
- **Export Structure**: Modify `src/index.ts` to expose different APIs
- **Build Targets**: Update package.json for different output formats

#### React + Vite
- **Vite Config**: Modify build and development server settings
- **Routing**: Expand React Router configuration
- **State Management**: Add state management libraries

#### Next.js App Router
- **Layout System**: Customize layouts and page structures
- **API Routes**: Add API endpoints in app/api/
- **Middleware**: Configure middleware for authentication, etc.

## Best Practices Applied

### Code Quality
- All templates include ESLint configuration
- TypeScript strict mode enabled
- Pre-commit hooks for React + Vite template

### Testing
- Jest and jsdom for DOM testing
- Test file patterns configured
- Example tests included

### Performance
- Optimized build configurations
- Code splitting for applications
- Efficient bundling for packages

### Developer Experience
- Fast development servers (Vite/Next.js)
- Hot module replacement
- Clear project organization
- Comprehensive documentation

## Resources

### scripts/
- **generate-project.js**: Main project generation script with interactive prompts, template copying, and placeholder replacement
- **cli.js**: Simplified CLI version for non-interactive project generation with command-line arguments
- **test-generation.js**: Test script to validate project generation functionality

### assets/
Contains three template directories:

- **npm-package/**: Complete npm package template with TypeScript, Rollup, Jest, and ESLint
- **react-vite/**: React + Vite application with TypeScript, Tailwind CSS, React Router, Vitest, and pre-commit hooks
- **nextjs-app-router/**: Next.js application with App Router, TypeScript, Tailwind CSS, and Jest testing setup

Each template includes:
- Complete project structure
- Configuration files
- Example components and pages
- Development and build scripts
- Testing setup with example tests
- TypeScript configurations with path aliases
- CSS/styling setup with Tailwind CSS