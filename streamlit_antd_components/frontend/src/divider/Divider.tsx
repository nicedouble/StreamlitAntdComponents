import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Divider, ConfigProvider} from 'antd';
import {AlphaColor} from "../utils.react"
import './divider.css'

interface DividerProp {
    label: any
    icon: any
    align: any
    direction: any
    dashed: boolean
}

const AntdDivider = (props: DividerProp) => {
    //get data
    const label = props['label'];
    const icon = props['icon'];
    const align = props['align'];
    const direction = props['direction'];
    const dashed = props['dashed'];

    // component height
    useEffect(() => Streamlit.setFrameHeight(60))

    // antd divider component
    return (
        <ConfigProvider
            theme={{
                components: {
                    //custom tree theme
                    Divider: {
                        colorSplit: AlphaColor('--text-color', 0.2),
                        colorText: 'var(--text-color)',
                        colorTextHeading: 'var(--text-color)'
                    },
                },
            }}
        >
            <Divider
                children={icon ? <span><i className={`bi bi-${icon} mx-1`}/>{label}</span> : label}
                dashed={dashed}
                type={direction}
                orientation={align}
            />
        </ConfigProvider>
    );
};

export default AntdDivider
