import React from "react";
import {deepCopy, AlphaColor, insertStyle} from "./utils.react"

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
    insertStyle('tabs-style', style)
}


//recurve str property to react node
const strToNode = (obj) => {
    return obj.map((item, idx) => {
        let item_ = deepCopy(item)
        item_['key'] = idx
        if (item_['icon'] != null) {
            if (item_['label'].length > 0) {
                item_['label'] = <>
                    <span className={'mr-2'}><i className={`bi bi-${item['icon']}`}/></span>
                    {item_['label']}
                </>
            } else {
                item_['label'] = <i className={`bi bi-${item['icon']}`}/>
            }
        }
        return item_
    })
}

export {strToNode, TabsStyle}