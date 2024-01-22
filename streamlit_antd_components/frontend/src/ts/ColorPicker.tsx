import {Streamlit} from "streamlit-component-lib";
import React from "react";
import {Cascader} from 'antd';
import {getTheme} from "../js/utils.react"
import '../css/colorpicker.css'
import {BaseProp} from "./utils";
import {strToNode} from "../js/cascader.react";

interface ColorPickerProp extends BaseProp {
    items: any[]

}

const AntdColorPicker = (props: ColorPickerProp) => {
    //get data
    const {color, font, backgroundColor, size, primaryColor, textColor, theme} = getTheme(props);

    const items = strToNode(props.items)

    const onChange = (value: any) => {
        Streamlit.setComponentValue(value)
    }

    return (
        <Cascader
            options={items}
            onChange={onChange}
        />
    );
};

export default AntdColorPicker
