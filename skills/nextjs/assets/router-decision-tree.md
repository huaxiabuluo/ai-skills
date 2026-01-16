# Next.js Router 选择决策树

本决策树帮助你选择使用 App Router 还是 Pages Router，以及如何处理迁移场景。

## 快速决策

```
┌─────────────────────────────────────────────────────────────┐
│                    你是在创建新项目吗？                        │
└─────────────────────────────┬───────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                   是                   否
                    │                   │
                    ▼                   ▼
            ┌──────────────┐    ┌──────────────┐
            │  App Router  │    │  继续下一步   │
            │   (推荐)     │    └──────┬───────┘
            └──────────────┘           │
                              ┌───────┴───────┐
                              │               │
                    已有 Pages Router   其他情况
                              │               │
                              ▼               ▼
                      ┌──────────────┐  ┌──────────────┐
                      │ Pages Router │  │  App Router  │
                      │   (保持)     │  │   (推荐)     │
                      └──────────────┘  └──────────────┘
```

## 详细问题决策流

### 问题 1: 这是新项目吗？

**是** → 使用 **App Router**

- ✅ 最新的功能和性能优化
- ✅ React Server Components 支持
- ✅ 流式渲染和 Suspense
- ✅ 更好的数据缓存和重新验证
- ✅ 更简单的布局系统

**否** → 继续下一个问题

---

### 问题 2: 现有项目使用 Pages Router 吗？

检查以下特征：
- 使用 `pages/` 目录
- 使用 `getStaticProps`、`getServerSideProps`
- 使用 `_app.tsx`、`_document.tsx`

**是** → 考虑以下选项：

**选项 A: 保持 Pages Router**
- 项目运行良好，无需重大更改
- 团队熟悉当前架构
- 没有性能或开发体验问题

**选项 B: 增量迁移到 App Router**
- 需要新功能（Server Components、流式渲染）
- 希望更好的开发体验
- 可以共存两种 Router

**否** → 继续下一个问题

---

### 问题 3: 是否需要以下现代特性？

**React Server Components**
- ✅ 减少客户端 JavaScript 体积
- ✅ 直接在服务端访问数据
- ✅ 更好的性能

**流式渲染**
- ✅ 逐步流式传输 UI
- ✅ 更快的首屏加载
- ✅ 更好的用户体验

**嵌套布局**
- ✅ 复杂的嵌套 UI 布局
- ✅ 保持嵌套状态
- ✅ 更简单的代码组织

**细粒度缓存控制**
- ✅ 使用 `fetch` 的缓存扩展
- ✅ 标签基础的重新验证
- ✅ 更灵活的数据获取

**部分预渲染 (PPR)**
- ✅ 混合静态和动态内容
- ✅ 最佳性能平衡

如果需要任何一项 → 使用 **App Router**

---

### 问题 4: 使用的 React 版本是什么？

**项目使用 React 19+ Canary** → App Router 完全兼容

**项目使用稳定版 React (18 或更早)** → 两种 Router 都支持

- **Pages Router**: 使用项目的 React 版本
- **App Router**: 使用 React 19+ Canary（独立于项目）

---

### 问题 5: 是否需要增量迁移？

如果你有一个现有的 Pages Router 应用，可以：

**策略 1: 并行运行**
- `app/` 目录（App Router）和 `pages/` 目录（Pages Router）共存
- 新功能使用 App Router
- 旧功能保持 Pages Router
- 逐步迁移

**策略 2: 完全迁移**
- 一次性迁移所有功能
- 需要更多工作，但代码更一致
- 参考: `references/app-router/guides/migrating/app-router-migration.mdx`

---

## 功能对比表

