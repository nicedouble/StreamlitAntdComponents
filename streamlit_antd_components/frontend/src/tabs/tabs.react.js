import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {deepCopy, AlphaColor} from "../utils.react"

const TabsStyle = (align, grow) => {
    let color = AlphaColor('--text-color', 0.1);
    let style = `
        .ant-tabs-nav-wrap{
            justify-content: ${align};
        }
        .ant-tabs-nav:before {
            border-bottom: 2px solid ${color} !important;
        }
        .ant-tabs-right > .ant-tabs-content-holder {
            margin-right: -2px;
            border-right: 2px solid ${color};
        }
        .ant-tabs-left > .ant-tabs-content-holder {
            margin-left: -2px;
            border-left: 2px solid ${color};
        }
        `
    let growStyle = `
        .ant-tabs-tab{
            flex-grow: 1;
        }
        .ant-tabs-nav-list{
            flex-grow: 1;
        }
    `
    if (grow) {
        style += growStyle
    }
    let element = document.getElementById('tabs-border');
    if (!element) {
        element = document.createElement("style");
        element.id = 'tabs-border';
    }
    element.innerHTML = style;
    let root = document.getElementById("root");
    root && root.appendChild(element)
}


//recurve str property to react node
const strToNode = (obj) => {
    return obj.map((item, idx) => {
        let item_ = deepCopy(item)
        item_['key'] = idx
        if (item_['icon'] != null) {
            item_['label'] = <span>
                <span style={{marginRight: 8}}><i className={`bi bi-${item['icon']}`}/></span>
                {item_['label']}
            </span>
        }
        return item_
    })
}

export {strToNode, TabsStyle}