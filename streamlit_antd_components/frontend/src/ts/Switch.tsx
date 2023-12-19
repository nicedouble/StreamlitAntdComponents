import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {Switch} from '@mantine/core';
import {AlphaColor, parseIcon, MartineFontSize, reindex} from "../js/utils.react"

interface SwitchProp {
    label: any;
    value: any;
    description: any;
    on_label: any;
    off_label: any;
    align: any
    position: 'left' | 'right';
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    on_color: any
    off_color: any
    radius: any
    disabled: any;
    key: string | undefined;
    stValue: any
}

const AntdSwitch = (props: SwitchProp) => {
    //get data
    const label = props['label']
    const value = props['value']
    const description = props['description']
    const onLabel = parseIcon(props['on_label'])
    const offLabel = parseIcon(props['off_label'])
    const align = props['align']
    const position = props['position']
    const size = props['size']
    const onColor = props['on_color']
    const offColor = props['off_color']
    const radius = props['radius']
    const disabled = props['disabled']
    const key = props['key']

    const [checked, setChecked] = useState(value)

    // set component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    const onChange = (event: any) => {
        const v = event.currentTarget.checked;
        setChecked(v)
        Streamlit.setComponentValue(v)
    }

    //listen index
    const prevStValue = useRef(props['stValue'])
    useEffect(() => {
        const st_i = props['stValue']
        if (String(st_i) !== String(prevStValue.current)) {
            setChecked(st_i);
            prevStValue.current = props['stValue']
        }
    }, [props])

    return (
        <div className={`d-flex justify-content-${align}`}>
            <Switch
                id={key}
                label={label}
                color={onColor}
                description={description}
                labelPosition={position}
                onLabel={onLabel}
                offLabel={offLabel}
                disabled={disabled}
                size={size}
                checked={checked}
                onChange={onChange}
                radius={radius}
                styles={(theme) => ({
                    label: {
                        color: 'var(--text-color)',
                        marginBottom: 0,
                    },
                    description: {
                        color: AlphaColor('--text-color', 0.5)
                    },
                    trackLabel: {
                        fontSize: MartineFontSize[size] - 2,
                        color: '#fff'
                    },
                    track: {
                        cursor: 'pointer',
                        'input:checked+&': onColor == null && !disabled ? {
                            backgroundColor: 'var(--primary-color)',
                            borderColor: 'var(--primary-color)',
                        } : Object.keys(theme.colors).indexOf(onColor) < 0 && !disabled ? {
                            backgroundColor: onColor,
                            borderColor: onColor,
                        } : {},
                        backgroundColor: offColor == null ?
                            theme.colors.dark[1] : Object.keys(theme.colors).indexOf(offColor) > 0 ?
                                theme.colors[offColor][6] : offColor,
                        borderColor: offColor == null ?
                            theme.colors.dark[1] : Object.keys(theme.colors).indexOf(offColor) > 0 ?
                                theme.colors[offColor][6] : offColor,
                    }
                })}
            />
        </div>
    );
};

export default AntdSwitch
