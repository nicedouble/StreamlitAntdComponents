import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Switch, ConfigProvider} from 'antd';
import {AlphaColor, parseIcon, LabelComponent} from "../js/utils.react"
import '../css/switch.css'

interface SwitchProp {
    label: any;
    value: any;
    checked: any;
    unchecked: any;
    align: any;
    position: 'left' | 'right' | 'top' | 'bottom';
    size: any
    disabled: any;
    help: any;
    key: string | undefined;
}

const AntdSwitch = (props: SwitchProp) => {
    //get data
    const label = props['label']
    const value = props['value']
    const checked = parseIcon(props['checked'])
    const unchecked = parseIcon(props['unchecked'])
    const align = props['align']
    const position = props['position']
    const size = props['size']
    const disabled = props['disabled']
    const key = props['key']

    // set component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    const onClick = (checked: any, event: any) => {
        Streamlit.setComponentValue(checked)
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Switch: {
                        colorPrimary: 'var(--primary-color)',
                        colorPrimaryHover: 'var(--primary-color)',
                        colorTextQuaternary: AlphaColor('--text-color', 0.4),
                        colorTextTertiary: AlphaColor('--text-color', 0.5),
                        lineHeight: size === 'large' ? 2 : 1.57
                    },
                },
            }}
        >
            <LabelComponent
                label={label}
                align={align}
                position={position}
                size={size}
                children={<Switch
                    id={key}
                    checkedChildren={checked}
                    unCheckedChildren={unchecked}
                    defaultChecked={value}
                    disabled={disabled}
                    size={size !== 'small' ? 'default' : 'small'}
                    onClick={onClick}
                />}
            />
        </ConfigProvider>
    );
};

export default AntdSwitch
