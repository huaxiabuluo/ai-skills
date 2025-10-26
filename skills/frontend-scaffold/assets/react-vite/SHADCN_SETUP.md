# shadcn/ui 集成说明

这个项目已经完整集成了 [shadcn/ui](https://ui.shadcn.com/) 组件库，提供了现代化的 React 组件系统。

## 🎯 包含的功能

### ✅ 已完成的配置

1. **依赖包安装**
   - `@radix-ui/react-slot`: 无障碍的基础组件
   - `class-variance-authority`: 样式变体管理
   - `clsx`: 条件类名工具
   - `lucide-react`: 现代化图标库
   - `tailwind-merge`: Tailwind 类名合并
   - `tailwindcss-animate`: 动画支持

2. **配置文件**
   - `components.json`: shadcn/ui 配置文件
   - `tailwind.config.js`: 更新支持 shadcn/ui 主题
   - `src/index.css`: 添加 CSS 变量支持亮色/暗色主题

3. **工具文件**
   - `src/lib/utils.ts`: cn() 函数用于类名合并

4. **示例组件**
   - `Button`: 支持多种变体和尺寸
   - `Card`: 完整的卡片组件系列

5. **演示页面**
   - `/shadcn`: 展示所有组件效果的演示页面

## 🚀 使用方法

### 添加新组件

使用 CLI 添加新的 shadcn/ui 组件：

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

### 自定义主题

在 `src/index.css` 中修改 CSS 变量来自定义主题：

```css
:root {
  --primary: 220 90% 56%;  /* 修改主色调 */
  --radius: 0.75rem;       /* 修改圆角大小 */
}
```

### 使用组件

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>标题</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>点击我</Button>
      </CardContent>
    </Card>
  )
}
```

## 🎨 主题支持

### 亮色主题（默认）
- 使用 `:root` 中的 CSS 变量
- 适合日间使用

### 暗色主题
- 使用 `.dark` 类中的 CSS 变量
- 可以通过添加 `dark` 类到 `html` 元素来切换

### 切换主题示例

```tsx
import { useEffect } from 'react'

export function ThemeToggle() {
  useEffect(() => {
    // 切换到暗色主题
    document.documentElement.classList.add('dark')
  }, [])

  return <button onClick={() => {
    document.documentElement.classList.toggle('dark')
  }}>
    切换主题
  </button>
}
```

## 📁 项目结构

```
src/
├── components/
│   └── ui/              # shadcn/ui 组件
│       ├── button.tsx
│       └── card.tsx
├── lib/
│   └── utils.ts         # 工具函数
├── pages/
│   └── ShadcnDemo.tsx   # 演示页面
└── index.css            # 全局样式和主题变量
```

## 🔧 配置文件

### components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "src/components",
    "utils": "src/lib/utils"
  }
}
```

## 📚 更多组件

shadcn/ui 提供了丰富的组件库，包括：

- **表单组件**: Input, Select, Checkbox, Radio, Switch
- **导航组件**: Navigation Menu, Breadcrumb, Tabs
- **反馈组件**: Dialog, Alert, Toast, Progress
- **布局组件**: Sheet, Collapsible, Accordion
- **数据展示**: Table, Badge, Avatar, Skeleton
- **图表组件**: Chart (基于 Recharts)

查看 [shadcn/ui 文档](https://ui.shadcn.com/docs/components) 获取完整组件列表。

## 🎯 下一步

1. 根据项目需求添加更多组件
2. 自定义主题色彩
3. 实现主题切换功能
4. 集成表单验证
5. 添加动画和过渡效果

享受使用 shadcn/ui 构建精美界面的过程！ 🎉