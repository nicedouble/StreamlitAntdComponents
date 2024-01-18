import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Space, Tag, ConfigProvider} from 'antd';
import {MartineRadiusSize, GetColor, RgbaColor, getSize, insertStyle} from "../js/utils.react";
import {CustomIcon} from "./utils";

interface tagProp {
    label: any
    color: any
    radius: any
    size: any
    icon: any
    link: any
    bordered: any
    closable: any
}

interface TagsProp {
    items: tagProp[]
    align?: string
    direction?: "horizontal" | "vertical"
    size?: any
    radius?: any
    color?: any
    style?: React.CSSProperties
}

const AntdTag = (props: tagProp) => {
    //get data
    const label = props['label'];
    const color = props['color'];
    const radius = props['radius'] || 'md';
    const size = props['size'] || 'sm';
    const icon = props['icon'];
    const link = props['link'];
    const bordered = props['bordered'];
    const closable = props['closable'];
    const textColor = GetColor('--text-color')

    useEffect(() => Streamlit.setFrameHeight())

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tag: {
                        defaultColor: 'var(--text-color)',
                        defaultBg: RgbaColor(textColor, 0.05),
                    },
                },
            }}
        >
            <Tag
                color={color}
                icon={<CustomIcon icon={icon} style={{marginRight: label ? 5 : 0}}/>}
                closeIcon={closable}
                bordered={bordered}
                style={{
                    margin: 0,
                    borderRadius: getSize(radius, MartineRadiusSize),
                    fontSize: getSize(size),
                    paddingInline: getSize(size) * 0.5,
                    lineHeight: `${getSize(size) * 1.1}px`,
                }}
            >
                {link ?
                    <a href={link} target={'_blank'} rel={'noreferrer'} className={'text-decoration-none'}
                       style={{color: 'inherit'}}>{label}</a> : label}
            </Tag>
        </ConfigProvider>
    );
}

const AntdTags = (props: TagsProp) => {
    //get data
    const items = props['items'];
    const align = props['align'];
    const direction = props['direction'];
    const size = props['size'];
    const radius = props['radius'];
    const color = props['color'];
    const style = props['style'];

    useEffect(() => Streamlit.setFrameHeight())

    let tagStyle = `
        .anticon.anticon-close.ant-tag-close-icon{
            color: inherit;
            font-size: ${getSize(size) - 4}px;
        }
    `
    insertStyle('sac.tags.style', tagStyle)

    return <ConfigProvider
        theme={{
            components: {
                Tag: {
                    defaultColor: 'var(--text-color)',
                    defaultBg: RgbaColor(GetColor('--text-color'), 0.05),
                    colorFillSecondary: RgbaColor(GetColor('--primary-color'), 0.1),
                    colorPrimary: 'var(--primary-color)',
                    colorPrimaryActive: 'var(--primary-color)',
                    colorPrimaryHover: 'var(--primary-color)',
                },
            },
        }}
    >
        <Space
            className={`${direction === 'horizontal' && 'd-flex'} justify-content-${align} flex-wrap align-items-center`}
            direction={direction}
            size={5}
            style={style}
            classNames={{item: 'd-flex align-items-center'}}
        >
            {items.map((item: any) => {
                item.size = item.size || size
                item.radius = item.radius || radius
                item.color = item.color || color
                return AntdTag(item)
            })}
        </Space>
    </ConfigProvider>
};

export {AntdTags, AntdTag}
