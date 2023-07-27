import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Steps, ConfigProvider} from 'antd';
import {AlphaColor} from "../utils.react";
import {strToNode} from "./steps.react";
import "./steps.css"

interface StepsProp {
    items: any[];
    index: number;
    size: "default" | "small";
    placement: any;
    direction: any;
    type: any;
    dot: boolean;
    key: string | undefined;
}

const AntdSteps = (props: StepsProp) => {
    //get data
    const items = strToNode(props['items'])
    const index = props['index']
    const size = props['size']
    const placement = props['placement']
    const direction = props['direction']
    const type = props['type']
    const dot = props['dot']
    const key = props['key']

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    const [current, setCurrent] = useState(index)

    //callback
    const onChange = (current: any) => {
        setCurrent(current)
        Streamlit.setComponentValue(current)
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Steps: {
                        colorFillContent: AlphaColor('--text-color', 0.1),
                        colorPrimary: 'var(--primary-color)',
                        colorText: 'var(--text-color)',
                        colorTextLabel: AlphaColor('--text-color', 0.5),
                        colorTextDescription: AlphaColor('--text-color', 0.5),
                        colorTextDisabled: AlphaColor('--text-color', 0.2),
                        controlItemBgActive: AlphaColor(),
                        colorSplit: AlphaColor('--text-color', 0.2),
                        navArrowColor:AlphaColor('--text-color', 0.5),
                    },
                },
            }}
        >
            <Steps
                key={key}
                items={items}
                current={current}
                direction={direction}
                labelPlacement={placement}
                size={size}
                type={type}
                progressDot={dot}
                onChange={onChange}
            />
        </ConfigProvider>
    );
};

export default AntdSteps
