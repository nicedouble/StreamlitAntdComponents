import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {Rate, ConfigProvider} from 'antd';
import {parseIcon, GetColor, RgbaColor, LabelWrap, MartineFontSize} from "../js/utils.react"
import {StarFilled} from '@ant-design/icons';


interface RateProp {
    label: any
    description: any
    value: any
    count: any
    symbol: any
    align: string
    clear: boolean
    half: boolean
    readonly: boolean
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
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
    const clear = props['clear'];
    const half = props['half'];
    const readonly = props['readonly'];
    const size = props['size'];
    const color = props['color'];
    const primaryColor = GetColor(color == null ? '--primary-color' : color)
    const textColor = GetColor('--text-color')

    const [v, setV] = useState(value)
    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    const onChange = (value: number) => {
        Streamlit.setComponentValue(value)
    }

    //listen index
    const prevStValue = useRef(props['stValue'])
    useEffect(() => {
        const st_i = props['stValue']
        if (String(st_i) !== String(prevStValue.current)) {
            setV(st_i);
            prevStValue.current = props['stValue']
        }
    }, [props])

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
                        value={v}
                        count={count}
                        character={symbol !== null ? symbol : <StarFilled/>}
                        allowClear={clear}
                        allowHalf={half}
                        disabled={readonly}
                        style={{fontSize: MartineFontSize[size]+4, color: primaryColor}}
                        onChange={onChange}
                    />
                }
            />
        </ConfigProvider>
    );
};

export default AntdRate
