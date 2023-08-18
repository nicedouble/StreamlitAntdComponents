import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {deepCopy, AlphaColor,insertStyle} from "./utils.react";

const CascaderStyle = (multiple) => {
    let borderStyle = `
        /*dropdown border*/
        .ant-select-dropdown {
            border: 1px solid ${AlphaColor('--text-color', 0.1)};
        }
        /*vertical border*/
        ul.ant-cascader-menu:not(:last-child) {
            border-inline-end: 1px solid ${AlphaColor('--text-color', 0.1)} !important;
        }
    `
    let checkboxStyle = `
        .ant-select-selection-item{
            color: rgb(255, 255, 255);
        }
        `
    let style = multiple ? borderStyle + checkboxStyle : borderStyle
    insertStyle('cascader',style)
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
            obj_copy.label = <span key={obj_copy.value}><i className={`bi bi-${icon} m-1`}/>{label}</span>
        } else {
            obj_copy.label = <span key={obj_copy.value}>{label}</span>
        }
        obj_copy['rawLabel'] = label
        return obj_copy
    }
}

export {strToNode, CascaderStyle}