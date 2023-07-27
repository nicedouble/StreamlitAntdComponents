import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Switch, ConfigProvider} from 'antd';
import {AlphaColor, parseIcon, positionMap} from "../utils.react"
import './switch.css'

interface SwitchProp {
    label: any;
    value: any;
    checked: any;
    unchecked: any;
    align: any;
    position: 'left' | 'right' | 'top' | 'bottom';
    size: 'small' | 'middle' | 'large';
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

    const labelElement = (x: string | null) => {
        if (x !== null) {
            let marginMap = {'top': 'mb-1', 'bottom': 'mt-1', 'left': 'mr-2', 'right': 'ml-2'}
            let styles = {color: 'var(--text-color)', fontSize: size === 'large' ? 16 : 14}
            return <div className={marginMap[position]} style={styles}>{label}</div>
        } else {
            return undefined
        }
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
            <div className={`d-flex justify-content-${align}`}>
                <div
                    className={`d-flex ${positionMap[position]} align-items-${['left', 'right'].indexOf(position) !== -1 ? 'center' : 'start'}`}>
                    {labelElement(label)}
                    <Switch
                        id={key}
                        checkedChildren={checked}
                        unCheckedChildren={unchecked}
                        defaultChecked={value}
                        disabled={disabled}
                        size={size !== 'small' ? 'default' : 'small'}
                        onClick={onClick}
                    />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default AntdSwitch
