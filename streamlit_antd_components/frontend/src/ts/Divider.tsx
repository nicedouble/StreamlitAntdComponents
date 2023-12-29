import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Divider} from '@mantine/core';
import {RgbaColor, GetColor} from "../js/utils.react"

interface DividerProp {
    label: any
    color: any
    icon: any
    align: any
    size: any
    variant: any
    label_style: any
}

const AntdDivider = (props: DividerProp) => {
    //get data
    const label = props['label'];
    const icon = props['icon'];
    const color = props['color'];
    // @ts-ignore
    const align = {'start': 'left', 'center': 'center', 'end': 'right'}[props['align']]
    const size = props['size'];
    const variant = props['variant'];
    const textColor = GetColor('--text-color')
    let label_style = props['label_style'];

    // component height
    useEffect(() => Streamlit.setFrameHeight())
    //set color
    if (color == null) {
        if (label_style == null) {
            label_style = {"color": "var(--text-color) !important"}
        } else {
            if (label_style.hasOwnProperty('color') && label_style['color'].indexOf('important') < 0) {
                label_style['color'] = label_style['color'] + ' !important'
            }
            if(!label_style.hasOwnProperty('color')) {
                label_style['color'] = "var(--text-color) !important"
            }
        }
    } else {
        if (label_style != null) {
            if (label_style.hasOwnProperty('color') && label_style['color'].indexOf('important') < 0) {
                label_style['color'] = label_style['color'] + ' !important'
            }
        }
    }

    return (
        <Divider
            color={color == null ? RgbaColor(textColor) : color}
            label={icon ? <span><i className={`bi bi-${icon} mr-1`}/>{label}</span> : label}
            labelPosition={align}
            size={size}
            variant={variant}
            styles={(theme) => ({
                label: label_style,
            })}
        />
    );
};

export default AntdDivider
