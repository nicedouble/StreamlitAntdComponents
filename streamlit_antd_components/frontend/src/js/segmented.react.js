import {deepCopy} from "./utils.react";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const strToNode = (obj) => {
    return obj.map((item, idx) => {
        let item_ = deepCopy(item)
        if (item_['icon'] != null) {
            item_['label'] = <>
                <i className={`bi bi-${item['icon']} mr-2`}/>
                {item_['label']}
            </>
        }
        item_['value'] = String(item_['value'])
        return item_
    })
}

export {strToNode}