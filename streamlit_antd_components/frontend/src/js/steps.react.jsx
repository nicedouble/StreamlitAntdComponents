import {deepCopy} from "./utils.react";
import {CustomIcon} from "../ts/utils";
import React from "react";

const strToNode = (obj) => {
    return obj.map((item, idx) => {
        let item_ = deepCopy(item)
        if (item_['icon'] != null) {
            item_['icon'] = <CustomIcon icon={item_['icon']}/>
        }
        item_['subTitle'] = item_['subtitle']
        delete item_['subtitle']
        return item_
    })
}

export {strToNode}