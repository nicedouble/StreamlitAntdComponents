import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {Steps, ConfigProvider} from 'antd';
import {GetColor, insertStyle, LightenColor, MartineFontSize} from "../js/utils.react";
import {strToNode} from "../js/steps.react";
import "../css/steps.css"

interface StepsProp {
    items: any[];
    index: number;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    color: any
    placement: any;
    direction: any;
    type: any;
    dot: boolean;
    return_index: boolean;
    kv: any;
    stValue: any
}

const AntdSteps = (props: StepsProp) => {
    //get data
    const items = strToNode(props['items'])
    const index = props['index']
    const size = props['size']
    const color = props['color']
    const placement = props['placement']
    const direction = props['direction']
    const type = props['type']
    const dot = props['dot']
    const return_index = props['return_index']
    const kv = props['kv']
    const primaryColor = GetColor(color == null ? '--primary-color' : color)
    const primaryLightColor = LightenColor(primaryColor)
    const textColor = GetColor('--text-color')

    const [current, setCurrent] = useState(index)

    // component height
    useEffect(() => {
        setTimeout(() => Streamlit.setFrameHeight(), 0.01)
    })

    const textStyle = `
    .ant-steps-item-title{
        font-size:${MartineFontSize[size]}px !important
    }
    `
    insertStyle(`sac.steps.title`, textStyle)

    //callback
    const onChange = (current: any) => {
        setCurrent(current)
        Streamlit.setComponentValue(return_index ? current : kv[current])
    }

    //listen index and stIndex
    const prevIndex = useRef(props['index'])
    const prevStValue = useRef(props['stValue'])
    useEffect(() => {
        const i = props['index']
        const st_i = props['stValue']
        if (i !== prevIndex.current && i !== null) {
            setCurrent(i);
            Streamlit.setComponentValue(return_index ? i : kv[i]);
            prevIndex.current = props['index']
        }
        if (st_i !== prevStValue.current) {
            setCurrent(st_i);
            Streamlit.setComponentValue(return_index ? st_i : kv[st_i]);
            prevStValue.current = props['stValue']
        }
    }, [props, kv, return_index])

    return (
        <ConfigProvider
            theme={{
                components: {
                    Steps: {
                        colorTextLabel: LightenColor(textColor, 0.2),
                        colorFillContent: LightenColor(textColor, 0.9),
                        colorSplit: LightenColor(textColor, 0.5),
                        navArrowColor: LightenColor(textColor, 0.5),
                        colorTextDescription: LightenColor(textColor, 0.5),
                        colorPrimary: primaryColor,
                        colorText: 'var(--text-color)',
                        controlItemBgActive: primaryLightColor,
                        customIconFontSize: MartineFontSize[size] + 14,
                        iconFontSize: MartineFontSize[size] - 2,
                        iconSize: MartineFontSize[size] + 16,
                        fontSize: MartineFontSize[size] - 2,
                        dotSize: MartineFontSize[size] - 8,
                        dotCurrentSize: MartineFontSize[size] - 6,
                        iconTop:0,
                    },
                },
            }}
        >
            <Steps
                items={items}
                current={current}
                direction={direction}
                labelPlacement={placement}
                type={type}
                progressDot={dot}
                onChange={onChange}
            />
        </ConfigProvider>
    );
};

export default AntdSteps
