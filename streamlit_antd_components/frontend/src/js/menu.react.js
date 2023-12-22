import React from "react";
import {AlphaColor, deepCopy, MartineFontSize} from "./utils.react";
import {AntdTag} from "../ts/Tag";

//recurve str property to react node
const strToNode = (obj, size, variant) => {
    if (Array.isArray(obj)) {
        return obj.map(obj_ => strToNode(obj_, size, variant))
    } else {
        let obj_copy = deepCopy(obj);
        const icon = obj_copy.icon;
        const href = obj_copy.href;
        const key = obj_copy.key;
        const tag = obj_copy.tag;
        const description = obj_copy.description;
        obj_copy.key = String(key)
        if (obj_copy.children) {
            obj_copy.children = obj_copy.children.map(obj_ => strToNode(obj_, size, variant))
        }
        if (icon) {
            obj_copy.icon = <span><i className={`bi bi-${icon}`}/></span>
        }
        if (description) {
            obj_copy.label = <div style={{lineHeight: 1.3}} className={'py-2'}>
                <div style={{wordBreak: 'break-word'}}>{obj_copy.label}</div>
                <div className={'sac-menu-description'} variant style={{
                    color: AlphaColor('--text-color', 0.5),
                    fontSize: MartineFontSize[size] - 2,
                    wordBreak: 'break-word',
                    fontWeight: 'normal'
                }}>{description}</div>
            </div>
        }
        if (href) {
            obj_copy.label =
                <a href={href} target='_blank' rel='noreferrer' className={'text-decoration-none'}>{obj_copy.label}</a>
        }
        if (tag) {
            obj_copy.label = <div className={'d-flex align-items-center justify-content-between'}>
                <div className={'mr-3'}>{obj_copy.label}</div>
                <div className={'d-flex flex-wrap'} style={{maxWidth:'50%'}}>{Array.isArray(tag) ? tag.map((x) => <div
                    className={'mx-1'}>{AntdTag(x)}</div>) : AntdTag(tag)}
                </div>
            </div>
        }
        return obj_copy
    }
}


export {strToNode}