import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {SegmentedControl} from '@mantine/core';
import {strToNode} from "../js/segmented.react";


interface SegmentedProp {
    items: any[];
    index: number;
    size: string;
    align: any;
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
    const size = props['size']
    const align = props['align']
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
        radius={'md'}
        orientation={direction}
        readOnly={readonly}
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
            },
        })}
    />

    if (grow) {
        return segmentedWrap
    } else {
        return <div className={`d-flex justify-content-${align}`}>
            {segmentedWrap}
        </div>
    }
};

export default AntdSegmented
