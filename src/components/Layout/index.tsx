import { ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable.tsx'
import { Nav } from '@/components/Nav'
import { Header } from '@/components/Header/index.tsx'
import { ContentResizablePanelContainer, ResizablePanelGroupContainer, ScreenContainer } from './index.style.ts'
import { cn } from '@/lib/utils.ts'
import { useHeaderStore } from '@/store/useHeaderStore.ts'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const location = useLocation()
  const setCurPathStack = useHeaderStore(state => state.setCurPathStack)

  useEffect(() => {
    const curPath = location.pathname.slice(1).split('/')
    setCurPathStack(curPath)
  }, [location])

  const onResizablePanelGroupLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
  }

  const onResizablePanelResize = (size: number) => {
    const collapsed = size < 15
    setIsCollapsed(collapsed)
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(collapsed)}`
  }

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroupContainer
        direction="horizontal"
        onLayout={onResizablePanelGroupLayout}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={20}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onResize={onResizablePanelResize}
          className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
        >
          <Nav isCollapsed={isCollapsed} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ContentResizablePanelContainer minSize={30}>
          {location.pathname !== '/home' && <Header />}
          <ScreenContainer>{children}</ScreenContainer>
        </ContentResizablePanelContainer>
      </ResizablePanelGroupContainer>
    </TooltipProvider>
  )
}

export default Layout
