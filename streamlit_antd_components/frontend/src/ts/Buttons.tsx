import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Button, Space, ConfigProvider} from 'antd';
import {AlphaColor, getHrefKeys, LabelComponent} from "../js/utils.react"
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/buttons.css"

interface ButtonsProp {
    label: any;
    items: any[];
    index: number | null;
    shape: "circle" | "default" | "round" | undefined;
    align: any;
    position: 'left' | 'right' | 'top' | 'bottom';
    size: any
    direction: "horizontal" | "vertical" | undefined;
    compact: boolean;
    key: string | undefined;
}

const AntdButtons = (props: ButtonsProp) => {
    //get data
    const label = props['label']
    const items = props['items']
    const index = props['index']
    const shape = props['shape']
    const align = props['align']
    const position = props['position']
    const size = props['size']
    const direction = props['direction']
    const compact = props['compact']
    const key = props['key']

    //wrap component
    const Component = compact ? Space.Compact : Space

    //load style
    // grow && growStyle()

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
                        borderRadiusLG: 6,
                        fontSizeLG: 18,
                        colorBorder: AlphaColor('--text-color', 0.2),
                    },
                },
            }}
        >
            <LabelComponent
                label={label}
                align={align}
                position={position}
                size={size}
                children={
                    <Component
                        id={key}
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
                                    size={size}
                                >
                                    {item['label']}
                                </Button>
                            }
                        )}
                    </Component>
                }
            />
        </ConfigProvider>
    );
};

export default AntdButtons
