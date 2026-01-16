# Pages Router 快速参考

本文档提供了 Next.js Pages Router 的最常用 API 和概念的快速参考。完整的 API 文档请参见 `api-reference/` 目录。

## 组件 API 快速参考

### Link

导航到应用内的其他页面，支持预取。

```tsx
import Link from 'next/link'

export default function Page() {
  return (
    <Link href="/dashboard">
      <a>Dashboard</a>
    </Link>
  )
}

// 动态路由
<Link href={`/blog/${post.id}`}>
  <a>Read post</Link>
</Link>

// 替换历史记录
<Link href="/dashboard" replace>
  <a>Dashboard</a>
</Link>

// 预取行为
<Link href="/dashboard" prefetch={false}>
  <a>Dashboard</a>
</Link>
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

// 使用 loader 函数
<Image
  src="/profile.png"
  alt="Profile"
  width={500}
  height={500}
  loader={({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }}
/>
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

      {/* 在 worker 中加载 */}
      <Script
        src="https://example.com/analytics.js"
        strategy="worker"
      />

      {/* 内联脚本 */}
      <Script id="show-banner" strategy="afterInteractive">
        {`document.getElementById('banner').classList.remove('hidden')`}
      </Script>

      {/* 在特定事件上加载 */}
      <Script
        src="https://example.com/analytics.js"
        onLoad={() => console.log('Script loaded')}
        onError={(e) => console.error('Script error', e)}
      />
    </>
  )
}
```

### Head

修改页面 HTML head 元素。

```tsx
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>My Page Title</title>
        <meta name="description" content="My page description" />
        <meta property="og:title" content="My Page Title" />
        <meta property="og:description" content="My page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Page content</div>
    </>
  )
}
```

### Font

使用 next/font 优化字体加载。

```tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export default function Page() {
  return (
    <div className={`${inter.variable} ${robotoMono.variable}`}>
      <h1 className="font-inter">Hello</h1>
    </div>
  )
}
```

## 文件约定快速参考

### pages/ 目录

定义应用路由的主目录。

```
pages/
├── index.tsx          // / (首页)
├── about.tsx          // /about
├── blog/
│   ├── index.tsx      // /blog
│   └── [id].tsx       // /blog/1, /blog/2
└── _app.tsx           // 全局 App 组件
```

### pages/_app.tsx

全局应用组件，用于保持页面间状态和注入全局样式。

```tsx
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

// 使用布局
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

// 保持状态
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [count, setCount] = useState(0)
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Component {...pageProps} />
    </div>
  )
}
```

### pages/_document.tsx

自定义 HTML 文档结构，仅在服务端渲染。

```tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

### pages/_error.tsx

自定义错误页面。

```tsx
import { NextPageContext } from 'next'
import Error from 'next/error'

export default function CustomError({ statusCode }: { statusCode: number }) {
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <p>Something went wrong</p>
    </div>
  )
}

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
```

### pages/404.tsx

自定义 404 页面。

```tsx
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```

### pages/500.tsx

自定义 500 错误页面。

```tsx
export default function Custom500() {
  return <h1>500 - Server Error</h1>
}
```

## 数据获取快速参考

### getStaticProps (SSG)

在构建时获取数据，生成静态页面。

```tsx
export default function Page({ post }: { post: Post }) {
  return <div>{post.title}</div>
}

// 在构建时运行
export async function getStaticProps() {
  const post = await getPost()

  return {
    props: {
      post,
    },
    // 重新验证（ISR）
    revalidate: 60, // 每 60 秒重新生成
  }
}

// 使用上下文参数
export async function getStaticProps(context: {
  params: { id: string }
}) {
  const post = await getPost(context.params.id)

  return {
    props: {
      post,
    },
  }
}

// 不返回则显示 404
export async function getStaticProps() {
  const post = await getPost()

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: { post },
  }
}

// 重定向
export async function getStaticProps() {
  return {
    redirect: {
      destination: '/new-path',
      permanent: false,
    },
  }
}
```

### getServerSideProps (SSR)

在每次请求时获取数据。

```tsx
export default function Page({ data }: { data: Data }) {
  return <div>{data.title}</div>
}

// 在每次请求时运行
export async function getServerSideProps() {
  const data = await fetchData()

  return {
    props: {
      data,
    },
  }
}

// 访问请求对象
export async function getServerSideProps(context: {
  req: NextApiRequest
  res: NextApiResponse
  query: { id: string }
}) {
  const { req, res, query } = context
  const data = await fetchData(query.id)

  return {
    props: { data },
  }
}
```

### getStaticPaths (动态路由)

为动态路由预渲染页面。

```tsx
export default function Page({ post }: { post: Post }) {
  return <div>{post.title}</div>
}

