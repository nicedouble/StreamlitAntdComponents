import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {AlphaColor, deepCopy} from "./utils.react";
import {AntdTag} from "../ts/Tag";
import {ConfigProvider, Tooltip} from "antd";

//recurve str property to react node
const strToNode = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(obj_ => strToNode(obj_))
    } else {
        let obj_copy = deepCopy(obj);
        const icon = obj_copy.icon;
        const tag = obj_copy.tag;
        const tooltip = obj_copy.tooltip;
        if (obj_copy.children) {
            obj_copy.children = obj_copy.children.map(obj_ => strToNode(obj_))
        }
        if (icon) {
            obj_copy.icon = <i className={`bi bi-${icon}`}/>
        }
        if (tag) {
            obj_copy.label = <>{obj_copy.label} {AntdTag(tag)}</>
        }else{
            obj_copy.label = <>{obj_copy.label}</>
        }
        if (tooltip) {
            obj_copy.label = <ConfigProvider
                theme={{
                    components: {
                        Tooltip: {
                            colorBgSpotlight: 'var(--background-color)',
                            colorTextLightSolid:'var(--text-color)',
                            borderRadius: 6,
                            controlHeight: 12,
                            fontSize: 12,
                        },
                    },
                }}
            >
                <Tooltip
                    title={tooltip}
                    placement={'bottomLeft'}
                    arrow={false}
                    overlayInnerStyle={{padding: '2px 6px',border:`1px solid ${AlphaColor('--text-color')}`}}
                >
                    {obj_copy.label}
                </Tooltip>
            </ConfigProvider>
        }
        obj_copy['title'] = obj_copy.label
        delete obj_copy.label
        return obj_copy
    }
}


const treeHeight = (open_keys, items, item_height = 30) => {

    const showItem_ = (open_keys, item) => {
        let n = 1
        const showItem = (open_keys, item) => {
            if (open_keys && item.children) {
                if (open_keys.includes(item['key'])) {
                    n += item['children'].length
                    item['children'].map(item_ => showItem(open_keys, item_))
                }
            }
        }
        showItem(open_keys, item)
        return n
    }

    function sum(arr) {
        let s = 0;
        for (let i = arr.length - 1; i >= 0; i--) {
            s += arr[i];
        }
        return s;
    }

    let n_arr = items.map(item => showItem_(open_keys, item))
    let n = sum(n_arr)
    return n * item_height
}

export {strToNode, treeHeight}