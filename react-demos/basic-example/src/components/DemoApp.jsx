import React, {useState} from 'react'
import {ConfigHighlighter} from "./SyntaxHighlighting";
import {FlatfileDropzone} from "./Dropzone";
import finalArray, {filesToUse, flatfileConfigs} from "../configs";
import Spreadsheet from "react-spreadsheet";
import Toggle from "react-toggle"
import "react-toggle/style.css"

const initialData = [
    [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
    [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
    [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
    [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
    [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
    [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
    [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}]
]

const getFileName = (file) => {
    let placeholder = file.replace('/static/media/', '')
    placeholder = placeholder.split('.')
    placeholder.splice(1, 1)
    return placeholder.join('.')
}

const FileIcon = props => {
    const setPath = props.setPath;
    return (
        <span className="file-icon">
            <div className="border-div">
                <a href={setPath} target="_blank" rel="noopener noreferrer" download={setPath}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={props.fill}>
                        <title>office-file-sheet</title>
                        <path
                            d="M21.707,5.705,16.293.291A1,1,0,0,0,15.586,0H4A2,2,0,0,0,2,2V22a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V6.412A1,1,0,0,0,21.707,5.705ZM20,21.5a.5.5,0,0,1-.5.5H4.5a.5.5,0,0,1-.5-.5V2.5A.5.5,0,0,1,4.5,2H14.75a.25.25,0,0,1,.25.25V5a2,2,0,0,0,2,2h2.75a.25.25,0,0,1,.25.25Z"/>
                        <rect x="6.5" y="10.498" width="3" height="2" rx="0.5" ry="0.5"/>
                        <rect x="6.5" y="13.998" width="3" height="2" rx="0.5" ry="0.5"/>
                        <rect x="6.5" y="17.498" width="3" height="2" rx="0.5" ry="0.5"/>
                        <rect x="11" y="10.498" width="6.5" height="2" rx="0.5" ry="0.5"/>
                        <rect x="11" y="13.998" width="6.5" height="2" rx="0.5" ry="0.5"/>
                        <rect x="11" y="17.498" width="6.5" height="2" rx="0.5" ry="0.5"/>
                    </svg>
                    <h4>{props.fileName}</h4>
                </a>
            </div>
            <button type={'button'} onClick={e => props.previewData(finalArray[props.index])}>Preview Data</button>
        </span>
    )
}
// import Dropzone from "react-dropzone-uploader/dist/Dropzone";
const consoleSomething = () => {
    console.log('something')
}
// export const DemoApp = (filesArray, configsArray) => {
export const DemoApp = () => {
    //const configs = configsArray // probably some function here that will put each config together
    // (maybe even an array with just the configs and then it can plug it into the JS)

    const [file, setFile] = useState(initialData) // setFile should call setConfig
    const [config, setConfig] = useState(flatfileConfigs[0])

    const stateConfig = () => {
        if (config.type !== flatfileConfigs[1].type) {
            setConfig(flatfileConfigs[1])
        } else {
            setConfig(flatfileConfigs[0])
        }
    }
    return (
        <div id="demo-app">
            <ConfigHighlighter config={config}/>
            <div id="play-area" className="demo-half">
                <FlatfileDropzone text="Drag and drop a file below OR click to upload" initiateFlatfile={consoleSomething}/>
                <div className="icon-wrapper">
                    {filesToUse.map((item, index) => {
                        let displayName = getFileName(item);
                        return (
                            <FileIcon key={item} index={index} setPath={item} fileName={displayName} fill={'#EE5584'} previewData={setFile} />
                        )
                    })}
                </div>
                <Spreadsheet data={file} />
                <div id="page-toggle">
                    <h2>Pick a config to test out</h2>
                    <label>
                        <h4>Simple Config</h4>
                        <Toggle
                            defaultChecked={false}
                            icons={false}
                            onChange={stateConfig} />
                        <h4>With Validators</h4>
                    </label>
                </div>
            </div>
        </div>
    )
}
