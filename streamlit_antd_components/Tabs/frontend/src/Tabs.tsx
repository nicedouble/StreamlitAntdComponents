import {Streamlit, ComponentProps, withStreamlitConnection} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Tabs, ConfigProvider} from 'antd';
import {strToNode, AlphaColor, loadStyles} from "./custom.react";
import './custom.css'

const AntdTabs = (props: ComponentProps) => {
    //get data
    const items = props.args['items']
    const index = props.args['index']
    const align = props.args['align']
    const tabPosition = props.args['tabPosition']
    const shape = props.args['shape']
    const centered = props.args['centered']
    const height = props.args['height']
    const grow = props.args['grow']

    // load style
    align === 'start' && loadStyles("alignStart.css", "as");
    align === 'center' && loadStyles("alignCenter.css", "ac");
    align === 'end' && loadStyles("alignEnd.css", "ae");
    grow && loadStyles("grow.css", "grow");

    //component height
    let tabsHeight = ['left', 'right'].includes(tabPosition) && height != null ? height : undefined

    // set component height
    useEffect(() => Streamlit.setFrameHeight(tabsHeight))

    //callback
    const onClick = (key: string) => {
        Streamlit.setComponentValue(key)
    }

    // antd menu component
    return (
        <ConfigProvider
            theme={{
                components: {
                    //custom tree theme
                    Tabs: {
                        colorText: 'var(--text-color)',
                        colorTextDisabled: AlphaColor('--text-color', 0.5),
                        colorPrimary: 'var(--primary-color)',
                        colorBgContainerDisabled: 'transform',
                        colorBgContainer: 'var(--background-color)',
                        colorPrimaryHover: 'var(--primary-color)',
                        colorPrimaryActive: 'var(--primary-color)',
                        fontSize: 14,
                        fontFamily: 'var(--font)',
                    },
                },
            }}
        >
            <Tabs
                items={strToNode(items)}
                defaultActiveKey={index}
                onTabClick={onClick}
                type={shape === 'default' ? 'line' : shape}
                tabPosition={tabPosition}
                centered={centered}
                style={{height: tabsHeight}}
            />
        </ConfigProvider>
    );
};

export default withStreamlitConnection(AntdTabs)
