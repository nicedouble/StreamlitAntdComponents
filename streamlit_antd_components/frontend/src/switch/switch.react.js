import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const parseIcon = (obj) => {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        return <i className={`bi bi-${obj['bs']} mx-1`}/>
    }
    return obj
}

export {parseIcon}