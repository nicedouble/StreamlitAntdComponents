import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {SegmentedControl} from '@mantine/core';
import {strToNode} from "../js/segmented.react";
import {LabelComponent} from "../js/utils.react"
import "../css/segmented.css"

interface SegmentedProp {
    items: any[];
    index: number;
    label: string;
    radius: string;
    size: string;
    align: any;
    position: any;
    direction: any;
    disabled: boolean;
    grow: boolean;
    readonly: boolean;
    key: string | undefined;
}


const AntdSegmented = (props: SegmentedProp) => {
    //get data
    const items = strToNode(props['items'])
    const index = String(props['index'])
    const label = props['label']
    const radius = props['radius']
    const size = props['size']
    const align = props['align']
    const position = props['position']
    const direction = props['direction']
    const disabled = props['disabled']
    const grow = props['grow']
    const readonly = props['readonly']
    const key = props['key']

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    const [value, setValue] = useState(index)

    //callback
    const onChange = (value: string) => {
        setValue(value)
        Streamlit.setComponentValue(Number(value))
    }

    const segmentedWrap = <SegmentedControl
        data={items}
        defaultValue={index}
        onChange={onChange}
        value={value}
        fullWidth={grow}
        disabled={disabled}
        size={size}
        key={key}
        radius={radius}
        orientation={direction}
        readOnly={readonly}
        className={'d-flex flex-wrap'}
        styles={(theme) => ({
            root: {
                backgroundColor: 'var(--secondary-background-color)',
            },
            label: {
                color: 'var(--text-color)',
                marginBottom: 0,
                '&:hover': {
                    color: 'var(--text-color)'
                },
                '&[data-active]': {
                    color: '#fff'
                },
                '&[data-active]:hover': {
                    color: '#fff'
                },
            },
            indicator: {
                backgroundColor: 'var(--primary-color)',
            }
        })}
    />

    if (grow) {
        return segmentedWrap
    } else {
        return <LabelComponent
            label={label}
            align={align}
            position={position}
            children={segmentedWrap}
        />
    }
};

export default AntdSegmented
