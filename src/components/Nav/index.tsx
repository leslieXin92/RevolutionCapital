import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleGauge, Inbox, LucideIcon, Utensils, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useHeaderStore } from '@/store/useHeaderStore.ts'
import { cn } from '@/lib/utils'

type NavItem = {
  title: string
  icon: LucideIcon
  variant: 'default' | 'ghost'
  path: string
}

interface NavProps {
  isCollapsed: boolean
}

export function Nav({ isCollapsed }: NavProps) {
  const [links, setLinks] = useState<NavItem[]>([
    {
      title: 'Home',
      path: '/home',
      icon: Inbox,
      variant: 'default'
    },
    {
      title: 'Weight',
      path: '/weight',
      icon: CircleGauge,
      variant: 'ghost'
    },
    {
      title: 'Diet',
      path: '/diet',
      icon: Utensils,
      variant: 'ghost'
    }
  ])

  const navigator = useNavigate()
  const { theme, setTheme } = useTheme()

  const curPathStack = useHeaderStore(state => state.curPathStack)

  useEffect(() => {
    setLinks(prev => {
      return prev!.map((item) => ({
        ...item,
        variant: curPathStack.includes(item.path.slice(1)) ? 'default' : 'ghost'
      }))
    })
  }, [curPathStack])

  const NavBottom = useMemo(() => {
    if (isCollapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div
              className={cn(
                buttonVariants({ variant: 'link', size: 'icon' }),
                'h-9 w-9 cursor-pointer'
              )}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'light' && <Sun className="h-5 w-5" />}
              {theme === 'dark' && <Moon className="h-5 w-5" />}
              <span className="sr-only">{theme}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            {theme}
          </TooltipContent>
        </Tooltip>
      )
    }

    return (
      <div
        className={cn(
          buttonVariants({ variant: 'link', size: 'sm' }),
          'justify-start cursor-pointer'
        )}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'light' && <Sun className="h-5 w-5 mr-2" />}
        {theme === 'dark' && <Moon className="h-5 w-5 mr-2" />}
        {theme}
      </div>
    )
  }, [isCollapsed, theme])

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 h-full"
    >
      <nav className="flex flex-col justify-between pl-2 pr-2 h-full">
        <nav className="flex flex-col justify-between group gap-4 py-2 data-[collapsed=true]:py-2">
          {links!.map((link, index) => {
            if (isCollapsed) {
              return (
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        buttonVariants({ variant: link.variant, size: 'icon' }),
                        'h-9 w-9 cursor-pointer',
                        link.variant === 'default' &&
                        'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                      )}
                      onClick={() => navigator(link.path)}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="sr-only">{link.title}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-4">
                    {link.title}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <div
                key={index}
                className={cn(
                  buttonVariants({ variant: link.variant, size: 'sm' }),
                  link.variant === 'default' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                  'justify-start cursor-pointer'
                )}
                onClick={() => navigator(link.path)}
              >
                <link.icon className="h-5 w-5 mr-2" />
                {link.title}
              </div>
            )
          })}
        </nav>
        <nav className="flex flex-col justify-between group gap-4 py-2 data-[collapsed=true]:py-2">
          {NavBottom}
        </nav>
      </nav>
    </div>
  )
}
