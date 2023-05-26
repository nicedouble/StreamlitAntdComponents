import {Streamlit, ComponentProps, withStreamlitConnection} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Button, Space, ConfigProvider,} from 'antd';
import {loadStyles, AlphaColor, getHrefIndex} from "./custom.react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./custom.css"

const AntdButtons = (props: ComponentProps) => {
    //get data
    const items: any[] = props.args['items']
    const index: number | null = props.args['index']
    const shape = props.args['shape']
    const align = props.args['align']
    const direction = props.args['direction']
    const compact = props.args['compact']
    const grow = props.args['grow']

    //wrap component
    const Component = compact ? Space.Compact : Space

    //load style
    grow && loadStyles("spaceItem.css", "aci");
    loadStyles('spaceItemA.css', 'acia')

    //state
    const [selectIndex, setSelectIndex] = useState(index)

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    const onClick = (idx: number) => {
        //not href index
        if (getHrefIndex(items).indexOf(idx) === -1) {
            setSelectIndex(idx)
            Streamlit.setComponentValue(idx)
        }
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorText: 'var(--text-color)',
                        colorTextDisabled: AlphaColor('--text-color', 0.5),
                        colorPrimary: 'var(--primary-color)',
                        colorBgContainerDisabled: 'transform',
                        colorBgContainer: 'var(--background-color)',
                        colorPrimaryHover: 'var(--primary-color)',
                        controlHeight: 35.5,
                        fontSize: 16,
                    },
                },
            }}
        >
            <Component
                className={`${direction === 'horizontal' && 'd-flex'} justify-content-${align} flex-wrap`}
                direction={direction}
            >
                {items.map((item: any, idx) => {
                        let type_: any = index != null ? selectIndex === idx ? "primary" : "default" : "default"
                        return <Button
                            key={idx}
                            type={type_}
                            shape={shape}
                            onClick={() => onClick(idx)}
                            disabled={item['disabled']}
                            href={item['href'] ? item['href'] : undefined}
                            target={'_blank'}
                            icon={item['icon'] && <i className={`bi bi-${item['icon']}`}/>}
                            className={grow && 'flex-fill'}
                        >
                            {item['label']}
                        </Button>
                    }
                )}
            </Component>
        </ConfigProvider>
    );
};

export default withStreamlitConnection(AntdButtons)
