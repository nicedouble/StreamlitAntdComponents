import {deepCopy} from "./utils.react";
import React from "react";

const strToNode = (obj) => {
    return obj.map((item, idx) => {
        let item_ = deepCopy(item)
        if (item_['icon'] != null) {
            if (item_['label'].length > 0) {
                item_['label'] = <>
                    <i className={`bi bi-${item['icon']} mr-2`}/>
                    {item_['label']}
                </>
            } else {
                item_['label'] = <i className={`bi bi-${item['icon']}`}/>
            }
        }
        if (item_['href'] != null) {
            item_['label'] = <a href={item_['href']} target={'_blank'} rel={'noreferrer'}>{item_['label']}</a>
        }
        item_['value'] = String(item_['value'])
        return item_
    })
}

export {strToNode}