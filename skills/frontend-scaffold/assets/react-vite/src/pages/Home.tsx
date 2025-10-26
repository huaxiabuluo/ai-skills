import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="max-w-2xl mx-auto text-center space-y-8 p-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome to {{PROJECT_NAME}}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          A React + TypeScript + Vite + Tailwind CSS + shadcn/ui application
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/about">关于项目</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/shadcn">shadcn/ui 演示</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-16">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-3">🚀 现代化技术栈</h3>
            <p className="text-muted-foreground">
              使用最新的 React 19、TypeScript、Vite 和 Tailwind CSS 构建
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-3">🎨 shadcn/ui 组件</h3>
            <p className="text-muted-foreground">
              集成了 shadcn/ui 组件库，提供美观的现代界面组件
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-3">⚡ 快速开发</h3>
            <p className="text-muted-foreground">
              完整的开发工具链，包括热重载、类型检查和测试
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-3">📱 响应式设计</h3>
            <p className="text-muted-foreground">
              支持多种屏幕尺寸，适配移动端和桌面端
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home