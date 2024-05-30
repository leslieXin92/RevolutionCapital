import styled from 'styled-components'
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable.tsx'

export const ResizablePanelGroupContainer = styled(ResizablePanelGroup)`
    flex: 1;
`

export const ContentResizablePanelContainer = styled(ResizablePanel)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 1em;
`

export const ContentHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
    width: 100%;
    background-color: #ccc;
`

export const ScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
`
