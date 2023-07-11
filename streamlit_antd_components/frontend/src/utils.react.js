import "bootstrap-icons/font/bootstrap-icons.css";

//deep copy object func
const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj))
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
    let element = document.getElementById('streamlit-like');
    if (!element) {
        element = document.createElement("style");
        element.id = 'streamlit-like';
    }
    element.innerHTML = style;
    let root = document.getElementById("root");
    root && root.appendChild(element)
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
export {deepCopy, AlphaColor, StreamlitScrollbar, getCollapseKeys, getHrefKeys, getParentKeys, reindex}