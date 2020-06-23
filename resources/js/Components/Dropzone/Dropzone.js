import React from "react";
import "./Dropzone.css";
import Dropzone from "react-dropzone";

export default function ({onDrop, multiple}) {
    return (
        <Dropzone multiple={multiple || true} onDrop={acceptedFiles => onDrop(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section className='dropzone' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <i style={{fontSize: '40px'}} className="fas fa-upload"/>
                    <p>Drag and drop some files here, or click to select files</p>
                </section>
            )}
        </Dropzone>
    )
}