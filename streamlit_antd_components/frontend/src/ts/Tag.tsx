import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Space, Tag, ConfigProvider} from 'antd';
import '../css/tag.css'
import {AlphaColor, MartineRadiusSize, MartineFontSize} from "../js/utils.react";

interface tagProp {
    label: any
    color: any
    radius: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    icon: any
    link: any
    bordered: any
    closable: any
}

interface TagsProp {
    items: tagProp[]
    align: string
    direction: "horizontal" | "vertical"
    checkable: boolean
    return_index: boolean;
}

const AntdTag = (props: tagProp) => {
    //get data
    const label = props['label'];
    const color = props['color'];
    const radius = props['radius'];
    const size = props['size'];
    const icon = props['icon'];
    const link = props['link'];
    const bordered = props['bordered'];
    const closable = props['closable'];

    useEffect(() => Streamlit.setFrameHeight())

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tag: {
                        defaultColor: 'var(--text-color)',
                        defaultBg: AlphaColor('--text-color', 0.05),
                    },
                },
            }}
        >
            <Tag
                color={color}
                icon={icon && <i className={`bi bi-${icon} mr-1`}/>}
                closeIcon={closable}
                bordered={bordered}
                style={{
                    margin: 0,
                    borderRadius: MartineRadiusSize[radius],
                    fontSize: MartineFontSize[size],
                    paddingTop: MartineFontSize[size]-12,
                    paddingBlock: MartineFontSize[size]-12,
                    lineHeight:1.2
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
    const checkable = props['checkable'];
    const return_index = props['return_index']

    const {CheckableTag} = Tag;
    const itemsList = items.map((item) => item['label'])
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => Streamlit.setFrameHeight())

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        setSelectedTags(nextSelectedTags);
        Streamlit.setComponentValue(nextSelectedTags.map((x) => return_index ? itemsList.indexOf(x) : x))
    };

    return <ConfigProvider
        theme={{
            components: {
                Tag: {
                    defaultColor: 'var(--text-color)',
                    defaultBg: AlphaColor('--text-color', 0.05),
                    colorFillSecondary: AlphaColor('--primary-color', 0.1),
                    colorPrimary: 'var(--primary-color)',
                    colorPrimaryActive: 'var(--primary-color)',
                    colorPrimaryHover: 'var(--primary-color)',
                },
            },
        }}
    >
        <Space
            className={`${direction === 'horizontal' && 'd-flex'} justify-content-${align} flex-wrap align-items-end`}
            direction={direction}
            size={10}
        >
            {items.map((item: any) => {
                if (!checkable) {
                    return AntdTag(item)
                } else {
                    return <CheckableTag
                        key={item['label']}
                        checked={selectedTags.includes(item['label'])}
                        onChange={(checked) => handleChange(item['label'], checked)}
                        style={{margin: 0, borderRadius: 10}}
                    >
                        {item['label']}
                    </CheckableTag>
                }
            })}
        </Space>
    </ConfigProvider>
};

export {AntdTags, AntdTag}
