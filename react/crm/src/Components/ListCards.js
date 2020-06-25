import React, { useState } from 'react'
import styled from 'styled-components'
import { FaCircle } from 'react-icons/fa'
import { IconContext } from 'react-icons'

const Item = styled.button`
    width: 90%;
    border-radius: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 62px;

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
    const setColorByOption = status => {
        let color;
        switch (status) {
            case "unknown":
                color = "#b3b3b3";
                break;
            case "contract":
                color = "#42b9f5";
                break;
            case "closed":
                color = "#42f554";
                break;
            case "discovery":
                color = "#f5c842";
                break;
            case "stale":
                color = "#f54242";
                break;
            case "re-engage":
                color = "#f59042";
                break;
            default:
                color = "green";
                break;
        }
        return color;
    };
    const initialOption = props.status
        ? { value: props.status, color: setColorByOption(props.status) }
        : { value: "unknown", color: "black" };
    const [selected, setSelected] = useState(initialOption)
    return (
        <>
            <span>
                {selected.value}
                <CircleIcon color={selected.color} />
            </span>
        </>
    )
}

export const ListCard = props => {
    const [selectedStyles, setSelectedStyles] = useState(false)
    const focusElement = () => {
        setSelectedStyles(true)
    }
    const blurElement = () => {
        setSelectedStyles(false)
    }
    const newCompany = () => {
        props.setCompany(props.fullItem)
    }
    return (
        <li>
            <Item
                className={selectedStyles ? 'focusedCard' : 'normalCard'}
                key={props.key}
                onFocus={focusElement}
                onBlur={blurElement}
                onClick={newCompany}
            >
                <div>
                    <span>{props.company}</span>
                    <DropdownList status={props.status} />
                </div>
            </Item>
        </li>
    )
}
