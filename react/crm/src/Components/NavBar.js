import React from 'react'
import styled from 'styled-components'
import {CsvButton, FlatfileButton} from './Buttons'

const NavBarDiv = styled.div`
    background-color: #c4c4c4;
    width: 100%;
    height: 12.5vh;
    z-index: 0;
    
    p {
        display: inline-block;
        font-size: 36px;
        margin-left: 3%;
    }
`

const NavBar = props => {
    return (
        <NavBarDiv>
            <p>Client Dashboard</p>
            <FlatfileButton onClick={props.clickFunction} />
            <CsvButton />
        </NavBarDiv>
    )
}

export default NavBar
