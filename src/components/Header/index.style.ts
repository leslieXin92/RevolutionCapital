import styled from 'styled-components'

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 2em;
    padding: 0 1em 1em 2em;
    border-bottom: 1px solid #99999922;
`

export const IconsContainer = styled.div`
    display: flex;
`

export const IconStyle = `
    width: 1.5em;
    height: 1.5em;
    margin-left: 1em;
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
