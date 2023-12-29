import React from "react";
import {deepCopy} from "./utils.react"

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

export {strToNode}