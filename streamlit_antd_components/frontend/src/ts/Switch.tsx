import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {Switch} from '@mantine/core';
import {GetColor, getSize, getTheme, markdown, parseIcon, RgbaColor} from "../js/utils.react"
import {BaseProp} from "./utils";

interface SwitchProp extends BaseProp {
    label: any;
    value: any;
    description: any;
    on_label: any;
    off_label: any;
    align: any
    position: 'left' | 'right';
    size: any
    on_color: any
    off_color: any
    radius: any
    disabled: any;
    key: string | undefined;
    stValue: any
}

const AntdSwitch = (props: SwitchProp) => {
    //get data
    const {color, font, backgroundColor, size, primaryColor, textColor, theme} = getTheme(props);

    const label = props['label']
    const value = props['value']
    const description = props['description']
    const onLabel = parseIcon(props['on_label'])
    const offLabel = parseIcon(props['off_label'])
    const align = props['align']
    const position = props['position']
    const onColor = props['on_color']
    const offColor = props['off_color']
    const radius = props['radius']
    const disabled = props['disabled']
    const key = props['key']
    const secondaryBgColor = GetColor(offColor == null ? RgbaColor(textColor) : offColor)

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
                label={markdown(label)}
                color={onColor}
                description={markdown(description)}
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
                        color: RgbaColor(textColor, 0.5)
                    },
                    trackLabel: {
                        fontSize: getSize(size) - 2,
                        color: '#fff',
                    },
                    track: {
                        cursor: 'pointer',
                        'input:checked+&': !disabled ? {
                            backgroundColor: primaryColor,
                            borderColor: primaryColor,
                        } : {},
                        backgroundColor: secondaryBgColor,
                        borderColor: 'transparent',
                    }
                })}
            />
        </div>
    );
};

export default AntdSwitch
