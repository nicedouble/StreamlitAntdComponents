import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {Steps, ConfigProvider} from 'antd';
import {GetColor, insertStyle, RgbaColor, MartineFontSize} from "../js/utils.react";
import {strToNode} from "../js/steps.react";
import "../css/steps.css"

interface StepsProp {
    items: any[];
    index: number;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    color: any
    placement: any;
    direction: any;
    variant: any;
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
    const variant = props['variant']
    const dot = props['dot']
    const return_index = props['return_index']
    const kv = props['kv']
    const primaryColor = GetColor(color == null ? '--primary-color' : color)
    const primaryLightColor = RgbaColor(primaryColor)
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
    .ant-steps-item-custom .ant-steps-item-icon .ant-steps-icon{
        color:${RgbaColor(textColor,0.5)} !important
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
                        colorTextLabel: RgbaColor(textColor, 0.5),
                        colorFillContent: RgbaColor(textColor, 0.1),
                        colorSplit: RgbaColor(textColor, 0.5),
                        navArrowColor: RgbaColor(textColor, 0.5),
                        colorTextDescription: RgbaColor(textColor, 0.5),
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
                        colorIconHover:'red'
                    },
                },
            }}
        >
            <Steps
                items={items}
                current={current}
                direction={direction}
                labelPlacement={placement}
                type={variant}
                progressDot={dot}
                onChange={onChange}
            />
        </ConfigProvider>
    );
};

export default AntdSteps
