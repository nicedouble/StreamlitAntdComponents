import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

//deep copy object func
const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}
//recurve str property to react node
const strToNode = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(obj_ => strToNode(obj_))
    } else {
        let obj_copy = deepCopy(obj);
        const icon = obj_copy.icon;
        const href = obj_copy.href;
        if (obj_copy.hasOwnProperty('children')) {
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

//all parent keys
const getParent = (k, obj) => {
    let allParentKeys = []
    //get one parent key
    const getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some((item) => item.key === key)) {
                    parentKey = node.key;
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    }
    const getParentKey_ = (k, obj) => {
        let key = getParentKey(k, obj)
        if (key) {
            allParentKeys.push(key)
            getParentKey_(key, obj)
        }
    }
    getParentKey_(k, obj)
    return allParentKeys
}

const menuHeight = (open_keys, items, item_height = 45) => {

    const showItem_ = (open_keys, item) => {
        let n = 1
        const showItem = (open_keys, item) => {
            if (item.hasOwnProperty('key') && open_keys) {
                if (item.hasOwnProperty('children')) {
                    if (open_keys.includes(item['key']) || item.hasOwnProperty('type')) {
                        n += item['children'].length
                        item['children'].map(item_ => showItem(open_keys, item_))
                    }
                }
            }
            if (item.hasOwnProperty('dashed')) {
                n = 0
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


const getHrefKeys = (items) => {
    let keys = []

    const getKey = (obj) => {
        if (Array.isArray(obj)) {
            obj.map(obj_ => getKey(obj_))
        } else {
            if (obj.hasOwnProperty('children')) {
                obj.children.map((obj_) => getKey(obj_))
            }
            if (obj.href != null) {
                keys.push(obj.key)
            }
        }
    }
    getKey(items)
    return keys
}

const AlphaColor = (varColor = '--primary-color', alpha = 0.1) => {
    let pc = getComputedStyle(document.querySelector(":root")).getPropertyValue(varColor)
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = pc.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
        }
        return `rgba(${sColorChange.join(",")},${alpha})`;
    } else {
        return sColor;
    }
}


export {strToNode, AlphaColor, getParent, getHrefKeys, menuHeight}