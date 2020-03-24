import React from 'react'
import styled from 'styled-components'
import flatfile from '../flatfile.svg'
import { FaFileDownload } from 'react-icons/fa'
import clients from '../clients.csv'

const Button = styled.button`
    background-color: ${props => props.buttonColor};
    color: ${props => props.textColor};
    font-family: 'Khula', sans-serif;
    font-weight: 600;
    font-size: ${props => props.fontSize};
    width: 250px;
    height: 70px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: calc(12.5vh * 0.15);
    margin-right: 3%;
    margin-left: 1.6%;
    border-radius: 5px;
    border: 2px solid ${props => props.borderColor};
    float: right;

    :hover {
        box-shadow: rgba(0, 0, 0, 0.11) 0px 0.2px 0.5px -2px,
            rgba(0, 0, 0, 0.157) 0px 0.4px 1.3px -2px,
            rgba(0, 0, 0, 0.196) 0px 0.9px 2.7px -2px,
            rgba(0, 0, 0, 0.24) 0px 1.8px 5.5px -2px,
            rgba(0, 0, 0, 0.35) 0px 5px 15px -2px;
        background-color: ${props => props.hoverColor};
        transform: translateY(-1px);
        transition-duration: 0.25s;
        border: ${props => props.borderHover};
    }

    svg {
        margin-top: 7px;
        height: 48px;
        width: 48px;
    }

    img {
        margin-top: 7px;
        height: 48px;
        width: 48px;
    }

    span {
        vertical-align: super;
    }
`

export const FlatfileButton = props => {
    return (
        <Button
            buttonColor={'#794CFF'}
            textColor={'#FFFFFF'}
            fontSize={'28px'}
            hoverColor={'#8c65ff'}
            borderColor={'#A181FF'}
            onClick={props.onClick}
        >
            <span>Import with </span>
            <img src={flatfile} alt="Flatfile logo" />
        </Button>
    )
}

export const CsvButton = props => {
    return (
        <a
            href={clients}
            target="_blank"
            rel="noopener noreferrer"
            download="clients.csv"
        >
            <Button
                buttonColor={'#FFFFFF'}
                textColor={'#000000'}
                fontSize={'22px'}
                borderHover={'#FFFFFF'}
                onClick={props.onClick}
            >
                <span>Download sample </span>
                <FaFileDownload />
            </Button>
        </a>
    )
}
