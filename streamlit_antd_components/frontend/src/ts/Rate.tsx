import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Rate, ConfigProvider} from 'antd';
import {parseIcon, GetColor, RgbaColor, LabelWrap, getSize} from "../js/utils.react"
import {StarFilled} from '@ant-design/icons';


interface RateProp {
    label: any
    description: any
    value: any
    count: any
    symbol: any
    align: string
    half: boolean
    size: any
    color: any
    stValue: any
}

const AntdRate = (props: RateProp) => {
    //get data
    const label = props['label'];
    const description = props['description'];
    const value = props['value'];
    const count = props['count'];
    const symbol = parseIcon(props['symbol']);
    const align = props['align'];
    const half = props['half'];
    const size = props['size'];
    const color = props['color'];
    const primaryColor = GetColor(color == null ? '--primary-color' : color)
    const textColor = GetColor('--text-color')

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
                        colorFillContent: RgbaColor(textColor, 0.2),
                    },
                },
            }}
        >
            <LabelWrap
                label={label}
                desc={description}
                align={align}
                size={size}
                children={
                    <Rate
                        defaultValue={value}
                        count={count}
                        character={symbol !== null ? symbol : <StarFilled/>}
                        allowHalf={half}
                        style={{fontSize: getSize(size)+4, color: primaryColor}}
                        onChange={onChange}
                    />
                }
            />
        </ConfigProvider>
    );
};

export default AntdRate
