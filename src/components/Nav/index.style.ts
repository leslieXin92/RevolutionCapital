import styled from 'styled-components'

export const ModeIconContainer = styled.div`
    cursor: pointer;
    will-change: color;
    transition: color 300ms;

    &:hover {
        color: darkcyan;
    }

    @keyframes logo-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`
