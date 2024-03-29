import styled from 'styled-components'

export const Input = styled.input`
    display: block;
    width:100%;
    padding:8px;
    font-size:14px;
    margin-bottom:8px;
    border-radius:4px;
    border:1px solid #ddd;
    box-shadow:none;
   
    &:active, &:focus{
        border:1px solid #276678;
        outline:none;
    }
`