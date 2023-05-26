import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

//deep copy object func
const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}
//recurve str property to react node
const strToNode = (obj) => {
    return obj.map((item, idx) => {
        let item_ = deepCopy(item)
        item_['key'] = idx
        if (item_['icon'] != null) {
            item_['label'] = <span>
                <span style={{marginRight: 8}}><i className={`bi bi-${item['icon']}`}/></span>
                {item_['label']}
            </span>
        }
        return item_
    })
}

const AlphaColor = (varColor = '--primary-color', alpha = 0.2) => {
    const getColorComponents = (color) => {
        // Handle hexadecimal color format
        const hexMatch = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        if (hexMatch.test(color)) {
            let hex = color.substring(1);
            if (hex.length === 3) {
                hex = hex.split('').map((char) => char + char).join('');
            }
            const [r, g, b] = hex.match(/.{2}/g).map((c) => parseInt(c, 16));
            return [r, g, b];
        }

        // Handle RGB and RGBA color formats
        const rgbMatch = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/;
        const match = color.match(rgbMatch);
        if (match) {
            const [_, r, g, b] = match.map(Number);
            return [r, g, b];
        }

        // Handle other color formats or invalid colors
        return null;
    };

    const color = getComputedStyle(document.documentElement).getPropertyValue(varColor).trim();
    const colorComponents = getColorComponents(color);

    if (colorComponents) {
        const [r, g, b] = colorComponents;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
        // Handle invalid colors
        return 'defaultColor';
    }
};
const loadStyles = (url, id) => {
    let ele = document.getElementById(id);
    if (!ele) {
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        link.id = id;
        let root = document.getElementById("root");
        root && root.appendChild(link)
    }
}

export {strToNode, AlphaColor,loadStyles}