import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Space, Tag, ConfigProvider} from 'antd';
import '../css/tag.css'
import {AlphaColor} from "../js/utils.react";

interface tagProp {
    label: any
    color: any
    icon: any
    link: any
    bordered: any
    closable: any
    key: any
}

interface TagsProp {
    items: tagProp[]
    align: string
    direction: "horizontal" | "vertical"
    checkable: boolean
    key: any
}

const AntdTag = (props: tagProp) => {
    //get data
    const label = props['label'];
    const color = props['color'];
    const icon = props['icon'];
    const link = props['link'];
    const bordered = props['bordered'];
    const closable = props['closable'];
    const key = props['key'];

    useEffect(() => Streamlit.setFrameHeight())

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tag: {
                        defaultColor: 'var(--text-color)',
                        defaultBg: AlphaColor('--text-color', 0.05)
                    },
                },
            }}
        >
            <Tag
                key={key}
                color={color}
                icon={icon && <i className={`bi bi-${icon} mx-1`}/>}
                closeIcon={closable}
                bordered={bordered}
            >
                {link ?
                    <a href={link} target={'_blank'} rel={'noreferrer'}
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
    const key = props['key'];

    const {CheckableTag} = Tag;
    const itemsList = items.map((item) => item['label'])
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => Streamlit.setFrameHeight())

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        setSelectedTags(nextSelectedTags);
        Streamlit.setComponentValue(nextSelectedTags.map((label) => itemsList.indexOf(label)))
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
            id={key}
            className={`${direction === 'horizontal' && 'd-flex'} justify-content-${align} flex-wrap`}
            direction={direction}
            size={2}
        >
            {items.map((item: any) => {
                if (!checkable) {
                    return AntdTag(item)
                } else {
                    return <CheckableTag
                        key={item['label']}
                        checked={selectedTags.includes(item['label'])}
                        onChange={(checked) => handleChange(item['label'], checked)}
                    >
                        {item['label']}
                    </CheckableTag>
                }
            })}
        </Space>
    </ConfigProvider>
};

export {AntdTags, AntdTag}
