import React from "react";
import {deepCopy, getSize} from "./utils.react";
import {AntdTags} from "../ts/Tag";
import {CustomIcon} from "../ts/utils";

//recurve str property to react node
const strToNode = (obj, size, variant, desc_color) => {
    if (Array.isArray(obj)) {
        return obj.map(obj_ => strToNode(obj_, size, variant, desc_color))
    } else {
        let obj_copy = deepCopy(obj);
        const icon = obj_copy.icon;
        const href = obj_copy.href;
        const key = obj_copy.key;
        const tag = obj_copy.tag;
        const description = obj_copy.description;
        const type = obj_copy.type;
        obj_copy.key = String(key)
        if (obj_copy.children) {
            obj_copy.children = obj_copy.children.map(obj_ => strToNode(obj_, size, variant, desc_color))
        }
        //icon
        obj_copy.icon = <CustomIcon icon={icon} style={{marginRight: 10, fontSize: getSize(size) + 3}}/>
        //add description
        if (description) {
            obj_copy.label = <div style={{lineHeight: 1.3}}>
                <div style={{wordBreak: 'break-word'}}>{obj_copy.label}</div>
                <div className={'menu-desc'} style={{
                    color: desc_color,
                    fontSize: getSize(size) - 2,
                    wordBreak: 'break-word',
                    fontWeight: 'normal'
                }}>{description}</div>
            </div>
        }
        //add tag
        if (tag) {
            obj_copy.label = <div className={'d-flex align-items-center justify-content-between'}>
                <div className={'mr-3'}>{obj_copy.label}</div>
                <AntdTags
                    items={Array.isArray(tag) ? tag : [tag]}
                    align={'end'}
                    size={getSize(size) - 2}
                />
            </div>
        }
        //add group icon
        if (type === 'group' && icon) {
            obj_copy.label = <div className={'d-flex align-items-center'}>
                {obj_copy.icon}
                <div style={{flexGrow: 1}}>{obj_copy.label}</div>
            </div>
        }
        //add href
        if (href) {
            obj_copy.label =
                <a href={href} target='_blank' rel='noreferrer' className={'text-decoration-none'}
                   style={{color: 'inherit'}}>{obj_copy.label}</a>
        }
        return obj_copy
    }
}


export {strToNode}