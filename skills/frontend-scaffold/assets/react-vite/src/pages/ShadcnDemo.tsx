import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ShadcnDemo() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">shadcn/ui 组件演示</h1>
        <p className="text-lg text-muted-foreground">
          这个页面展示了 shadcn/ui 组件库的集成效果
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Button 组件</CardTitle>
            <CardDescription>
              展示不同样式的按钮组件
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>默认按钮</Button>
              <Button variant="secondary">次要按钮</Button>
              <Button variant="outline">边框按钮</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="destructive">危险按钮</Button>
              <Button variant="ghost">幽灵按钮</Button>
              <Button variant="link">链接按钮</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">小按钮</Button>
              <Button size="default">默认按钮</Button>
              <Button size="lg">大按钮</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card 组件</CardTitle>
            <CardDescription>
              卡片组件的展示效果
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              这是一个完整的卡片组件示例，包含标题、描述和内容区域。
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">查看详情</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>主题支持</CardTitle>
            <CardDescription>
              支持亮色和暗色主题
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              所有组件都支持亮色/暗色主题切换，使用 CSS 变量实现。
            </p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline" size="sm">
              亮色主题
            </Button>
            <Button variant="outline" size="sm">
              暗色主题
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>特性介绍</CardTitle>
          <CardDescription>
            shadcn/ui 的主要特性
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold">🎨 现代化设计</h4>
              <p className="text-sm text-muted-foreground">
                基于 Tailwind CSS 构建，提供简洁现代的界面设计
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">🔧 高度可定制</h4>
              <p className="text-sm text-muted-foreground">
                使用 CSS 变量，可以轻松自定义主题和样式
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">♿ 无障碍支持</h4>
              <p className="text-sm text-muted-foreground">
                基于 Radix UI 构建，提供完整的无障碍支持
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">📱 响应式设计</h4>
              <p className="text-sm text-muted-foreground">
                所有组件都支持响应式设计，适配不同屏幕尺寸
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}