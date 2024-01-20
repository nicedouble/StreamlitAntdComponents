import React from "react";
import {DarkenColor, GetColor, getSize, markdown, RgbaColor} from "../js/utils.react";
import * as antIcon from "@ant-design/icons";


interface ThemeOptions {
    color?: string;
    size?: any;
    textColor?: string;
    bgColor?: string;
    variant?: string;
}

const generateThemeStyles = (options: ThemeOptions) => {
    const primaryColor = GetColor(options.color ?? '--primary-color');
    const textColor = GetColor(options.textColor ?? '--text-color');
    const bgColor = GetColor(options.bgColor ?? '--background-color');
    const size = getSize(options.size);

    const baseStyles = {
        color: textColor,
        fontSize: size,
        borderColor: options.variant !== 'outline' ? 'transparent' : RgbaColor(textColor),
        backgroundColor: options.variant === 'outline' ? 'transparent' : bgColor,
        '&:hover': {
            backgroundColor: options.variant === 'outline' ? 'transparent' : DarkenColor(bgColor, 0.1),
            borderColor: options.variant === 'outline' ? primaryColor : 'transparent',
        },
        '&[data-checked]:not([data-disabled])': {
            color: options.variant === 'light' ? primaryColor : options.variant === 'filled' ? '#fff' : textColor,
            backgroundColor: options.variant === 'light' ? RgbaColor(primaryColor) : options.variant === 'filled' ? primaryColor : 'transparent',
            borderColor: options.variant === 'outline' ? primaryColor : 'transparent',
        },
        '&[data-checked]:not([data-disabled]):hover': {
            backgroundColor: options.variant === 'light' ? RgbaColor(primaryColor, 0.3) : options.variant === 'filled' ? DarkenColor(primaryColor, 0.1) : 'transparent',
        },
    };

    return baseStyles;
};

interface BaseProp {
    color: any;
    background_color: any;
    size: any;
    font: any;
}


interface CustomIconProps {
    icon: { size: any, color: any, name: any, type: any } | null | any
    style?: React.CSSProperties
    class?: string
}

const CustomIcon = (props: CustomIconProps) => {
    const icon = props.icon
    const style = props.style
    const class_ = props.class
    if (icon) {
        const {size, color, name, type} = icon
        let innerStyle = {}
        if (size) {
            // @ts-ignore
            innerStyle['fontSize'] = getSize(size)
        }
        if (color) {
            // @ts-ignore
            innerStyle['color'] = GetColor(color)
        }
        const iconStyle = Object.assign({}, style, innerStyle)
        if (type === 'BsIcon') {
            return <i className={`bi bi-${name} ${class_ || ''}`} style={iconStyle}/>
        }
        if (type === 'AntIcon') {
            // @ts-ignore
            const DynamicComponent = antIcon[name]
            return <DynamicComponent className={class_ || ''} style={iconStyle}/>
        }
    }
    return <></>
}

interface LabelWrapProps {
    label: string
    desc: string
    size?: string
    align?: string
    grow?: boolean
    children: React.ReactNode
    style?: React.CSSProperties
}

const LabelWrap = (props: LabelWrapProps) => {
    const label = props.label
    const desc = props.desc
    const size = props.size === undefined ? 'md' : props.size
    const align = props.align === undefined ? 'start' : props.align
    const grow = props.grow === undefined ? false : props.grow
    const children = props.children
    const style = props.style
    const textColor = GetColor('--text-color')

    return <div style={{display: grow ? 'block' : 'flex', justifyContent: align}}>
        <div style={Object.assign({
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            width: grow ? '100%' : 'unset',
        }, style)}>
            <div style={{lineHeight: 1.3, fontFamily: 'var(--font)', display: label === null ? 'none' : 'block'}}>
                <div style={{color: textColor, fontSize: getSize(size)}}>{markdown(label)}</div>
                <div style={{
                    color: RgbaColor(textColor, 0.5),
                    fontSize: getSize(size) - 2,
                    display: desc === null ? 'none' : 'block'
                }}>{markdown(desc)}</div>
            </div>
            {children}
        </div>
    </div>
}

export {CustomIcon, LabelWrap, generateThemeStyles};
export type {BaseProp};