import { Fragment, useEffect, useState } from 'react'
import { LucideIcon, Slash } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { useHeaderStore } from '@/store/useHeaderStore.ts'
import { HeaderContainer, IconStyle, IconsContainer } from '@/components/Header/index.style.ts'
import { LineChart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

type RightIconType = {
  icon: LucideIcon
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
        callback: () => navigator('/weight/overview')
      }
    ],
    'weight/overview': []
  }

  useEffect(() => {
    const curIcons = iconsMapper[curPathStack.join('/')]
    if (!curIcons) return
    console.log(curIcons)
    setRightIcons(curIcons)
  }, [curPathStack])

  return (
    <HeaderContainer>
      <Breadcrumb>
        <BreadcrumbList>
          {curPathStack.map((path, index, array) => (
            <Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/#/${curPathStack.slice(0, index + 1).join('/')}`}>{path}</BreadcrumbLink>
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
          return <StyledIcon key={index} onClick={icon.callback} /> // todo - 报错
          // return <icon.icon key={index}  onClick={icon.callback} />
        })}
      </IconsContainer>
    </HeaderContainer>
  )
}
