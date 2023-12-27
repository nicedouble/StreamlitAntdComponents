import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {Tabs, ConfigProvider} from 'antd';
import {strToNode, TabsStyle} from "../js/tabs.react";
import {GetColor, LightenColor, MartineFontSize} from "../js/utils.react"
import '../css/tabs.css'

interface TabsProp {
    items: any[];
    index: string;
    align: string;
    position: any;
    shape: any;
    centered: boolean;
    height: number | null;
    grow: boolean;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color: any;
    return_index: boolean;
    kv: any;
    stValue: any
}

const AntdTabs = (props: TabsProp) => {
    //get data
    const items = strToNode(props['items'])
    const index = props['index']
    const align = props['align']
    const position = props['position']
    const shape = props['shape']
    const centered = props['centered']
    const height = props['height']
    const grow = props['grow']
    const size = props['size']
    const color = props['color']
    const return_index = props['return_index']
    const kv = props['kv']
    const primaryColor = GetColor(color == null ? '--primary-color' : color)
    const textColor = GetColor('--text-color')

    const [activeKey, setActiveKey] = useState(index)
    // load style
    TabsStyle(align, grow)

    //component height
    let tabsHeight = ['left', 'right'].includes(position) && height != null ? height : undefined

    // set component height
    useEffect(() => Streamlit.setFrameHeight(tabsHeight))

    //callback
    const onClick = (key: string) => {
        setActiveKey(key)
        Streamlit.setComponentValue(return_index ? key : kv[key])
    }

    //listen index and stIndex
    const prevIndex = useRef(props['index'])
    const prevStValue = useRef(props['stValue'])
    useEffect(() => {
        const i = props['index']
        const st_i = props['stValue']
        if (i !== prevIndex.current && i !== null) {
            setActiveKey(i);
            Streamlit.setComponentValue(return_index ? i : kv[i]);
            prevIndex.current = props['index']
        }
        if (st_i !== prevStValue.current) {
            setActiveKey(st_i);
            Streamlit.setComponentValue(return_index ? st_i : kv[st_i]);
            prevStValue.current = props['stValue']
        }
    }, [props, kv, return_index])

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tabs: {
                        itemActiveColor: primaryColor,
                        itemHoverColor: primaryColor,
                        itemSelectedColor: primaryColor,
                        inkBarColor: primaryColor,
                        colorBgContainer: LightenColor(primaryColor, 0.8),
                        colorText: 'var(--text-color)',
                        colorTextDisabled: LightenColor(textColor, 0.5),
                        colorPrimary: primaryColor,
                        colorBgContainerDisabled: 'transform',
                        fontSize: MartineFontSize[size],
                        fontFamily: 'var(--font)',
                        cardBg: LightenColor(textColor, 0.9),
                        cardGutter: 2,
                        horizontalItemGutter: 15,
                        horizontalMargin: '0',
                        colorBorderSecondary: 'transform',
                        cardHeight: MartineFontSize[size] + 25
                    },
                },
            }}
        >
            <Tabs
                items={items}
                defaultActiveKey={index}
                activeKey={activeKey}
                onTabClick={onClick}
                type={shape === 'default' ? 'line' : shape}
                tabPosition={position}
                centered={centered}
                style={{height: tabsHeight}}
            />
        </ConfigProvider>
    );
};

export default AntdTabs
