import React, {Component} from "react";
import ReactDOM from "react-dom";

import FlatfileImporter from "flatfile-csv-importer";

import "./styles.css";

import {flatfileConfig} from "./flatfile-config";
import * as dataHooks from "./data-hooks.csv"

const urlParams = new URLSearchParams(window.location.search);
const LICENSE_KEY = urlParams.get('license');
// const LICENSE_KEY = "4171f0b4-5f5c-4b32-a008-356ebb813e4e";

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
            if (record.firstName && !record.lastName) {
                if (record.firstName.includes(" ")) {
                    const components = record.firstName.split(" ");
                    out.firstName = { value: components.shift() };
                    out.lastName = { value: components.join(" ") };
                }
            }
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
            if (!record.zip && (!record.city || !record.state)) {
                out.zip = {
                    info: [
                        {
                            message: "Either city/state or zip must be provided.",
                            level: "error"
                        }
                    ]
                }
            }
            if (!record.zip && (!record.city || !record.state)) {
                out.city = {
                    info: [
                        {
                            message: "Either city/state or zip must be provided.",
                            level: "error"
                        }
                    ]
                }
            }
            if (!record.zip && (!record.city || !record.state)) {
                out.state = {
                    info: [
                        {
                            message: "Either city/state or zip must be provided.",
                            level: "error"
                        }
                    ]
                }
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
                        <h1>No license key found.</h1>
                        <p>Either put a license key on line 12 or login with GitHub below.</p>
                        <a id="github" className="button"
                           href="http://api.flatfile.io/auth/github?redirect_url=http://localhost:3377">
                            Login with Github
                            <span className="button-icon-right">&rarr;</span>
                        </a>
                    </div>
                )}
                <div id="main">
                    <input type="button" id="launch" value="Import users" onClick={this.launch}/>
                    <div className="download">
                        <a href={dataHooks} target="_blank" rel="noopener noreferrer" download="data-hooks.csv">
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