// 预渲染所有路径
export async function getStaticPaths() {
  const posts = await getAllPosts()

  return {
    paths: posts.map((post) => ({
      params: { id: post.id },
    })),
    fallback: false, // 其他路径返回 404
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  return {
    props: { post },
  }
}

// 使用 fallback: 'blocking'
export async function getStaticPaths() {
  return {
    paths: [], // 初始不预渲染任何页面
    fallback: 'blocking', // 按需渲染，等待 HTML 完成
  }
}

// 使用 fallback: true
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],
    fallback: true, // 先显示加载状态，然后渲染
  }
}
```

### getInitialProps

旧版数据获取方法（不推荐，使用 getStaticProps 或 getServerSideProps）。

```tsx
import { NextPageContext } from 'next'

function Page({ stars }: { stars: number }) {
  return <div>Next.js stars: {stars}</div>
}

Page.getInitialProps = async (ctx: NextPageContext) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page
```

## 路由快速参考

### useRouter

访问路由信息和导航。

```tsx
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return (
    <>
      <button onClick={() => router.push('/dashboard')}>
        Go Dashboard
      </button>
      <button onClick={() => router.replace('/dashboard')}>
        Replace
      </button>
      <button onClick={() => router.back()}>Back</button>
      <button onClick={() => router.reload()}>Reload</button>
    </>
  )
}

// 访问路由信息
const router = useRouter()
console.log(router.pathname)   // 当前路径
console.log(router.query)      // 查询参数
console.log(router.asPath)     // 实际路径（包含查询参数）
console.log(router.locale)     // 当前语言环境
console.log(router.isReady)    // 路由是否已准备就绪
```

### 动态路由

使用方括号创建动态路由。

```tsx
// pages/blog/[id].tsx
import { useRouter } from 'next/router'

export default function BlogPost() {
  const router = useRouter()
  const { id } = router.query

  return <div>Post ID: {id}</div>
}

// 使用 getStaticPaths 获取参数
export async function getStaticProps({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  return {
    props: { post },
  }
}
```

### 捕获所有路由

使用 `[...slug]` 捕获多段路径。

```tsx
// pages/docs/[...slug].tsx
export default function DocsPage() {
  const router = useRouter()
  const { slug } = router.query
  // /docs/a/b/c → slug = ['a', 'b', 'c']

  return <div>Viewing: {slug?.join('/')}</div>
}
```

## API 路由快速参考

### 基本 API 路由

在 `pages/api/` 目录下创建 API 端点。

```tsx
// pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ message: 'Hello' })
}
```

### 处理不同的 HTTP 方法

```tsx
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // 处理 GET 请求
    res.status(200).json({ message: 'GET request' })
  } else if (req.method === 'POST') {
    // 处理 POST 请求
    const data = req.body
    res.status(201).json({ message: 'POST request', data })
  } else {
    // 其他方法
    res.status(405).json({ message: 'Method not allowed' })
  }
}
```

### 动态 API 路由

```tsx
// pages/api/posts/[id].ts
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req

  if (method === 'GET') {
    const post = getPost(id as string)
    res.status(200).json(post)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
```

## 其他常用功能

### 自定义 App 组件

添加全局布局、错误处理和状态管理。

```tsx
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
```

### 自定义 Document 组件

修改 HTML 文档结构。

```tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

### 环境变量

访问环境变量。

```tsx
// 仅在服务端可用
export async function getServerSideProps() {
  const apiKey = process.env.API_KEY
  const data = await fetchData(apiKey)

  return {
    props: { data },
  }
}

// 在浏览器中访问（以 NEXT_PUBLIC_ 前缀）
export default function Page() {
  const publicUrl = process.env.NEXT_PUBLIC_URL
  return <div>{publicUrl}</div>
}
```

## 快速提示

- **静态生成**: 使用 `getStaticProps` 在构建时生成页面
- **服务端渲染**: 使用 `getServerSideProps` 在每次请求时生成页面
- **增量静态再生成**: 在 `getStaticProps` 中添加 `revalidate` 选项
- **动态路由**: 使用 `[param].tsx` 语法
- **捕获所有路由**: 使用 `[...slug].tsx` 语法
- **API 路由**: 在 `pages/api/` 目录下创建文件
- **环境变量**: 服务端使用 `process.env.VAR`，客户端使用 `NEXT_PUBLIC_VAR`

完整文档请参见 `api-reference/` 目录。
