import React from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

//
const customStyles = {dropzone: {border: '2px dotted #8C66FF', borderRadius: '5px', color: 'black', width: '90%', marginTop: '20px'}}

export const FlatfileDropzone = (props) => {

    const importerFunction = (file) => {
        props.initiateFlatfile()
    }
    // specify upload params and url for your files
    const getUploadParams = ({meta}) => {
        return {url: 'https://httpbin.org/post'}
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({meta, file, remove}, status) => {
        if (status === 'preparing') {
            console.log(status)
            // remove()
        } else if (status === 'headers_received') {
            console.log(status)
            // remove()
        } else {
            console.log('handleStatusChange')
        }
    }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            accept="*"
            maxFiles={1}
            multiple={false}
            canCancel={false}
            inputContent={props.text}
            styles={customStyles}
            SubmitButtonComponent={null}
        />
    )
}
