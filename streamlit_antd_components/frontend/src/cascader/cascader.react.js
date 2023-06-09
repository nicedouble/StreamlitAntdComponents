import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {deepCopy} from "../utils.react";

const CascaderStyle = (multiple) => {
    let style = `
        .ant-select-selection-item{
            color: rgb(255, 255, 255);
        }
        `
    if (multiple) {
        let element = document.getElementById('tabs-border');
        if (!element) {
            element = document.createElement("style");
            element.id = 'tabs-border';
        }
        element.innerHTML = style;
        let root = document.getElementById("root");
        root && root.appendChild(element)
    }
}


//recurve str property to react node
const strToNode = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(obj_ => strToNode(obj_))
    } else {
        let obj_copy = deepCopy(obj);
        const icon = obj_copy.icon;
        const label = obj_copy.label;
        if (obj_copy.children != null) {
            obj_copy.children = obj_copy.children.map(obj_ => strToNode(obj_))
        }
        if (icon) {
            obj_copy.label = <span><i className={`bi bi-${icon} m-1`}/>{label}</span>
        } else {
            obj_copy.label = <span>{label}</span>
        }
        return obj_copy
    }
}

export {strToNode, CascaderStyle}