import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {Button, ConfigProvider, Space} from 'antd';
import {getHrefKeys, getSize, getTheme, insertStyle, MartineRadiusSize, RgbaColor} from "../js/utils.react"
import {BaseProp, CustomIcon, LabelWrap} from "./utils";
import "../css/buttons.css"

interface ButtonsProp extends BaseProp {
    label: any;
    description: any;
    items: any[];
    index: number | null;
    variant: string;
    align: any;
    radius: any
    background_color: any;
    direction: "horizontal" | "vertical" | undefined;
    gap: any;
    use_container_width: boolean;
    return_index: boolean;
    kv: any;
    stValue: any
}

interface ButtonProp extends BaseProp {
    label: any;
    icon: any;
    disabled: any;
    href: any;
}


const AntdButton = (idx: any, type_: any, radius: any, props: ButtonProp, onClick: any, isSelect: boolean, grow: boolean) => {
    //get data
    const {color, font, backgroundColor, size, primaryColor, textColor, theme} = getTheme(props);

    const linkColor = props['color'] != null ? props['color'] : '#1677ff'

    let selectStyle = `
        #btn-${idx}.ant-btn-default:not(:disabled):active,#btn-${idx}.ant-btn-dashed:not(:disabled):active {
            color: #fff !important;
            border-color: ${primaryColor} !important;
            background: ${primaryColor} !important;
        }
        #btn-${idx}.ant-btn-primary:not(:disabled):active {
            color: ${primaryColor} !important;
            background: transparent !important;
            border-color: ${primaryColor} !important;
        }
    `
    let unSelectStyle = `
        #btn-${idx}.ant-btn-primary:not(:disabled):hover{
            box-shadow: 0 0 3px ${primaryColor}, 0 0 3px rgba(0, 0, 0, .05);
        }
        #btn-${idx}.ant-btn-text:not(:disabled):hover{
            color:${textColor};
        }
        #btn-${idx}.ant-btn-text{
            color:${textColor};
        }
        #btn-${idx}.ant-btn-text:disabled{
            color:${RgbaColor(textColor, 0.5)};
        }
    `

    insertStyle(`sac.buttons${idx}.style`, isSelect ? selectStyle : unSelectStyle)

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        ...theme,
                        colorText: isSelect ? textColor : primaryColor,
                        colorTextDisabled: RgbaColor(textColor, 0.5),
                        colorBgContainerDisabled: 'transform',
                        colorPrimaryHover: primaryColor,
                        colorPrimaryActive: primaryColor,
                        colorBgTextHover: RgbaColor(textColor, 0.1),
                        colorLink: linkColor,
                        colorLinkHover: linkColor,
                        colorLinkActive: linkColor,
                        // controlHeight: 3 * getSize(size) - 10,
                        colorBorder: isSelect ? RgbaColor(textColor) : primaryColor,
                        borderRadius: getSize(radius, MartineRadiusSize),
                    },
                },
            }}
        >
            <Button
                id={`btn-${idx}`}
                key={idx}
                type={type_}
                onClick={() => onClick(idx)}
                disabled={props['disabled']}
                href={props['href'] ? props['href'] : undefined}
                target={'_blank'}
                icon={props['icon'] && <CustomIcon icon={props.icon}/>}
            >
                {props['label']}
            </Button>
        </ConfigProvider>
    )
}

const AntdButtons = (props: ButtonsProp) => {
    //get data
    const {color, font, backgroundColor, size, primaryColor, textColor, theme} = getTheme(props);

    const label = props['label']
    const description = props['description']
    const items = props['items']
    const index = props['index']
    let variant = props['variant']
    variant = variant === 'outline' ? 'default' : variant === 'filled' ? 'primary' : variant
    const align = props['align']
    const radius = props['radius']
    const direction = props['direction']
    const gap = props['gap']
    const grow = props['use_container_width']
    const return_index = props['return_index']
    const kv = props['kv']

    //load custom style
    let style = `      
        .ant-btn-primary:disabled{
            color: ${RgbaColor(textColor, 0.5)} !important;
            background: ${RgbaColor(textColor, 0.1)} !important;
            border-color: ${RgbaColor(textColor, 0.1)} !important;
        }
        .ant-btn-dashed:disabled,.ant-btn-default:disabled{
            border-color: ${RgbaColor(textColor, 0.1)} !important;
        }
        .ant-btn {
            min-height: ${3 * getSize(size) - 10}px;
            min-width: ${3 * getSize(size) - 10}px;
            width: ${grow ? '100%' : 'auto'} !important;
            padding: ${getSize(size) * 0.3}px ${getSize(size) * 0.8}px;
        }
        .ant-btn.ant-btn-icon-only{
            padding:${getSize(size) * 0.3}px
        }
        .ant-space-compact .ant-btn{
            flex-grow:${grow ? 1 : undefined}
        }
    `
    insertStyle(`sac.buttons.style`, style)

    //state
    const [selected, setSelected] = useState(index)

    // set timeout to render component height
    useEffect(() => {
        setTimeout(() => Streamlit.setFrameHeight(), 0.01)
    })

    //listen index
    const prevIndex = useRef(props['index'])
    const prevStValue = useRef(props['stValue'])
    useEffect(() => {
        const i = props['index']
        const st_i = props['stValue']
        if (i !== prevIndex.current && i !== null) {
            setSelected(i);
            Streamlit.setComponentValue(return_index ? i : kv[i]);
            prevIndex.current = props['index']
        }
        if (st_i !== prevStValue.current) {
            setSelected(st_i);
            Streamlit.setComponentValue(return_index ? st_i : kv[st_i]);
            prevStValue.current = props['stValue']
        }
    }, [props, kv, return_index])

    //callback
    const onClick = (idx: number) => {
        //not href index
        if (getHrefKeys(items).indexOf(idx) === -1) {
            setSelected(idx)
            Streamlit.setComponentValue(return_index ? idx : kv[idx])
        }
    }

    const buttonGroup = items.map((item: any, idx) => {
            let otherType = ['primary', 'default'].find((x) => x !== variant)
            let type_: any = index != null ? selected === idx ? otherType : variant : variant
            item.color = item.color != null ? item.color : color
            item.background_color = item.background_color != null ? item.background_color : backgroundColor
            item.size = item.size != null ? item.size : size
            item.font = item.font != null ? item.font : font
            return AntdButton(idx, type_, radius, item, onClick, index != null, grow)
        }
    )


    return (
        <LabelWrap
            label={label}
            desc={description}
            size={size}
            align={align}
            grow={grow}
            children={
                typeof (gap) == 'number' && gap === 0 ?
                    <Space.Compact direction={direction}>
                        {buttonGroup}
                    </Space.Compact> :
                    <Space direction={direction} wrap={true} size={4 * getSize(gap) - 46}
                           classNames={{item: grow ? 'flex-fill' : ''}}>
                        {buttonGroup}
                    </Space>
            }
        />
    );
};

export default AntdButtons
