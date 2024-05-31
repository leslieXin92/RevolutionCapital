import { Fragment, useEffect, useState } from 'react'
import { LucideIcon, Slash, LineChart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { buttonVariants } from '@/components/ui/button.tsx'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx'
import { HeaderContainer, IconStyle, IconsContainer } from '@/components/Header/index.style.ts'
import { cn } from '@/lib/utils.ts'
import { useHeaderStore } from '@/store/useHeaderStore.ts'

type RightIconType = {
  icon: LucideIcon
  tooltip?: string
  callback: () => void
}

export function Header() {
  const [rightIcons, setRightIcons] = useState<RightIconType[]>([])

  const navigator = useNavigate()
  const curPathStack = useHeaderStore(state => state.curPathStack)

  const iconsMapper: Record<string, RightIconType[]> = {
    'home': [],
    'weight': [
      {
        icon: LineChart,
        tooltip: 'chart',
        callback: () => navigator('/weight/overview')
      }
    ],
    'weight/overview': []
  }

  useEffect(() => {
    const curIcons = iconsMapper[curPathStack.join('/')]
    if (!curIcons) return
    setRightIcons(curIcons)
  }, [curPathStack])

  return (
    <HeaderContainer>
      <Breadcrumb>
        <BreadcrumbList>
          {curPathStack.map((path, index, array) => (
            <Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/#/${curPathStack.slice(0, index + 1).join('/')}`}>
                  {path}
                </BreadcrumbLink>
              </BreadcrumbItem>

              {index !== array.length - 1 && <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <IconsContainer>
        {rightIcons.map((icon, index) => {
          const StyledIcon = styled(icon.icon)`${IconStyle}`
          return (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    buttonVariants({ variant: 'link', size: 'icon' }),
                    'h-9 w-9 cursor-pointer'
                  )}
                  onClick={icon.callback}
                >
                  <StyledIcon key={index} onClick={icon.callback} />
                  <span className="sr-only">{icon.tooltip}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="flex items-center gap-4">
                {icon.tooltip}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </IconsContainer>
    </HeaderContainer>
  )
}
