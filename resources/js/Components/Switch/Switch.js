import React from "react";
import "./Switch.css";

export default function ({value, onChange}) {
    return (
        <label className="switch">
            <input type="checkbox" onChange={onChange} checked={value || false}/>
            <span className="slider"></span>
        </label>
    )
}