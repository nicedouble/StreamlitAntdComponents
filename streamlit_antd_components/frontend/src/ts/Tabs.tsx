import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {ConfigProvider, Tabs} from 'antd';
import {strToNode} from "../js/tabs.react";
import {getSize, getTheme, insertStyle, RgbaColor} from "../js/utils.react"
import '../css/tabs.css'
import {BaseProp} from "./utils";

interface TabsProp extends BaseProp {
    items: any[];
    index: string;
    align: string;
    position: any;
    variant: any;
    height: number | null;
    use_container_width: boolean;
    return_index: boolean;
    kv: any;
    stValue: any
}

const AntdTabs = (props: TabsProp) => {
    //get data
    const {color, font, backgroundColor, size, primaryColor, textColor} = getTheme(props);

    const items = strToNode(props['items'], props['size'])
    const index = props['index']
    const align = props['align']
    const position = props['position']
    const variant = props['variant']
    const height = props['height']
    const grow = props['use_container_width']
    const return_index = props['return_index']
    const kv = props['kv']
    const borderColor = RgbaColor(textColor, 0.1)

    const [activeKey, setActiveKey] = useState(index)

    // load style
    let style = `
        .ant-tabs-nav-wrap{
            justify-content: ${align};
        }
        .ant-tabs-nav:before {
            border-bottom: ${variant === 'default' ? 2 : 1}px solid ${borderColor} !important;
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
            border-radius: ${position === 'top' ? '8px 8px 0 0' :
        position === 'bottom' ? '0 0 8px 8px' :
            position === 'left' ? '8px 0 0 8px' :
                position === 'right' ? '0 8px 8px 0' : '8px'} !important
        }
        .ant-tabs-card .ant-tabs-tab-active{
            border-width: 1px;
            border-style: solid;
            border-color: ${position === 'top' ? `${borderColor} ${borderColor} ${backgroundColor} ${borderColor}` :
        position === 'bottom' ? `${backgroundColor} ${borderColor} ${borderColor} ${borderColor}` :
            position === 'left' ? `${borderColor} ${backgroundColor} ${borderColor} ${borderColor}` :
                position === 'right' ? `${borderColor} ${borderColor} ${borderColor} ${backgroundColor}` : ''} !important
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
    insertStyle('sac.tabs.style', grow ? style + growStyle : style)

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
                        colorBgContainer: backgroundColor,
                        colorText: 'var(--text-color)',
                        colorTextDisabled: RgbaColor(textColor, 0.5),
                        colorPrimary: primaryColor,
                        colorBgContainerDisabled: 'transform',
                        fontSize: getSize(size),
                        fontFamily: 'var(--font)',
                        cardBg: 'transparent',
                        cardGutter: variant === 'outline' ? 0 : 2,
                        cardHeight: getSize(size) + 25,
                        colorBorderSecondary: 'transparent',
                    },
                },
            }}
        >
            <Tabs
                items={items}
                defaultActiveKey={index}
                activeKey={activeKey}
                onTabClick={onClick}
                type={variant === 'default' ? 'line' : 'card'}
                tabPosition={position}
                style={{height: tabsHeight}}
            />
        </ConfigProvider>
    );
};

export default AntdTabs
