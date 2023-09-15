import {deepCopy} from "./utils.react";
import React from "react";

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
                    <i className={`bi bi-${icon} mr-2`}/>
                    {label}
                </span>
            } else {
                obj_copy['label'] = <i className={`bi bi-${icon}`}/>
            }
        }
        obj_copy['value'] = String(obj_copy['value'])
        return obj_copy
    }
}
export default strToNode