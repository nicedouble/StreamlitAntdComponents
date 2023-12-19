import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {Tabs, ConfigProvider} from 'antd';
import {strToNode, TabsStyle} from "../js/tabs.react";
import {AlphaColor} from "../js/utils.react"
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
    const return_index = props['return_index']
    const kv = props['kv']

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
            prevStValue.current = props['stValue']
        }
    }, [props, kv, return_index])

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tabs: {
                        itemActiveColor: 'var(--primary-color)',
                        itemHoverColor: 'var(--primary-color)',
                        itemSelectedColor: 'var(--primary-color)',
                        inkBarColor: 'var(--primary-color)',
                        colorBgContainer: AlphaColor('--primary-color', 0.2),
                        colorText: 'var(--text-color)',
                        colorTextDisabled: AlphaColor('--text-color', 0.5),
                        colorPrimary: 'var(--primary-color)',
                        colorBgContainerDisabled: 'transform',
                        fontSize: 14,
                        fontFamily: 'var(--font)',
                        cardBg: AlphaColor('--text-color', 0.1),
                        cardGutter: 2,
                        horizontalItemGutter: 15,
                        horizontalMargin: '0',
                        colorBorderSecondary: 'transform',
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
