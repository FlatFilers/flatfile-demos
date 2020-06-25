import React from 'react'
import styled from 'styled-components'
import sideBarColors from '../colors'
import logo from '../logo.svg'
import flatfile from '../flatfile.svg'

const SideBarDiv = styled.div`
    float: left;
    z-index: 150;
    background-color: ${sideBarColors.background};
    color: ${sideBarColors.text};
    width: 15.2%;
    height: 100vh;

    div {
        text-align: center;
        padding: 10px;
        height: 45px;
    }

    div.home {
        background-color: ${sideBarColors.linkBg};
    }
    
    div:hover {
        background-color: ${sideBarColors.linkHover};
    }

    img {
        margin-bottom: 75px;
    }

    a {
        width: 100%;
        color: inherit;
        text-decoration: none;
        font-family: 'Khula', sans-serif;
        font-weight: 600;
        vertical-align: middle;
        font-size: 36px;

        img {
            width: 18%;
            max-width: 25px;
            height: auto;
            margin-bottom: unset;
        }
        span {
            margin-left: 6.4%;
        }
    }

    hr {
        color: ${sideBarColors.text};
        width: 75%;
        margin-top: 35px;
        margin-bottom: 75px;
    }
`

const SideBar = () => {
    return (
        <SideBarDiv>
            <img alt="logo" src={logo} />
            <div className="home">
                <a href="/">Home</a>
            </div>
            <hr />
            <div>
                <a
                    href="https://developers.flatfile.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={flatfile} alt="Flatfile logo" />
                    <span>Docs</span>
                </a>
            </div>
            <div>
                <a href="mailto:hello@flatfile.io">
                    <img src={flatfile} alt="Flatfile logo" />
                    <span>Help</span>
                </a>
            </div>
        </SideBarDiv>
    )
}

export default SideBar
