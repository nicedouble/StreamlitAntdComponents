import React from "react";
import {deepCopy} from "./utils.react"
import {CustomIcon} from "../ts/utils";

//recurve str property to react node
const strToNode = (obj) => {
    return obj.map((item, idx) => {
        let item_ = deepCopy(item)
        item_['key'] = idx
        if (item_['icon'] != null) {
            if (item_['label'].length > 0) {
                item_['label'] = <>
                    <CustomIcon icon={item.icon} style={{marginRight: 10}}/>
                    {item_['label']}
                </>
            } else {
                item_['label'] = <CustomIcon icon={item.icon}/>
            }
        }
        return item_
    })
}

export {strToNode}