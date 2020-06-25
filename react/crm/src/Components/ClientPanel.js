import React, { useState } from 'react'
import styled from 'styled-components'
import { ListCard } from './ListCards'
import sideBarColors from '../colors'

const PanelDiv = styled.div`
    margin-left: 15.2%;
    height: 87vh;

    h1 {
        padding-left: 60px;
        padding-right: 60px;
        text-align: center;
        padding-top: 60px;
    }
    ul {
        height: 87vh;
        width: 38%;
        float: left;
        list-style: none;
        overflow: scroll;
    }
`

const ContactPanel = styled.div`
    float: right;
    position: relative;
    top: 0;
    margin-top: 19px;
    margin-right: 28px;
    border-radius: 5px;
    width: 53%;
    border: 3px solid ${sideBarColors.background};
    height: 83vh;

    h1 {
        margin-top: 10px;
        padding-top: 0px;
    }

    div {
        width: 100%;
    }

    div > span {
        padding-left: 20px;
        width: 48%;
    }

    div > span:first-child {
        float: left;
    }

    div > span:last-child {
        float: right;
    }

    div > span > p,
    div > div > p {
        font-family: Khula;
        font-size: 14px;
    }

    div > span > h3 {
        font-family: Khula;
        font-size: 18px;
    }
    
    div > div {
        width: 100%;
        padding-left: 20px;
    }

    div > span > textarea {
        height: 50px;
    }

    div > div > textarea {
        height: 200px;
        width: 90%;
    }
`

export const ClientPanel = props => {
    const initialCompany = {
        company: '',
        contact: '',
        status: '',
        industry: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        size: '',
        phone: '',
        products: '',
    }
    const results = props.results
    const [companyInfo, setCompanyInfo] = useState(initialCompany)
    return (
        <div>
            {results === '' ? (
                <PanelDiv>
                    <h1>
                        {
                            "It looks like you havent uploaded any clients yet! Use Flatfile's Import button to get started."
                        }
                    </h1>
                </PanelDiv>
            ) : (
                <PanelDiv>
                    <ul>
                        {results.map(item => (
                            <ListCard
                                fullItem={item}
                                key={results.indexOf(item)}
                                company={item.company}
                                status={item.status}
                                setCompany={setCompanyInfo}
                            />
                        ))}
                    </ul>
                    <ContactPanel>
                        <h1>{companyInfo.company}</h1>
                        <div>
                            <span>
                                <p>Contact:</p>
                                <h3>{companyInfo.contact}</h3>
                                <p>Email:</p>
                                <h3>{companyInfo.email}</h3>
                                <p>Address:</p>
                                <h3>{companyInfo.address}</h3>
                                <p>City, State Zip:</p>
                                <h3>
                                    {companyInfo.city +
                                        ' ' +
                                        companyInfo.state +
                                        ' ' +
                                        companyInfo.zip}
                                </h3>
                                <p>Phone:</p>
                                <h3>{companyInfo.phone}</h3>
                            </span>
                            <span>
                                <p>Status:</p>
                                <h3>{companyInfo.status}</h3>
                                <p>Industry:</p>
                                <h3>{companyInfo.industry}</h3>
                                <p>Employees:</p>
                                <h3>{companyInfo.size}</h3>
                                <p>Product(s):</p>
                                <textarea>{companyInfo.products}</textarea>
                            </span>
                            <div>
                                <p>Notes:</p>
                                <textarea>{}</textarea>
                            </div>
                        </div>
                    </ContactPanel>
                </PanelDiv>
            )}
        </div>
    )
}
