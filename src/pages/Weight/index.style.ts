import styled from 'styled-components'

export const WeightContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

export const DayContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .date {
        font-size: 1em;
    }

    .weight {
        color: #ccc;
        font-size: 0.8em;
    }
`
