import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Rate, ConfigProvider} from 'antd';
import {AlphaColor, parseIcon} from "../utils.react"
import {StarFilled} from '@ant-design/icons';


interface RateProp {
    value: any
    count: any
    symbol: any
    align: string
    clear: boolean
    half: boolean
    readonly: boolean
    size: number
    color: any
    key: any
}

const AntdRate = (props: RateProp) => {
    //get data
    const value = props['value'];
    const count = props['count'];
    const symbol = parseIcon(props['symbol']);
    const align = props['align'];
    const clear = props['clear'];
    const half = props['half'];
    const readonly = props['readonly'];
    const size = props['size'];
    const color = props['color'];
    const key = props['key'];

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    const onChange = (value: number) => {
        Streamlit.setComponentValue(value)
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Rate: {
                        colorFillContent: AlphaColor('--text-color', 0.3),
                    },
                },
            }}
        >
            <div className={`d-flex justify-content-${align}`}>
                <Rate
                    key={key}
                    defaultValue={value}
                    count={count}
                    character={symbol !== null ? symbol : <StarFilled/>}
                    allowClear={clear}
                    allowHalf={half}
                    disabled={readonly}
                    style={{fontSize: size, color: color === null ? 'var(--primary-color)' : color}}
                    onChange={onChange}
                />
            </div>
        </ConfigProvider>
    );
};

export default AntdRate
