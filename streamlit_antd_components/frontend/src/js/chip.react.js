import {deepCopy,} from "./utils.react";
import React from "react";
import {CustomIcon} from "../ts/utils";

const strToNode = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(obj_ => strToNode(obj_))
    } else {
        let obj_copy = deepCopy(obj);
        let label = obj_copy['label']
        let icon = obj_copy['icon']
        if (icon !== null) {
            if (label.length > 0) {
                obj_copy['label'] = <span>
                    <CustomIcon icon={icon} style={{marginRight:5}}/>
                    {label}
                </span>
            } else {
                obj_copy['label'] = <CustomIcon icon={icon}/>
            }
        }
        obj_copy['value'] = String(obj_copy['value'])
        return obj_copy
    }
}
export default strToNode