# App Router 快速参考

本文档提供了 Next.js App Router 的最常用 API 和概念的快速参考。完整的 API 文档请参见 `api-reference/` 目录。

## 组件 API 快速参考

### Link

导航到应用内的其他页面，支持预取。

```tsx
import Link from 'next/link'

export default function Page() {
  return (
    <Link href="/dashboard">Dashboard</Link>
  )
}

// 动态路由
<Link href={`/blog/${post.id}`}>Read post</Link>

// 替换历史记录
<Link href="/dashboard" replace>Dashboard</Link>

// 滚动行为
<Link href="/dashboard" scroll={false}>Dashboard</Link>

// 预取行为
<Link href="/dashboard" prefetch={false}>Dashboard</Link>
```

### Image

自动优化图片，支持懒加载、尺寸优化和响应式图片。

```tsx
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/profile.png"
      alt="Profile"
      width={500}
      height={500}
      priority // 首屏图片优先加载
    />
  )
}

// 远程图片
<Image
  src="https://example.com/photo.jpg"
  alt="Photo"
  width={500}
  height={300}
/>

// 使用 fill 填充父容器
<div style={{ position: 'relative', width: '100%', height: '300px' }}>
  <Image
    src="/photo.jpg"
    alt="Photo"
    fill
    style={{ objectFit: 'cover' }}
  />
</div>
```

### Script

优化第三方脚本加载，支持策略控制。

```tsx
import Script from 'next/script'

export default function Page() {
  return (
    <>
      {/* 在页面加载后立即加载 */}
      <Script src="https://example.com/analytics.js" />

      {/* 在页面交互后加载 */}
      <Script
        src="https://example.com/analytics.js"
        strategy="afterInteractive"
      />

      {/* 在空闲时加载 */}
      <Script
        src="https://example.com/widget.js"
        strategy="lazyOnload"
      />

      {/* 内联脚本 */}
      <Script id="show-banner">
        {`document.getElementById('banner').classList.remove('hidden')`}
      </Script>
    </>
  )
}
```

### Font

自动优化和托管字体。

```tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className}>
      <body className={robotoMono.variable}>{children}</body>
    </html>
  )
}
```

### Form

使用 Server Actions 的表单组件。

```tsx
import { Form } from 'react-dom'

export default function Page() {
  async function updateName(formData: FormData) {
    'use server'
    const name = formData.get('name')
    // 处理表单数据
  }

  return (
    <form action={updateName}>
      <input type="text" name="name" />
      <button type="submit">Update</button>
    </form>
  )
}
```

## 指令快速参考

### 'use client'

标记组件为客户端组件，可以使用 hooks 和事件处理器。

```tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### 'use server'

标记函数为 Server Action，可以在客户端调用。

```tsx
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  // 在服务端执行
}
```

### use cache

扩展 fetch 的缓存行为（App Router 默认）。

```tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }, // 缓存 1 小时
  }).then(res => res.json())

  return <div>{data.title}</div>
}
```

## 文件约定快速参考

### page.tsx

页面文件，定义路由的 UI。

```tsx
export default function Page() {
  return <div>Hello World</div>
}
```

### layout.tsx

布局文件，在多个页面间共享 UI。

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <nav>My App</nav>
        {children}
      </body>
    </html>
  )
}
```

### loading.tsx

加载状态，在页面加载时显示。

```tsx
export default function Loading() {
  return <div>Loading...</div>
}
```

### error.tsx

错误边界，捕获运行时错误。

```tsx
'use client' // 必须是客户端组件

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### not-found.tsx

404 页面，当路由未找到时显示。

```tsx
export default function NotFound() {
  return <div>Page not found</div>
}
```

### route.ts

API 路由处理器，定义 HTTP 端点。

```tsx
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello' })
}

export async function POST(request: Request) {
  const data = await request.json()
  return NextResponse.json({ success: true })
}
```

### template.tsx

模板文件，在导航时重新渲染（不同于 layout）。

```tsx
export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="template">{children}</div>
}
```

## 常用 Hooks 快速参考

### useRouter

访问路由信息和导航。

```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <>
      <button onClick={() => router.push('/dashboard')}>Go Dashboard</button>
      <button onClick={() => router.replace('/dashboard')}>Replace</button>
      <button onClick={() => router.back()}>Back</button>
      <button onClick={() => router.refresh()}>Refresh</button>
    </>
  )
}
```

### usePathname

获取当前路径名。

```tsx
'use client'

