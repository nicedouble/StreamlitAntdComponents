import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Switch, ConfigProvider} from 'antd';
import {parseIcon} from "./switch.react";
import {AlphaColor} from "../utils.react"
import './switch.css'

interface SwitchProp {
    value: any;
    checked: any;
    unchecked: any;
    size: any;
    disabled: any;
    key: string | undefined;
}

const AntdSwitch = (props: SwitchProp) => {
    //get data
    const value = props['value']
    const checked = parseIcon(props['checked'])
    const unchecked = parseIcon(props['unchecked'])
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
                    //custom theme
                    Switch: {
                        colorPrimary: 'var(--primary-color)',
                        colorPrimaryHover: 'var(--primary-color)',
                        colorTextQuaternary: AlphaColor('--text-color', 0.5),
                        colorTextTertiary: AlphaColor('--text-color', 0.5),
                        lineHeight: size === 'large' ? 2 : 1.57
                    },
                },
            }}
        >
            <Switch
                id={key}
                checkedChildren={checked}
                unCheckedChildren={unchecked}
                defaultChecked={value}
                disabled={disabled}
                size={size}
                onClick={onClick}
            />
        </ConfigProvider>
    );
};

export default AntdSwitch
