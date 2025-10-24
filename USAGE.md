# Frontend Scaffold Marketplace - 使用指南

## 🚀 快速开始

### 1. 查看可用技能

```bash
# 列出所有可用技能
npm run list

# 或者直接使用管理器
node marketplace-manager.js list
```

### 2. 使用技能生成项目

#### 方法一：通过 Marketplace 管理器（推荐）
```bash
# 查看技能帮助
node marketplace-manager.js use frontend-scaffold --help

# 生成 npm 包
node marketplace-manager.js use frontend-scaffold npm-package --name my-lib --description "我的库" --author "作者名"

# 生成 React 应用
node marketplace-manager.js use frontend-scaffold react-vite --name my-react-app

# 生成 Next.js 应用
node marketplace-manager.js use frontend-scaffold nextjs-app-router --name my-nextjs-app
```

#### 方法二：直接使用技能
```bash
# 进入技能目录
cd skills/frontend-scaffold

# 生成项目
node scripts/cli.js <project-type> [options]
```

### 3. 测试技能

```bash
# 测试特定技能
node marketplace-manager.js test frontend-scaffold

# 或者使用 npm 脚本
npm run test
```

## 📁 项目结构

```
frontend-scaffold-marketplace/
├── skills/                    # 技能目录
│   └── frontend-scaffold/      # Frontend 脚手架技能
│       ├── SKILL.md          # 技能文档
│       ├── package.json       # 技能配置
│       ├── scripts/           # 生成脚本
│       │   ├── cli.js           # CLI 版本
│       │   ├── generate-project.js # 交互式版本
│       │   └── test-generation.js  # 测试脚本
│       └── assets/           # 项目模板
│           ├── npm-package/     # npm 包模板
│           ├── react-vite/      # React + Vite 模板
│           └── nextjs-app-router/ # Next.js 模板
├── marketplace-manager.js    # Marketplace 管理器
├── marketplace.json        # Marketplace 配置
├── package.json          # 项目配置
├── README.md             # 项目说明
└── USAGE.md              # 使用指南（本文件）
```

## 🛠️ 可用项目模板

### 1. npm Package
- **用途**：创建可重用的 TypeScript 库和包
- **包含**：TypeScript、Rollup 打包、Jest 测试、ESLint 代码检查
- **输出**：CommonJS 和 ESM 格式，支持 npm 发布

### 2. React + Vite
- **用途**：现代单页面应用程序
- **包含**：React 18、TypeScript、Vite、Tailwind CSS、React Router、Vitest 测试、ESLint
- **特性**：快速开发服务器、热重载、预提交 Git 钩子

### 3. Next.js App Router
- **用途**：全栈应用，支持 SSR 和 SEO 优化
- **包含**：Next.js 14、App Router、TypeScript、Tailwind CSS、Jest 测试
- **特性**：服务端组件、客户端组件、API 路由

## 🎯 使用示例

### 创建一个 UI 组件库
```bash
node marketplace-manager.js use frontend-scaffold npm-package --name my-ui-components --description "可复用的 React UI 组件库" --author "你的名字"

cd my-ui-components
npm install
npm run dev
```

### 创建一个 React 应用
```bash
node marketplace-manager.js use frontend-scaffold react-vite --name my-dashboard

cd my-dashboard
npm install
npm run dev
```

### 创建一个 Next.js 应用
```bash
node marketplace-manager.js use frontend-scaffold nextjs-app-router --name my-blog

cd my-blog
npm install
npm run dev
```

## 🧪 开发和测试

### 开发新技能
1. 在 `skills/` 目录下创建新技能
2. 遵循 `frontend-scaffold` 的结构模式
3. 添加 `SKILL.md` 文档
4. 创建测试脚本
5. 更新 `marketplace.json` 配置

### 测试现有技能
```bash
# 测试所有技能
npm run test-all

# 测试特定技能
node marketplace-manager.js test <skill-name>
```

## 📦 部署和分享

技能可以直接通过 Git 仓库分享，也可以打包分发：

```bash
# 打包整个 marketplace
git add .
git commit -m "Add marketplace with frontend-scaffold skill"
git push origin main
```

## 🔧 自定义配置

### 添加新技能模板
在对应技能的 `assets/` 目录下添加新模板，然后在脚本的模板列表中添加支持。

### 修改默认配置
编辑技能目录下的配置文件（如 `package.json`、`tsconfig.json` 等）来自定义项目设置。

## ❓ 常见问题

**Q: 如何添加新的项目类型？**
A: 在对应技能的脚本中添加新的模板类型和逻辑。

**Q: 生成的项目如何自定义？**
A: 生成的项目是完整的，可以直接修改 `package.json` 和其他配置文件。

**Q: 技能支持全局安装吗？**
A: 是的，每个技能都支持通过 `npm install -g` 全局安装。

---

💡 **提示**：始终在生成项目后查看生成的 `package.json` 文件，了解可用的脚本和配置。