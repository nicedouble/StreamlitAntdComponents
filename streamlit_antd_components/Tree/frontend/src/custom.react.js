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
        if (obj_copy.hasOwnProperty('children')) {
            obj_copy.children = obj_copy.children.map(obj_ => strToNode(obj_))
        }
        if (icon) {
            obj_copy.icon = <i className={`bi bi-${icon}`}/>
        }
        return obj_copy
    }
}

const AlphaColor = (varColor = '--primary-color', alpha = 0.2) => {
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

const treeHeight = (open_keys, items, item_height = 28) => {

    const showItem_ = (open_keys, item) => {
        let n = 1
        const showItem = (open_keys, item) => {
            if (item.hasOwnProperty('key') && open_keys) {
                if (item.hasOwnProperty('children')) {
                    if (open_keys.includes(item['key'])) {
                        n += item['children'].length
                        item['children'].map(item_ => showItem(open_keys, item_))
                    }
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

export {strToNode, AlphaColor, treeHeight}