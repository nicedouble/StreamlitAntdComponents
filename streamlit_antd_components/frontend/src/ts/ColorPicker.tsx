import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Cascader} from 'antd';
import {strToNode} from "../js/cascader.react";
import {getTheme, reindex} from "../js/utils.react"
import '../css/cascader.css'
import {BaseProp} from "./utils";

interface CascaderProp extends BaseProp {
    items: any[]
    index: any
}

const AntdColorPicker = (props: CascaderProp) => {
    //get data
    const {color, font, backgroundColor, size, primaryColor, textColor, theme} = getTheme(props);

    const items = strToNode(props.items)

    //state
    const [height, setHeight] = useState()

    // component height
    useEffect(() => Streamlit.setFrameHeight(height))

    //callback
    const onChange = (value: any) => {
        Streamlit.setComponentValue(value)
    }
    const dropdownVisible = (visible: boolean) => {
        let labelHeight = 0
        // @ts-ignore
        setHeight(visible ? 230 + labelHeight : undefined)
    }


    return (
        <Cascader
            options={items}
            onChange={onChange}
            onDropdownVisibleChange={dropdownVisible}
        />

    );
};

export default AntdColorPicker
