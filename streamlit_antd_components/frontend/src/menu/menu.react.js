import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {deepCopy} from "../utils.react";

//recurve str property to react node
const strToNode = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(obj_ => strToNode(obj_))
    } else {
        let obj_copy = deepCopy(obj);
        const icon = obj_copy.icon;
        const href = obj_copy.href;
        const key = obj_copy.key;
        obj_copy.key = String(key)
        if (obj_copy.children) {
            obj_copy.children = obj_copy.children.map(obj_ => strToNode(obj_))
        }
        if (icon) {
            obj_copy.icon = <span><i className={`bi bi-${icon}`}/></span>
        }
        if (href) {
            obj_copy.label = <a href={href} target='_blank' rel='noreferrer'>{obj_copy.label}</a>
        }
        return obj_copy
    }
}


const menuHeight = (open_keys, items) => {

    const showItem_ = (open_keys, item) => {
        const itemHeight = 52
        let h = itemHeight
        const showItem = (open_keys, item) => {
            if (open_keys && item.children && open_keys.includes(item['key'])) {
                h += item['children'].length * itemHeight
                item['children'].map(item_ => showItem(open_keys, item_))
            }
            if (item.type === 'divider') {
                h = 2
            }
            if (item.type === 'group') {
                h += item['children'].length * itemHeight
            }
        }
        showItem(open_keys, item)
        return h
    }

    function sum(arr) {
        let s = 0;
        for (let i = arr.length - 1; i >= 0; i--) {
            s += arr[i];
        }
        return s;
    }

    let n_arr = items.map(item => showItem_(open_keys, item))

    return sum(n_arr)
}


export {strToNode, menuHeight}