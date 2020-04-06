import React, { useState } from 'react'
import styled from 'styled-components'
import { FaCircle } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import sideBarColors from '../colors'

const Item = styled.li`
    width: 90%;

    div {
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        margin-top: 5px;
        margin-bottom: 5px;
        height: 62px;
    }

    span:first-child {
        padding-left: 7px;
        text-align: center;
        font-family: Khula;
        font-size: 24px;
        line-height: 62px;
        white-space: nowrap;
        font-weight: 600;
    }
    
    span:last-child {
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        width: 32%;
        font-family: Khula;
        font-size: 18px;
        font-weight: 600;
        padding: 0px 11px;
        position: relative;
        float: right;
        margin: 13px 7px;
    }
    
    
`

const CircleIcon = props => {
    return (
        <IconContext.Provider
            value={{
                color: props.color,
                size: '15px',
                style: {
                    verticalAlign: 'middle',
                    border: 'none',
                    position: 'absolute',
                    top: '7px',
                    right: '11px',
                },
            }}
        >
            <FaCircle />
        </IconContext.Provider>
    )
}

const DropdownList = props => {
    const [isOpen, setIsOpen] = useState(false)
    const options = [
        { value: 'unknown', color: '#b3b3b3' },
        { value: 'contract', color: '#42b9f5' },
        { value: 'closed', color: '#42f554' },
        { value: 'discovery', color: '#f5c842' },
        { value: 'stale', color: '#f54242' },
        { value: 're-engage', color: '#f59042' },
    ]
    const initialOption = props.status
        ? { value: props.status, color: 'green' }
        : options[0]
    const [selected, setSelected] = useState(initialOption)
    const listFunction = () => {
        console.log(isOpen)
        // setIsOpen(!isOpen)
    }
    return (
        <>
            <span onClick={listFunction}>
                {selected.value}
                <CircleIcon color={selected.color} />
            </span>
            {!isOpen ? null : (
                <ul>
                    <li onClick={listFunction}>Option</li>
                </ul>
            )}
        </>
    )

    // return (
    //     <span>
    //         {selected}
    //         <CircleIcon color={props.color} />
    //     </span>
    // )
}

export const ListCard = props => {
    return (
        <Item key={props.key} onClick={props.onClick}>
            <div>
                <span>{props.company}</span>
                <DropdownList status={props.status} />
            </div>
        </Item>
    )
}
