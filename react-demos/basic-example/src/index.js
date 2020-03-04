import React, {Component} from "react";
import ReactDOM from "react-dom";

import FlatfileImporter from "flatfile-csv-importer";

import "./styles.css";

import {flatfileLicense} from './license-key.js'
import {DemoApp} from "./components/DemoApp";
import {flatfileConfigs, RecordHooks} from "./configs";

const LICENSE_KEY = flatfileLicense

// this is the configuration for the Flatile importer
FlatfileImporter.setVersion(2);

class App extends Component {
    constructor() {
        super();
        this.launch = this.launch.bind(this);
        // this is how you initialize the flatfile importer within your React application
        this.importer = new FlatfileImporter(LICENSE_KEY, flatfileConfigs[0]);
        this.state = {
            results: "Your raw output will appear here."
        };
    }
    launch() {
        RecordHooks();
        this.importer
            .requestDataFromUser()
            .then(results => {
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
                        Obtain your license key from the
                        <a href="https://flatfile.io/app" target="_blank">
                            Flatfile Dashboard &rarr;
                        </a>
                        <p>
                            Once you've found it, set the <code>LICENSE_KEY</code> variable on
                            Line 8 before continuing.
                        </p>
                    </div>
                )}
                <DemoApp />
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
