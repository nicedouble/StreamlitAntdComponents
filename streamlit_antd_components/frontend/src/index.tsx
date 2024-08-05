// NOTE: The following line needs to be the first import to ensure that we
// correctly configure where chunked static assets are fetched from.
import "./setWebpackPublicPath"

import {ComponentProps, withStreamlitConnection} from "streamlit-component-lib";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react"
import ReactDOM from "react-dom"
import componentsMap from "./components";
import {insertScrollbarStyle} from "./js/utils.react";
import './css/utils.css'

//select component
const AntdComponent = (props: ComponentProps) => {
    //get data
    const id = props.args['id']
    const kw = props.args['kw']

    //load streamlit style scrollbar
    insertScrollbarStyle()

    //return component base on component id
    const component = componentsMap[id]
    if (component === undefined) {
        return <></>
    } else {
        return component(kw)
    }
};

//wrap component
const StreamlitAntdComponent = withStreamlitConnection(AntdComponent)

//render component
ReactDOM.render(
    <React.StrictMode>
        <StreamlitAntdComponent/>
    </React.StrictMode>,
    document.getElementById("root")
)
