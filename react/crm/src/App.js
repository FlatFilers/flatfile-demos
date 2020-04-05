import React, { Component } from 'react'

import FlatfileImporter from 'flatfile-csv-importer'

import NavBar from './Components/NavBar'
import SideBar from './Components/SideBar'
import { ClientPanel } from './Components/ClientPanel'
import { flatfileConfig } from './flatfileConfig'
import results from 'flatfile-csv-importer/build/main/results'

FlatfileImporter.setVersion(2)

const licenseKey = '4171f0b4-5f5c-4b32-a008-356ebb813e4e'

class App extends Component {
    constructor() {
        super()
        this.launch = this.launch.bind(this)
        this.importer = new FlatfileImporter(licenseKey, flatfileConfig)
        this.state = {
            results: '',
        }
        this.importer.setCustomer({
            userId: '19235',
            name: 'John Doe',
        })
    }

    launch() {
        this.importer
            .requestDataFromUser()
            .then(results => {
                this.importer.displayLoader()
                setTimeout(() => {
                    this.importer.displaySuccess('Success!')
                    this.setState({
                        results: results.validData,
                    })
                }, 1500)
            })
            .catch(function(error) {
                console.info(error || 'window close')
            })
    }

    render() {
        return (
            <div>
                <SideBar />
                <NavBar clickFunction={this.launch} />
                <ClientPanel results={this.state.results} />
            </div>
        )
    }
}

export default App
