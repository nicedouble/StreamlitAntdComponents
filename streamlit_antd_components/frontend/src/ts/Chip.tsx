import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Chip, Group, Stack} from "@mantine/core";
import {AlphaColor, reindex, LabelComponent} from "../js/utils.react"
import strToNode from "../js/chip.react";


interface ChipProp {
    label: any
    items: any[]
    index: any
    position: 'top' | 'right' | 'bottom' | 'left'
    align: string
    direction: string
    radius: string
    size: string
    variant: string
    multiple: boolean
    key: string | undefined
}

const AntdChip = (props: ChipProp) => {
    //get data
    const items = strToNode(props['items'])
    const index = reindex(props['index'], true, props['multiple'])
    const label = props['label']
    const position = props['position']
    const align = props['align']
    const direction = props['direction']
    const radius = props['radius']
    const size = props['size']
    const variant = props['variant']
    const multiple = props['multiple']
    const key = props['key']

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    const Wrap = direction === 'vertical' ? Stack : Group

    //state
    const [value, setValue] = useState(index)

    //callback
    const onChange = (values: any) => {
        setValue(values)
        const stValue = Array.isArray(values) ? values.map((x: any) => Number(x)) : Number(values)
        Streamlit.setComponentValue(stValue)
    }

    return (
        <LabelComponent
            label={label}
            align={align}
            position={position}
            children={
                <Chip.Group
                    key={key}
                    onChange={onChange}
                    value={value}
                    multiple={multiple}
                >
                    <Wrap spacing={'sm'}>
                        {items.map((item: any, idx: any) =>
                            <Chip
                                key={idx}
                                value={item.value}
                                radius={radius}
                                size={size}
                                variant={variant}
                                disabled={item.disabled}
                                styles={(theme) => ({
                                    label: {
                                        color: 'var(--text-color)',
                                        borderColor:
                                            variant !== 'outline' ? 'transparent' : AlphaColor('--text-color', 0.2),
                                        backgroundColor:
                                            variant === 'outline' ? 'transparent' : AlphaColor('--text-color', 0.1),
                                        '&:hover': {
                                            backgroundColor: AlphaColor('--text-color', 0.05),
                                        },
                                        '&[data-checked]:not([data-disabled])': {
                                            color:
                                                variant === 'light' ? 'var(--primary-color)' :
                                                    variant === 'filled' ? '#fff' : 'var(--text-color)'
                                            ,
                                            backgroundColor:
                                                variant === 'light' ? AlphaColor('--primary-color', 0.2) :
                                                    variant === 'filled' ? 'var(--primary-color)' : 'transparent',
                                            borderColor:
                                                variant === 'outline' ? 'var(--primary-color)' : 'transparent',
                                        },
                                        '&[data-checked]:not([data-disabled]):hover': {
                                            backgroundColor:
                                                variant === 'light' ? AlphaColor('--primary-color', 0.2) :
                                                    variant === 'filled' ? 'var(--primary-color)' : 'transparent',
                                        },
                                    },
                                    checkIcon: {
                                        color:
                                            variant === 'filled' ? '#fff' : 'var(--primary-color)'
                                    }
                                })}
                            >
                                {item.label}
                            </Chip>)}
                    </Wrap>
                </Chip.Group>
            }
        />
    );
};

export default AntdChip
