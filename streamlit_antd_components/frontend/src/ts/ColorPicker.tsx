import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {ColorPicker, ConfigProvider} from 'antd';
import {getTheme, RgbaColor} from "../js/utils.react"
// import '../css/colorPicker.css'
import {BaseProp, LabelWrap} from "./utils";

interface ColorPickerProp extends BaseProp {
    label: any
    description: any
    align: string

}

const AntdColorPicker = (props: ColorPickerProp) => {
    //get data
    const {color, font, backgroundColor, size, primaryColor, textColor, theme} = getTheme(props);

    const label = props['label'];
    const description = props['description'];
    const align = props['align'];
    const sizeMap: any = {'xs': 12, 'sm': 16, 'md': 20, 'lg': 30, 'xl': 50}

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    const onChange = (value: any, hex: string) =>{
        Streamlit.setComponentValue(value)
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    ColorPicker: {
                        ...theme,
                        colorFillContent: RgbaColor(textColor, 0.2),
                    },
                },
            }}
        >
            <LabelWrap
                label={label}
                desc={description}
                align={align}
                size={size}
                children={
                    <ColorPicker
                        defaultValue={primaryColor}
                        style={{fontSize: typeof (size) == 'string' ? sizeMap[size] : size, color: primaryColor}}
                        onChange={onChange}
                    />
                }
            />
        </ConfigProvider>
    );
};

export default AntdColorPicker
