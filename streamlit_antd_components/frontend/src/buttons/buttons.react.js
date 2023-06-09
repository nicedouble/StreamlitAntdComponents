const growStyle = () => {
    let style = `
        div.ant-space-item{
        display: flex;
        flex-grow: 1;
        }`
    let element = document.getElementById('grow');
    if (!element) {
        element = document.createElement("style");
        element.id = 'grow';
    }
    element.innerHTML = style;
    let root = document.getElementById("root");
    root && root.appendChild(element)
}


export {growStyle}