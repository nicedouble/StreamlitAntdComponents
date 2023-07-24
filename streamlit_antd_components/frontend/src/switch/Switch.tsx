import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Switch, ConfigProvider} from 'antd';
import {parseIcon} from "./switch.react";
import {AlphaColor} from "../utils.react"
import './switch.css'

interface SwitchProp {
    label: any;
    value: any;
    checked: any;
    unchecked: any;
    align: any;
    position: any;
    size: any;
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

    const toStyle = (x: string, bs: Boolean = true) => {
        switch (x) {
            case 'left':
                return bs ? 'flex-row' : 'mr-2'
            case 'right':
                return bs ? 'flex-row-reverse' : 'ml-2'
            case 'top':
                return bs ? 'flex-column' : 'mb-2'
            case 'bottom':
                return bs ? 'flex-column-reverse' : 'mt-2'
        }
    }
    // set component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    const onClick = (checked: any, event: any) => {
        Streamlit.setComponentValue(checked)
    }

    const labelElement = (x: string | null) => {
        if (x !== null) {
            let styles = {color: 'var(--text-color)', fontSize: 14}
            return <div className={toStyle(position, false)} style={styles}>{label}</div>
        } else {
            return undefined
        }
    }
    const switchElement = () => {
        return <div className={`d-flex justify-content-${align}`}>
            <div className={`d-flex ${toStyle(position)} align-items-start`}>
                {labelElement(label)}
                <Switch
                    id={key}
                    checkedChildren={checked}
                    unCheckedChildren={unchecked}
                    defaultChecked={value}
                    disabled={disabled}
                    size={size}
                    onClick={onClick}
                />
            </div>
        </div>
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    //custom theme
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
            {switchElement()}
        </ConfigProvider>
    );
};

export default AntdSwitch
