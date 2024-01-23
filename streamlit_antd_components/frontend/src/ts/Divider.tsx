import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Divider} from '@mantine/core';
import {getTheme, markdown, RgbaColor} from "../js/utils.react"
import {BaseProp, CustomIcon} from "./utils";
import {ConfigProvider} from "antd";

interface DividerProp extends BaseProp {
    label: any
    icon: any
    align: any
    variant: any
}

const AntdDivider = (props: DividerProp) => {
    //get data
    const label = props['label'];
    const icon = props['icon'];
    // @ts-ignore
    const align = {'start': 'left', 'center': 'center', 'end': 'right'}[props['align']]
    const variant = props['variant'];
    const {color, font, backgroundColor, size, primaryColor, textColor, theme} = getTheme(props);

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    return (
        <ConfigProvider
            theme={{
                components: {
                    Divider: {
                        ...theme,
                    },
                },
            }}
        >
            <Divider
                color={color == null ? RgbaColor(textColor) : color}
                label={icon ?
                    <span className={'d-flex align-items-center'}>
                    <CustomIcon icon={icon} style={{marginRight: 5}}/>{markdown(label)}
                </span> : markdown(label)}
                labelPosition={align}
                size={size}
                variant={variant}
            />
        </ConfigProvider>

    );
};

export default AntdDivider
