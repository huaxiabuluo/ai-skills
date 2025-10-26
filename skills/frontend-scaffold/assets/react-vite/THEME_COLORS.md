# shadcn/ui 主题色彩配置

## 🎨 当前配置

### 默认主题（亮色）
- **背景**: 白色 `#ffffff`
- **前景**: 深灰黑色 `#0a0a0a`
- **主色调**: 深灰色 `#1a1a1a`（类似现代深色按钮）
- **次要色**: 浅灰色 `#f5f5f5`
- **边框**: 浅灰色 `#e5e5e5`

### 暗色主题
- **背景**: 深蓝黑色 `#020817`
- **前景**: 白色 `#fafafa`
- **主色调**: 白色 `#fafafa`
- **次要色**: 深灰色 `#1e293b`
- **边框**: 深灰色 `#1e293b`

## 🎯 主色调变化方案

如果你想要不同的主色调，可以修改 `--primary` 变量：

### 方案1: 蓝色主题（推荐）
```css
:root {
  --primary: 221.2 83.2% 53.3%; /* 蓝色 #3b82f6 */
  --primary-foreground: 210 40% 98%;
}
```

### 方案2: 紫色主题
```css
:root {
  --primary: 262.1 83.3% 57.8%; /* 紫色 #8b5cf6 */
  --primary-foreground: 210 40% 98%;
}
```

### 方案3: 绿色主题
```css
:root {
  --primary: 142.1 76.2% 36.3%; /* 绿色 #16a34a */
  --primary-foreground: 355.7 100% 97.3%;
}
```

### 方案4: 橙色主题
```css
:root {
  --primary: 24.6 95% 53.1%; /* 橙色 #f97316 */
  --primary-foreground: 60 9.1% 97.8%;
}
```

## 🔧 如何切换主题

### 1. 修改默认颜色
直接修改 `src/index.css` 中 `:root` 部分的 CSS 变量

### 2. 添加主题切换功能
```tsx
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <button onClick={() => setIsDark(!isDark)}>
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
```

### 3. 检测系统主题偏好
```css
@media (prefers-color-scheme: dark) {
  :root {
    /* 暗色主题变量 */
  }
}
```

## 🎨 HSL 颜色值说明

CSS 变量使用 HSL 格式：`hsl(H S% L%)`

- **H**: 色相 (0-360°)
- **S**: 饱和度 (0-100%)
- **L**: 亮度 (0-100%)

例如：
- `--primary: 240 5.9% 10%;`
  - 色相: 240° (蓝色调)
  - 饱和度: 5.9% (很低饱和度，接近灰色)
  - 亮度: 10% (很暗，接近黑色)

## 💡 推荐配色工具

1. **Tailwind Colors**: https://tailwindcss.com/docs/customizing-colors
2. **Coolors.co**: https://coolors.co/
3. **Adobe Color**: https://color.adobe.com/
4. **Google Material Design**: https://material.io/design/color/

选择适合你品牌和应用风格的配色方案！