import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {SegmentedControl} from '@mantine/core';
import {strToNode} from "../js/segmented.react";
import {getTheme} from "../js/utils.react"
import "../css/segmented.css"
import {BaseProp, LabelWrap} from "./utils";

interface SegmentedProp extends BaseProp {
    items: any[];
    index: number;
    label: string;
    description: string;
    radius: any;
    align: any;
    direction: any;
    disabled: boolean;
    divider: boolean;
    use_container_width: boolean;
    readonly: boolean;
    return_index: boolean;
    kv: any;
    stValue: any
}


const AntdSegmented = (props: SegmentedProp) => {
    //get data
    const {color, font, backgroundColor, size, primaryColor, textColor, theme} = getTheme(props);

    const items = strToNode(props['items'])
    const index = String(props['index'])
    const label = props['label']
    const description = props['description']
    const radius = props['radius']
    const align = props['align']
    const direction = props['direction']
    const disabled = props['disabled']
    const divider = props['divider']
    const grow = props['use_container_width']
    const readonly = props['readonly']
    const return_index = props['return_index']
    const kv = props['kv']


    // component height
    useEffect(() => Streamlit.setFrameHeight())

    const [value, setValue] = useState(index)

    //callback
    const onChange = (value: string) => {
        setValue(value)
        Streamlit.setComponentValue(return_index ? Number(value) : kv[Number(value)])
    }

    //listen index and stIndex
    const prevIndex = useRef(props['index'])
    const prevStValue = useRef(props['stValue'])
    useEffect(() => {
        const i = props['index']
        const st_i = props['stValue']
        if (i !== prevIndex.current && i !== null) {
            setValue(String(i));
            Streamlit.setComponentValue(return_index ? Number(i) : kv[Number(i)]);
            prevIndex.current = props['index']
        }
        if (st_i !== prevStValue.current) {
            setValue(String(st_i));
            Streamlit.setComponentValue(return_index ? Number(st_i) : kv[Number(st_i)]);
            prevStValue.current = props['stValue']
        }
    }, [props, kv, return_index])

    return <LabelWrap
        label={label}
        desc={description}
        size={size}
        align={align}
        grow={grow}
        children={
            <SegmentedControl
                color={color}
                data={items}
                defaultValue={index}
                onChange={onChange}
                value={value}
                fullWidth={grow}
                disabled={disabled}
                size={typeof (size) == 'number' ? 'md' : size}
                radius={radius}
                orientation={direction}
                readOnly={readonly}
                className={'d-flex flex-wrap'}
                styles={(theme) => ({
                    root: {
                        backgroundColor: backgroundColor == null ? 'var(--secondary-background-color)' :
                            Object.keys(theme.colors).indexOf(backgroundColor) !== -1 ? theme.colors[backgroundColor][1] : backgroundColor,
                    },
                    label: {
                        fontSize: typeof (size) == 'number' ? size : undefined,
                        display: "flex", alignItems: 'center', justifyContent: 'center',
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
                        backgroundColor: primaryColor,
                    },
                    control: {
                        '&:not(:first-of-type)': {
                            borderStyle: divider ? "solid" : 'none'
                        }
                    }
                })}
            />
        }
    />
};

export default AntdSegmented
