import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {Tabs, ConfigProvider} from 'antd';
import {strToNode} from "../js/tabs.react";
import {GetColor, RgbaColor, MartineFontSize, insertStyle} from "../js/utils.react"
import '../css/tabs.css'

interface TabsProp {
    items: any[];
    index: string;
    align: string;
    position: any;
    variant: any;
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
    const variant = props['variant']
    const centered = props['centered']
    const height = props['height']
    const grow = props['grow']
    const size = props['size']
    const color = props['color']
    const return_index = props['return_index']
    const kv = props['kv']
    const primaryColor = GetColor(color == null ? '--primary-color' : color)
    const textColor = GetColor('--text-color')
    const borderColor = RgbaColor(textColor, 0.1)
    const bgColor = GetColor('--background-color')

    const [activeKey, setActiveKey] = useState(index)

    // load style
    let style = `
        .ant-tabs-nav-wrap{
            justify-content: ${align};
        }
        .ant-tabs-nav:before {
            border-bottom: ${variant === 'subtle' ? 2 : variant === 'outline' ? 1 : 0}px solid ${borderColor} !important;
        }
        .ant-tabs-right > .ant-tabs-content-holder {
            margin-right: -2px;
            border-right: 2px solid ${borderColor};
        }
        .ant-tabs-left > .ant-tabs-content-holder {
            margin-left: -2px;
            border-left: 2px solid ${borderColor};
        }
        .ant-tabs-card .ant-tabs-tab{
            border-width: 1px;
            border-style: solid;
            border-color: ${variant === 'filled' ? bgColor : `${bgColor} ${bgColor} ${borderColor} ${bgColor}`} !important;
            border-radius: ${variant === 'filled' ? '8px' : '8px 8px 0 0'} !important
        }
        .ant-tabs-card .ant-tabs-tab-active{
            border-width: 1px;
            border-style: solid;
            border-color: ${variant === 'filled' ? bgColor : `${borderColor} ${borderColor} ${bgColor} ${borderColor}`} !important
        }
        `
    let growStyle = `
        .ant-tabs-tab{
            flex-grow: 1;
        }
        .ant-tabs-nav-list{
            flex-grow: 1;
        }
    `
    insertStyle('tabs-style', grow ? style + growStyle : style)

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
                        itemSelectedColor: variant === 'filled' ? '#fff' : primaryColor,
                        inkBarColor: primaryColor,
                        colorBgContainer: variant === 'filled' ? primaryColor : bgColor,
                        colorText: 'var(--text-color)',
                        colorTextDisabled: RgbaColor(textColor, 0.5),
                        colorPrimary: primaryColor,
                        colorBgContainerDisabled: 'transform',
                        fontSize: MartineFontSize[size],
                        fontFamily: 'var(--font)',
                        cardBg: variant === 'filled' ? RgbaColor(textColor, 0.1) : bgColor,
                        cardGutter: variant === 'outline' ? 0 : 2,
                        horizontalItemGutter: 15,
                        horizontalMargin: '0',
                        cardHeight: MartineFontSize[size] + 25,
                    },
                },
            }}
        >
            <Tabs
                items={items}
                defaultActiveKey={index}
                activeKey={activeKey}
                onTabClick={onClick}
                type={variant === 'subtle' ? 'line' : 'card'}
                tabPosition={position}
                centered={centered}
                style={{height: tabsHeight}}
            />
        </ConfigProvider>
    );
};

export default AntdTabs