import { usePathname } from 'next/navigation'

export default function Page() {
  const pathname = usePathname()
  return <div>Current path: {pathname}</div>
}
```

### useSearchParams

获取 URL 搜索参数。

```tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  return <div>Search: {query}</div>
}
```

### useParams

获取动态路由参数。

```tsx
'use client'

import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams()
  return <div>Post ID: {params.id}</div>
}
```

### useSelectedLayoutSegment

获取当前激活的路由段。

```tsx
'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export default function Layout() {
  const segment = useSelectedLayoutSegment()
  return <div>Active segment: {segment}</div>
}
```

## 数据获取快速参考

### fetch with caching

使用扩展的 fetch API 进行数据获取。

```tsx
// 缓存数据，重新验证
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }, // 1 小时
  })
  return res.json()
}

// 缓存数据，按标签重新验证
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { tags: ['posts'] },
  })
  return res.json()
}

// 不缓存
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store',
  })
  return res.json()
}
```

### cacheLife

设置缓存生命周期（使用 unstable_cacheLife）。

```tsx
import { unstable_cacheLife } from 'next/cache'

export default async function Page() {
  unstable_cacheLife('days')
  const data = await fetch('https://api.example.com/data')
  return <div>{data.title}</div>
}
```

### cacheTag

设置缓存标签用于重新验证。

```tsx
import { unstable_cacheTag } from 'next/cache'

export default async function Page() {
  unstable_cacheTag('posts', 'user-123')
  const data = await fetch('https://api.example.com/posts')
  return <div>{data.title}</div>
}
```

### revalidatePath

重新验证特定路径的缓存。

```tsx
import { revalidatePath } from 'next/cache'

revalidatePath('/blog')
revalidatePath('/blog/post-1')
```

### revalidateTag

重新验证带有特定标签的缓存。

```tsx
import { revalidateTag } from 'next/cache'

revalidateTag('posts')
revalidateTag('user-123')
```

## 其他常用函数

### redirect

重定向到另一个 URL。

```tsx
import { redirect } from 'next/navigation'

export default function Page() {
  redirect('/dashboard')
}

// 在 Server Action 中
'use server'

import { redirect } from 'next/navigation'

export async function createPost() {
  // 创建帖子
  redirect('/blog/new-post')
}
```

### notFound

触发 not-found 页面。

```tsx
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  if (!post) {
    notFound()
  }
  return <div>{post.title}</div>
}
```

### cookies

读写 HTTP cookies。

```tsx
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  return <div>Token: {token?.value}</div>
}

// 在 Server Action 中
'use server'

import { cookies } from 'next/headers'

export async function setTheme(theme: string) {
  cookies().set('theme', theme)
}
```

### headers

读取 HTTP 请求头。

```tsx
import { headers } from 'next/headers'

export default async function Page() {
  const headersList = headers()
  const userAgent = headersList.get('user-agent')

  return <div>User Agent: {userAgent}</div>
}
```

## 元数据快速参考

### generateMetadata

动态生成页面元数据。

```tsx
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const post = await getPost(params.id)
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function Page() {
  return <div>Post content</div>
}
```

### Metadata 对象

静态元数据对象。

```tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: 'My app description',
  openGraph: {
    title: 'My App',
    description: 'My app description',
    images: ['/og-image.png'],
  },
}

export default function Page() {
  return <div>Home</div>
}
```

## 快速提示

- 所有组件默认是**服务端组件**
- 需要 hooks 或事件处理器时添加 `'use client'`
- 使用 `fetch` 进行数据获取，默认缓存
- 使用 `revalidatePath` 和 `revalidateTag` 进行缓存更新
- 使用 `redirect` 进行服务端重定向
- 使用 `notFound` 触发 404 页面

完整文档请参见 `api-reference/` 目录。
