import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Segmented, ConfigProvider} from 'antd';
import {AlphaColor} from "../utils.react";
import {strToNode} from "./segmented.react";
import "./segmented.css"

interface SegmentedProp {
    items: any[];
    index: number | string;
    size: "large" | "middle" | "small";
    disabled: boolean;
    use_container_width: boolean;
    key: string | undefined;
}

const AntdSegmented = (props: SegmentedProp) => {
    //get data
    const items = strToNode(props['items'])
    const index = props['index']
    const size = props['size']
    const disabled = props['disabled']
    const use_container_width = props['use_container_width']
    const key = props['key']


    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    const onChange = (idx: any) => {
        Streamlit.setComponentValue(idx)
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Segmented: {
                        colorBgElevated: 'var(--primary-color)',
                        colorBgLayout: 'var(--secondary-background-color)',
                        colorText: '#fff',
                        colorTextLabel: 'var(--text-color)',
                        colorTextDisabled:AlphaColor('--text-color',0.2),
                        colorFill: 'transform',
                        colorFillSecondary: AlphaColor('--text-color',0.2),
                    },
                },
            }}
        >
            <Segmented
                key={key}
                options={items}
                defaultValue={index}
                disabled={disabled}
                size={size}
                block={use_container_width}
                onChange={onChange}
            >
            </Segmented>
        </ConfigProvider>
    );
};

export default AntdSegmented
