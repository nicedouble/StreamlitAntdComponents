import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Button, Space, ConfigProvider,} from 'antd';
import {growStyle} from "./buttons.react";
import {AlphaColor,getHrefKeys} from "../utils.react"
import "bootstrap-icons/font/bootstrap-icons.css";
import "./buttons.css"

interface ButtonsProp {
    items: any[];
    index: number | null;
    shape: "circle" | "default" | "round" | undefined;
    align: string;
    direction: "horizontal" | "vertical" | undefined;
    compact: boolean;
    grow: boolean;
    key: string | undefined;
}

const AntdButtons = (props: ButtonsProp) => {
    //get data
    const items = props['items']
    const index = props['index']
    const shape = props['shape']
    const align = props['align']
    const direction = props['direction']
    const compact = props['compact']
    const grow = props['grow']
    const key = props['key']

    //wrap component
    const Component = compact ? Space.Compact : Space

    //load style
    grow && growStyle()

    //state
    const [selected, setSelected] = useState(index)

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //callback
    const onClick = (idx: number) => {
        //not href index
        if (getHrefKeys(items).indexOf(idx) === -1) {
            setSelected(idx)
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
                        colorBorder: AlphaColor('--text-color', 0.2)
                    },
                },
            }}
        >
            <Component
                id={key}
                className={`${direction === 'horizontal' && 'd-flex'} justify-content-${align} flex-wrap`}
                direction={direction}
            >
                {items.map((item: any, idx) => {
                        let type_: any = index != null ? selected === idx ? "primary" : "default" : "default"
                        return <Button
                            key={idx}
                            type={type_}
                            shape={shape}
                            onClick={() => onClick(idx)}
                            disabled={item['disabled']}
                            href={item['href'] ? item['href'] : undefined}
                            target={'_blank'}
                            icon={item['icon'] && <i className={`bi bi-${item['icon']}`}/>}
                            className={grow ? 'flex-fill' : undefined}
                        >
                            {item['label']}
                        </Button>
                    }
                )}
            </Component>
        </ConfigProvider>
    );
};

export default AntdButtons
