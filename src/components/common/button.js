import styled from 'styled-components'

export const Button = styled.button`
    background:rebeccapurple;
    border-radius:4px;
    padding:8px 16px;
    color:white;
    white-space:nowrap;
    cursor:pointer;
    ${props=>props.block?'width:100%;':''}


    &:hover {
        background:indigo;
    }
`