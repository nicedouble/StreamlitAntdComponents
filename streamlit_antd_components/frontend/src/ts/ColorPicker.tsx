import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {ColorPicker} from 'antd';
import {getTheme} from "../js/utils.react"
import {BaseProp} from "./utils";
import {Color} from "antd/es/color-picker";
import '../css/color_picker.css'


interface ColorPickerProp extends BaseProp {
}

const AntdColorPicker = (props: ColorPickerProp) => {
    //get data
    const {backgroundColor, size, primaryColor, textColor, theme} = getTheme(props);


    //state
    const [color, setColor] = useState(props.color);
    const [height, setHeight] = useState()

    // component height
    useEffect(() => Streamlit.setFrameHeight(400))
    // component height

    //callback
    const onChange = (value: Color, hex: string) => {
        setColor(value)
        Streamlit.setComponentValue(hex)
    }


    return (
        <ColorPicker
            onChange={onChange}
            value={color}
            defaultValue={primaryColor}
        />

    );
};

export default AntdColorPicker
