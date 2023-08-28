import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import ReactMarkdown from "react-markdown";
import Marquee from 'react-fast-marquee';
import rehypeRaw from "rehype-raw";
import '../css/utils.css'

const positionMap = {
    'top': 'flex-column',
    'bottom': 'flex-column-reverse',
    'left': 'flex-row',
    'right': 'flex-row-reverse'
}
const labelElement = (position, label, size) => {
    if (label !== null) {
        let marginMap = {'top': 'mb-2', 'bottom': 'mt-2', 'left': 'mr-2', 'right': 'ml-2'}
        let styles = {color: 'var(--text-color)', fontSize: size === 'large' ? 16 : 14}
        return <div className={marginMap[position]} style={styles} id={'label'}>{markdown(label)}</div>
    } else {
        return undefined
    }
}

const LabelComponent = ({label, onlyLabel = false, align = 'start', position = 'top', size = 'middle', children}) => {
    if (onlyLabel) {
        return <div>
            {labelElement('top', label, 'middle')}
            {children}
        </div>
    } else {
        let alignItem = `align-items-${['left', 'right'].indexOf(position) !== -1 ? 'center' : 'start'}`
        return <div className={`d-flex justify-content-${align}`}>
            <div
                className={`d-flex ${positionMap[position]} justify-content-${align} ${alignItem}`}>
                {labelElement(position, label, size)}
                {children}
            </div>
        </div>
    }
}


const marquee = (x) => {
    if (x !== null) {
        return <Marquee pauseOnHover={true} gradient={false}>{markdown(x)}</Marquee>
    }
    return undefined
}

const markdown = (x) => {
    if (x !== null) {
        return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{x}</ReactMarkdown>
    }
    return undefined
}

const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

const insertStyle = (id, style) => {
    let element = document.getElementById(id);
    if (!element) {
        element = document.createElement("style");
        element.id = id;
    }
    element.innerHTML = style;
    let root = document.getElementById("root");
    root && root.appendChild(element)
}

const StreamlitScrollbar = () => {
    //global streamlit like style
    let scrollBarColor = AlphaColor('--text-color', 0.4);
    let style = `
        ::-webkit-scrollbar {
            height: 6px;
            width: 6px;
            background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: ${scrollBarColor};
        }`
    //insert style
    insertStyle('streamlit-scrollbar', style)
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

const getCollapseKeys = (items) => {
    let keys = []

    const getKey = (obj) => {
        if (Array.isArray(obj)) {
            obj.map(obj_ => getKey(obj_))
        } else {
            if (obj.children) {
                obj.children.map((obj_) => getKey(obj_))
                keys.push(obj.key)
            }
        }
    }
    getKey(items)
    return keys
}

const getParentKeys = (keys, obj) => {
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
    let parentKeys = keys.map(k => getParent(k, obj))
    let parentKey = []
    for (let i = 0; i < parentKeys.length; i += 1) {
        let element = parentKeys[i]
        for (let j = 0; j < element.length; j += 1) {
            parentKey.push(element[j])
        }
    }
    return parentKey
}

const reindex = (index, asString = true) => {
    let r = index
    if (typeof (index) == 'number') {
        r = [asString ? String(index) : index]
    }
    if (Array.isArray(index) && asString) {
        r = index.map(i => String(i))
    }
    return r
}

const getHrefKeys = (items) => {
    let keys = []

    const getKey = (obj) => {
        if (Array.isArray(obj)) {
            obj.map(obj_ => getKey(obj_))
        } else {
            if (obj.children) {
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

const parseIcon = (obj) => {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        return <i className={`bi bi-${obj['bs']} mx-1`}/>
    }
    return obj
}

export {
    deepCopy,
    AlphaColor,
    StreamlitScrollbar,
    getCollapseKeys,
    getHrefKeys,
    getParentKeys,
    reindex,
    parseIcon,
    markdown,
    marquee,
    LabelComponent,
    insertStyle
}