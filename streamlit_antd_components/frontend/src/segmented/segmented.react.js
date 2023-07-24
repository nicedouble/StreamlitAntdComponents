import {deepCopy} from "../utils.react";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const strToNode = (obj) => {
    return obj.map((item, idx) => {
        let item_ = deepCopy(item)
        if (item_['icon'] != null) {
            item_['icon'] = <i className={`bi bi-${item['icon']}`}/>
        }
        return item_
    })
}

export {strToNode}