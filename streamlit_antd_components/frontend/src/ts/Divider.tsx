import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Divider} from '@mantine/core';
import {RgbaColor, GetColor, markdown, getSize} from "../js/utils.react"

interface DividerProp {
    label: any
    color: any
    icon: any
    align: any
    size: any
    label_size: any
    variant: any
}

const AntdDivider = (props: DividerProp) => {
    //get data
    const label = props['label'];
    const icon = props['icon'];
    const color = props['color'];
    // @ts-ignore
    const align = {'start': 'left', 'center': 'center', 'end': 'right'}[props['align']]
    const size = props['size'];
    const label_size = props['label_size'];
    const variant = props['variant'];
    const textColor = GetColor('--text-color')

    // component height
    useEffect(() => Streamlit.setFrameHeight())
    // //set color
    // if (color == null) {
    //     if (label_style == null) {
    //         label_style = {"color": "var(--text-color) !important"}
    //     } else {
    //         if (label_style.hasOwnProperty('color') && label_style['color'].indexOf('important') < 0) {
    //             label_style['color'] = label_style['color'] + ' !important'
    //         }
    //         if(!label_style.hasOwnProperty('color')) {
    //             label_style['color'] = "var(--text-color) !important"
    //         }
    //     }
    // } else {
    //     if (label_style != null) {
    //         if (label_style.hasOwnProperty('color') && label_style['color'].indexOf('important') < 0) {
    //             label_style['color'] = label_style['color'] + ' !important'
    //         }
    //     }
    // }

    return (
        <Divider
            color={color == null ? RgbaColor(textColor) : color}
            label={icon ? <span className={'d-flex align-items-center'}><i className={`bi bi-${icon} mr-1`}/>{markdown(label)}</span> : markdown(label)}
            labelPosition={align}
            size={size}
            variant={variant}
            styles={(theme) => ({
                label: {
                    fontSize:getSize(label_size)
                }
            })}
        />
    );
};

export default AntdDivider
