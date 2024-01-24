import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {ColorPicker, ConfigProvider} from 'antd';
import {getTheme} from "../js/utils.react"
import {BaseProp, LabelWrap} from "./utils";
import {Color} from "antd/es/color-picker";
import '../css/color_picker.css'


interface ColorPickerProp extends BaseProp {
    label: any
    description: any
}

const AntdColorPicker = (props: ColorPickerProp) => {
    //get data
    const {backgroundColor, size, primaryColor, textColor, theme} = getTheme(props);
    const label = props['label']
    const description = props['description']
    let labelHeight = label !== null ? 64 : 32
    //state
    const [height, setHeight] = useState(labelHeight)
    const [color, setColor] = useState(props.color);

    // component height
    useEffect(() => Streamlit.setFrameHeight(height))

    //callback
    const onChange = (value: Color, hex: string) => {
        setColor(value)
        Streamlit.setComponentValue(hex)
    }

    const openChange = (open: boolean) => {
        let labelHeight = label !== null ? 64 : 32
        setHeight(open ? 270 + labelHeight : labelHeight)
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    ColorPicker: {
                        ...theme,
                    }
                }
            }}>
            <LabelWrap
                label={label}
                desc={description}
                grow={true}
                children={
                    <ColorPicker
                        onChange={onChange}
                        value={color}
                        defaultValue={primaryColor}
                        // showText={label}
                        onOpenChange={openChange}
                    />}/></ConfigProvider>)
};

export default AntdColorPicker
