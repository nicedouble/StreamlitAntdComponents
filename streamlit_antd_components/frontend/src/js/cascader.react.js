import React from "react";
import {deepCopy} from "./utils.react";
import {CustomIcon} from "../ts/utils";

//recurve str property to react node
const strToNode = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(obj_ => strToNode(obj_))
    } else {
        let obj_copy = deepCopy(obj);
        const icon = obj_copy.icon;
        const label = obj_copy.label;
        if (obj_copy.children != null) {
            obj_copy.children = obj_copy.children.map(obj_ => strToNode(obj_))
        }
        if (icon) {
            obj_copy.label = <span key={obj_copy.value}><CustomIcon icon={icon} style={{marginRight: 5}}/>{label}</span>
        } else {
            obj_copy.label = <span key={obj_copy.value}>{label}</span>
        }
        obj_copy['rawLabel'] = label
        return obj_copy
    }
}

export {strToNode}