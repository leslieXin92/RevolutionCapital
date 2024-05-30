import styled from 'styled-components'
import { DialogHeader } from '@/components/ui/dialog.tsx'

export const DialogHeaderContainer = styled(DialogHeader)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1em;

    p {
        margin: 0 0 0 1em !important;
    }
`
