import React, {Component} from "react";
import ReactDOM from "react-dom";

import FlatfileImporter from "flatfile-csv-importer";

import "./styles.css";

import {flatfileConfig} from "./flatfile-config";
import * as basic from './basic.csv'

const urlParams = new URLSearchParams(window.location.search);
const LICENSE_KEY = urlParams.get('license'); // place license key here

// this is the configuration for the Flatile importer
FlatfileImporter.setVersion(2);

class App extends Component {
    constructor() {
        super();
        this.launch = this.launch.bind(this);
        this.importer = new FlatfileImporter(LICENSE_KEY, flatfileConfig);
        this.state = {
            results: "Your raw output will appear here."
        };
        this.importer.registerRecordHook((record, index) => {
            const out = {};
            if (record.zip && record.zip.length < 5) {
                out.zip = {
                    value: record.zip.padStart(5, "0"),
                    info: [
                        {
                            message: "Zipcode was padded with zeroes",
                            level: "warning"
                        }
                    ]
                };
            }
            return out;
        });
        this.importer.setCustomer({
            userId: "19235",
            name: "John Doe"
        });
    }
    launch() {
        this.importer.requestDataFromUser().then(results => {
                this.importer.displayLoader();
                setTimeout(() => {
                    this.importer.displaySuccess("Success!");
                    this.setState({
                        results: JSON.stringify(results.validData, null, 2)
                    });
                }, 1500);
            })
            .catch(function (error) {
                console.info(error || "window close");
            });
    }

    render() {
        return (
            <div className="App">
                {LICENSE_KEY ? null : (
                    <div className="licenseAsk">
                        <h1>👋 Hey there! 👋</h1>
                        <p>We couldn't find your license key. Place your license key 🔑 on line 12 or you can sign-up or sign-in with GitHub below!</p>
                        <a id="github" className="button"
                           href="http://api.flatfile.io/auth/github?redirect_url=http://localhost:3377">
                            <span className="button-icon-left">
                                <img alt="Github Octocat logo | Login with Github"
                                    src="https://cdn2.hubspot.net/hubfs/4588656/landing-page-images/React-landing-page/github.svg"
                                    height="24" width="24"/>
                            </span>
                            Login with Github
                            <span className="button-icon-right">&rarr;</span>
                        </a>
                    </div>
                )}
                <div id="main">
                    <input type="button" id="launch" value="Import users" onClick={this.launch}/>
                    <div className="download">
                        <a href={basic} target="_blank" rel="noopener noreferrer" download="basic.csv">
                            Download a sample csv file here
                        </a>
                    </div>
                    <textarea id="raw_output" readOnly value={this.state.results} />
                </div>
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
