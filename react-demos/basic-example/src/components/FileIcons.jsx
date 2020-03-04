import React from 'react'
import {FlatfileDropzone} from "./Dropzone";
import Spreadsheet from "react-spreadsheet";



export const FileIcons = props => {
    const setPath = props.setPath;
    return (
        <span className="file-icon" onClick={event => console.log(event)}>
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
        </span>
    )
}

export const DataPreview = props => {

    return (
        <div id="play-area" className="demo-half">
            <FlatfileDropzone text="Drag and drop a file OR click to upload"/>
            <div className="icon-wrapper">
                {filesArray.filesArray.map(item => {
                    let displayName = getFileName(item);
                    return (
                        <FileIcon key={item} setPath={item} fileName={displayName} fill={'#334CFF'} />
                    )
                })}
            </div>
            <Spreadsheet data={file} onChange={logSomething} onClick={logSomething}/>
        </div>
    )
}
