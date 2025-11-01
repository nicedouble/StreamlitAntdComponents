import React from "react";
import {deepCopy, getSize} from "./utils.react"
import {CustomIcon} from "../ts/utils";
import {AntdTags} from "../ts/Tag";

//recurve str property to react node
const strToNode = (obj, size) => {
    return obj.map((item, idx) => {
        let obj_copy = deepCopy(item)
        obj_copy['key'] = idx
        const icon = obj_copy['icon']
        const tag = obj_copy['tag']
        //add tag
        if (tag) {
            obj_copy.label = <div className={'d-flex align-items-center'}>
                <div className={'mr-1'}>{obj_copy.label}</div>
                <AntdTags
                    items={Array.isArray(tag) ? tag : [tag]}
                    align={'end'}
                    size={getSize(size) - 4}
                    style={{lineHeight: 1.2}}
                />
            </div>
        }
        //add icon
        if (icon) {
            obj_copy.label = <div className={'d-flex align-items-center'}>
                <CustomIcon icon={icon} style={{marginRight: obj_copy.label ? 5 : 0}}/>
                <div className={'d-flex  flex-grow-1'}>{obj_copy.label}
                </div>
            </div>
        }
        return obj_copy
    })
}

export {strToNode}