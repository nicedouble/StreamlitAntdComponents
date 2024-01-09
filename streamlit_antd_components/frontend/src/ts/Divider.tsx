import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Divider} from '@mantine/core';
import {RgbaColor, GetColor, markdown} from "../js/utils.react"
import {CustomIcon} from "./utils";

interface DividerProp {
    label: any
    color: any
    icon: any
    align: any
    size: any
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
    const variant = props['variant'];
    const textColor = GetColor('--text-color')

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    return (
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
    );
};

export default AntdDivider
