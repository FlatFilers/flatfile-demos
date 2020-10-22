import React, {Component} from "react";
import ReactDOM from "react-dom";
import Tippy from "@tippyjs/react";
import FlatfileImporter from "@flatfile/adapter";

import "tippy.js/dist/tippy.css";
import "./styles.css";

import {flatfileConfig} from "./flatfile-config";
import flatfileLogo from "./logomark_purple@1x.png";
import reactLogo from "./react.png";
import download from "./download-thick-bottom.png";
import * as dataHooks from "./data-hooks.csv"

import {demoPath} from "./demo-path.js"

const LICENSE_KEY = '';

class App extends Component {
    constructor() {
        super();
        this.launch = this.launch.bind(this);
        this.importer = new FlatfileImporter(LICENSE_KEY, flatfileConfig);
        this.state = {
            results: false,
            licensePlaceholder:
                "Login to your dashboard or sign up for Flatfile to grab a license key.",
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
        const licenseToolip =
            "Your public license key is active. Your account is currently in Starter mode, which gives you access to up to 50 production imports per month free of charge. Want more features or imports? Reach out to our team at flatfile.io";
        return (
            <>
                <header className="block-intro">
                    <div className="logo-section">
                        <img
                            src={flatfileLogo}
                            alt="flatfile logo"
                            className="logo logo-left"
                        />
                        <img src={reactLogo} alt="react logo" className="logo logo-right" />
                    </div>
                    <span className="label">Flatfile + React</span>
                    <h1 className="page-title">Getting started</h1>
                </header>
                <aside className="block-license">
                    {LICENSE_KEY ? (
                        <>
                            <div className="">
                                <div className="license-header">
                                    <h3>License key</h3>
                                    <Tippy content={licenseToolip}>
                                        <div id="license-status"> </div>
                                    </Tippy>
                                </div>
                                <span className="license-info">{LICENSE_KEY}</span>
                                <input
                                    className="button"
                                    type="button"
                                    id="launch"
                                    value="Import users"
                                    onClick={this.launch}
                                />
                                <div id="file-download">
                                    <p>
                                        Need a file to use? Click the icon to download a test csv.
                                    </p>
                                    <a href={dataHooks} download="datahooks">
                                        <img src={download} alt="download icon" />
                                    </a>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="has-license">
                            <a
                                id="github"
                                className="button"
                                href="http://app.flatfile.io"
                            >
                                Sign in with Github
                                <span className="button-icon right">&rarr;</span>
                            </a>
                            <p className="note">{this.state.licensePlaceholder}</p>
                        </div>
                    )}
                </aside>
                <main className="block-editor" id="main">
                    {LICENSE_KEY ? (
                        <div className="code-preview">
                            {this.state.results ? (
                                <pre>
                  <p className="code-preview-json">{this.state.results}</p>
                </pre>
                            ) : (
                                <pre>
                  <p className="code-preview-text">
                    Import a file to view the JSON output here
                  </p>
                </pre>
                            )}
                        </div>
                    ) : (
                        <div className="code-preview">
                            <p className="code-preview-text">Place your license key on line 17 of index.js</p>
                        </div>
                    )}
                </main>
                <aside className="block-features">
                    {demoPath !== 'Path not found' &&
                        <div className="callout-npx" id="removeBg">
                            <h3 className="callout-title">
                                Find your code here:
                            </h3>
                            <span className="npx-script">
                                {demoPath}
                             </span>
                        </div>}
                    <ul className="callout-features">
                        <li className="callout-feature-li">Runs in the browser</li>
                        <li className="callout-feature-li">Minimal dependencies</li>
                        <li className="callout-feature-li">Automatic encoding</li>
                    </ul>
                </aside>
                <footer className="block-footer">
                    <img
                        placeholder="Flatfile logomark"
                        height="22"
                        width="22"
                        src="data:image/png;base64,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"
                    />
                    <a
                        className="link"
                        href="https://github.com/FlatFilers/flatfile-demos/react"
                    >
                        View on GitHub
                    </a>
                </footer>
            </>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
