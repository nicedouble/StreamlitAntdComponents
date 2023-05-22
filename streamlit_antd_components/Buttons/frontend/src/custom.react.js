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

const getHrefIndex = (items) => {
    let keys = []

    for (let i = 0; i < items.length; i += 1) {
        if (items[i]['href'] != null) {
            keys.push(i)
        }
    }
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

export {loadStyles, AlphaColor, getHrefIndex}