| 功能 | App Router | Pages Router |
|------|-----------|--------------|
| 路由目录 | `app/` | `pages/` |
| 布局 | ✅ 嵌套布局 | ❌ 需要 `_app.tsx` |
| 服务端组件 | ✅ 默认 | ❌ 不支持 |
| 客户端组件 | `'use client'` | 默认全部客户端 |
| 流式渲染 | ✅ 支持 | ❌ 不支持 |
| 数据获取 | `fetch` 扩展 | `getStaticProps`/`getServerSideProps` |
| 动态路由 | `[slug]` | `[slug].tsx` |
| 捕获所有路由 | `[...slug]` | `[...slug].tsx` |
| API 路由 | `route.ts` | `pages/api/` |
| 元数据 | `generateMetadata` | `<Head>` 组件 |
| 错误处理 | `error.tsx` | `_error.tsx` |
| 加载状态 | `loading.tsx` | 需要自定义 |
| React 版本 | 19+ Canary | 项目版本 |
| 缓存控制 | `fetch` 扩展 | 内置（有限） |
| 重新验证 | `revalidatePath`/`revalidateTag` | ISR 配置 |

## 常见场景决策

### 场景 1: 创建企业级后台管理面板

**推荐: App Router**

- 复杂的嵌套布局（侧边栏、顶栏、内容区）
- 大量数据表格需要服务端渲染
- 需要细粒度的缓存控制
- 希望减少客户端 JavaScript

### 场景 2: 简单的营销网站

**推荐: App Router 或 Pages Router**

- App Router: 简单的文件结构，更好的性能
- Pages Router: 如果你已经熟悉

### 场景 3: 电子商务网站

**推荐: App Router**

- 产品列表需要服务端渲染（SEO）
- 购物车需要客户端交互
- 需要细粒度的缓存和重新验证
- 复杂的布局（筛选器、列表、详情）

### 场景 4: 现有应用的渐进迁移

**推荐: 增量迁移**

- 保持现有 Pages Router 功能
- 新功能使用 App Router
- 逐步迁移关键功能

### 场景 5: 需要大量客户端交互的应用

**推荐: App Router（混合）**

- 默认服务端组件（性能、SEO）
- 需要交互的部分使用 `'use client'`
- 更好的性能平衡

### 场景 6: 遗留代码库维护

**推荐: Pages Router（保持）**

- 如果应用运行良好，无需重大更改
- 专注于功能开发而非重构
- 考虑团队资源和优先级

## 数据获取决策

### App Router 数据获取模式

```tsx
// 缓存数据
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 },
})

// 不缓存
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store',
})

// 按标签重新验证
const data = await fetch('https://api.example.com/data', {
  next: { tags: ['posts'] },
})
```

### Pages Router 数据获取模式

```tsx
// 静态生成 (SSG)
export async function getStaticProps() {
  const data = await fetchData()
  return {
    props: { data },
    revalidate: 3600, // ISR
  }
}

// 服务端渲染 (SSR)
export async function getServerSideProps() {
  const data = await fetchData()
  return {
    props: { data },
  }
}
```

## 迁移建议

### 从 Pages Router 迁移到 App Router

**优先级 1: 新功能**
- 直接在 `app/` 目录中开发新功能
- 两种 Router 可以共存

**优先级 2: 关键页面**
- 迁移流量大、性能敏感的页面
- 利用 Server Components 和流式渲染

**优先级 3: 简单页面**
- 迁移不依赖复杂 Pages Router 特性的页面

**优先级 4: 复杂页面**
- 迁移使用 `getStaticProps`、`getServerSideProps` 的页面
- 转换为 App Router 的数据获取模式

**迁移资源:**
- 完整指南: `references/app-router/guides/migrating/app-router-migration.mdx`
- 快速参考: `references/app-router/quick-reference.md`
- Pages Router 参考: `references/pages-router/quick-reference.md`

## 总结

### 默认选择: App Router

除非你有明确的理由使用 Pages Router，否则默认使用 App Router。

### 保持 Pages Router 的情况

- 现有应用运行良好
- 不需要现代特性
- 迁移成本太高

### 混合使用

- 新功能: App Router
- 旧功能: Pages Router
- 逐步迁移

## 相关文档

- App Router 快速参考: `references/app-router/quick-reference.md`
- Pages Router 快速参考: `references/pages-router/quick-reference.md`
- 迁移指南: `references/app-router/guides/migrating/`
- Router 对比: `references/shared/router-comparison.md`
