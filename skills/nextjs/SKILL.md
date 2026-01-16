---
name: nextjs
description: |
  Next.js 全栈 React 框架技能，支持 App Router 和 Pages Router。
  提供 React Server Components、流式渲染、SSR、SSG、ISR 和 API 路由功能。
  当用户需要创建 Next.js 应用、配置路由、数据获取、样式、部署或任何 Next.js 相关任务时使用此技能。

metadata:
  version: 16.1.1
  tags: [react, fullstack, ssr, framework]
  categories: [frontend, backend]
  requires: [react, javascript]
---

# Next.js 技能

Next.js 是一个用于构建全栈 Web 应用的 React 框架，提供了一组优化的功能，可以预渲染应用程序内容。Next.js 采用基于文件系统的路由机制，支持多种渲染策略（静态站点生成 SSG、服务端渲染 SSR、增量静态再生成 ISR），并内置了 API 路由、图片优化、字体优化等性能优化功能。

Next.js 采用双 Router 架构：**App Router** 是基于 React Server Components 构建的新一代路由系统，推荐用于新项目；**Pages Router** 是传统的路由系统，继续为现有项目提供支持。两种 Router 使用不同的文件约定和数据获取模式，但可以共存于同一项目中。

本技能涵盖了 Next.js 的核心功能，包括路由系统、数据获取、渲染策略、样式方案、API 开发、部署配置等，并提供了 App Router 和 Pages Router 的完整文档参考。

## Router 选择

### App Router（新项目推荐）

适用于需要以下特性的新项目：

- **React Server Components**: 在服务端渲染组件，减少客户端 JavaScript 体积
- **流式渲染**: 逐步流式传输 UI，提升首屏加载体验
- **嵌套布局**: 构建复杂的嵌套 UI 布局，保持状态
- **现代缓存和重新验证**: 细粒度的数据缓存和重新验证控制
- **部分预渲染 (PPR)**: 混合静态和动态内容以获得最佳性能
- **React 19+ Canary**: 使用最新的 React 特性

App Router 文档位置: `references/app-router/`

### Pages Router（遗留支持）

适用于以下场景：

- **现有项目维护**: 已经使用 Pages Router 构建的项目
- **传统数据获取**: 使用 `getStaticProps`、`getServerSideProps`、`getStaticPaths`
- **项目 React 版本**: 使用项目 package.json 中的 React 版本（非 Canary）
- **向后兼容**: 需要与现有的 Pages Router 生态系统兼容

Pages Router 文档位置: `references/pages-router/`

### 选择建议

- **新项目**: 默认使用 App Router
- **迁移项目**: 可以使用增量迁移策略，逐步将 Pages Router 迁移到 App Router
- **不确定**: 如果用户没有明确说明是 Pages Router 项目，默认使用 App Router

## 核心概念

### 文件系统路由

- **App Router**: 使用 `app/` 目录，支持嵌套布局和路由组
- **Pages Router**: 使用 `pages/` 目录，基于文件层次结构自动生成路由

### 服务端 vs 客户端组件 (App Router)

- **服务端组件** (默认): 在服务端渲染，不能使用 hooks 和事件处理器
- **客户端组件**: 使用 `'use client'` 指令，可以交互和使用状态

### 渲染策略

- **静态站点生成 (SSG)**: 构建时预渲染 HTML
- **服务端渲染 (SSR)**: 每次请求时动态渲染 HTML
- **增量静态再生成 (ISR)**: 静态页面按需更新
- **客户端渲染 (CSR)**: 在浏览器中渲染内容

### 数据获取模式

- **App Router**: 使用 `fetch` API 扩展（缓存、重新验证）或异步组件
- **Pages Router**: 使用 `getStaticProps`、`getServerSideProps`、`getStaticPaths`

### API 路由

- **App Router**: 使用 `route.ts` (或 `.js`) 文件，支持标准 HTTP 方法
- **Pages Router**: 使用 `pages/api/` 目录下的文件

## 文档组织

本技能的参考文档按照以下结构组织：

### App Router (`references/app-router/`)

- `getting-started/`: 快速开始、安装、项目结构
- `guides/`: 功能指南（路由、数据获取、样式、部署等）
- `api-reference/`: API 参考（指令、组件、文件约定、函数、配置）
- `quick-reference.md`: 快速参考指南

### Pages Router (`references/pages-router/`)

- `getting-started/`: 快速开始、安装、项目结构
- `guides/`: 功能指南（路由、数据获取、样式、部署等）
- `building-your-application/`: 应用构建指南
- `api-reference/`: API 参考（组件、文件约定、函数、配置）
- `quick-reference.md`: 快速参考指南

### 共享概念 (`references/shared/`)

- `architecture/`: 架构概念（适用于两种 Router）
- `router-comparison.md`: Router 对比和迁移指南

### 工具和资源

- `assets/router-decision-tree.md`: Router 选择决策树

## 使用指南

当用户需要 Next.js 相关帮助时：

1. **确定 Router 类型**: 如果是新项目，使用 App Router；如果用户提到 `getStaticProps`、`pages/` 目录等，可能是 Pages Router
2. **查找相关文档**: 浏览 `references/` 下的目录结构查找相关文档
3. **提供代码示例**: 参考快速参考指南获取常用 API 和模式
4. **考虑最佳实践**: Next.js 官方文档推荐的模式和配置

## 快速开始命令

```bash
# 创建新的 Next.js 项目（默认 App Router）
npx create-next-app@latest my-app

# 创建 Pages Router 项目
npx create-next-app@latest my-app --use-npm --src-dir=false --import-alias="@/*" --no-app

# 开发服务器
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start
```

## 相关资源

- Next.js 官方文档: https://nextjs.org/docs
- Next.js GitHub: https://github.com/vercel/next.js
- Next.js 示例: https://github.com/vercel/next.js/tree/canary/examples
