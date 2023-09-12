import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Button, Space, ConfigProvider} from 'antd';
import {AlphaColor, getHrefKeys, LabelComponent, insertStyle} from "../js/utils.react"
import "../css/buttons.css"

interface ButtonsProp {
    label: any;
    items: any[];
    index: number | null;
    shape: "circle" | "default" | "round" | undefined;
    type: string;
    align: any;
    position: 'left' | 'right' | 'top' | 'bottom';
    size: any
    direction: "horizontal" | "vertical" | undefined;
    compact: boolean;
    key: string | undefined;
}

interface ButtonProp {
    label: any;
    icon: any;
    disabled: any;
    href: any;
    color: any;
}

const AntdButton = (idx: any, type_: any, shape: any, size: any, props: ButtonProp, onClick: any, isSelect: boolean) => {
    const color = props['color'] != null ? props['color'] : 'var(--primary-color)'
    let style = `
        #btn-${idx}.ant-btn-default:not(:disabled):active {
            color: #fff !important;
            border-color: ${color} !important;
            background: ${color} !important;
        }
        #btn-${idx}.ant-btn-primary:not(:disabled):active {
            color: ${color} !important;
            background: transparent !important;
            border-color: ${color} !important;
        }        
    `
    isSelect && insertStyle(`btn-${idx}-style`, style)
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorText: 'var(--text-color)',
                        colorTextDisabled: AlphaColor('--text-color', 0.5),
                        colorPrimary: color,
                        colorBgContainerDisabled: 'transform',
                        colorBgContainer: 'transform',
                        colorPrimaryHover: color,
                        colorPrimaryActive: color,
                        controlHeight: 38,
                        fontSize: 16,
                        fontSizeLG: 18,
                        colorBorder: AlphaColor('--text-color', 0.2),
                        borderRadius: 8,
                        borderRadiusSM: 6,
                    },
                },
            }}
        >
            <Button
                id={`btn-${idx}`}
                key={idx}
                type={type_}
                shape={shape}
                onClick={() => onClick(idx)}
                disabled={props['disabled']}
                href={props['href'] ? props['href'] : undefined}
                target={'_blank'}
                icon={props['icon'] && <i className={`bi bi-${props['icon']}`}/>}
                size={size}
            >
                {props['label']}
            </Button>
        </ConfigProvider>
    )
}

const AntdButtons = (props: ButtonsProp) => {
    //get data
    const label = props['label']
    const items = props['items']
    const index = props['index']
    const shape = props['shape']
    const type = props['type']
    const align = props['align']
    const position = props['position']
    const size = props['size']
    const direction = props['direction']
    const compact = props['compact']
    const key = props['key']

    //load custom style
    let style = `      
        .ant-btn-primary:disabled{
            color: ${AlphaColor('--text-color', 0.5)} !important;
            background: ${AlphaColor('--text-color', 0.1)} !important;
            border-color: ${AlphaColor('--text-color', 0.1)} !important;
        }
    `
    insertStyle(`buttons-style`, style)

    //wrap component
    const Component = compact ? Space.Compact : Space

    //state
    const [selected, setSelected] = useState(index)

    // set timeout to render component height
    useEffect(() => {
        setTimeout(() => Streamlit.setFrameHeight(), 0.01)
    })

    //callback
    const onClick = (idx: number) => {
        //not href index
        if (getHrefKeys(items).indexOf(idx) === -1) {
            setSelected(idx)
            Streamlit.setComponentValue(idx)
        }
    }

    return (
        <LabelComponent
            label={label}
            align={align}
            position={position}
            size={size}
            children={
                <Component
                    id={key}
                    direction={direction}
                    className={'d-flex flex-sm-wrap'}
                >
                    {items.map((item: any, idx) => {
                            let otherType = ['primary', 'default'].find((x) => x !== type)
                            let type_: any = index != null ? selected === idx ? otherType : type : type
                            return AntdButton(idx, type_, shape, size, item, onClick, index != null)
                        }
                    )}
                </Component>
            }
        />
    );
};

export default AntdButtons
