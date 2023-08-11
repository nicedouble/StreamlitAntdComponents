import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Space, Tag, ConfigProvider} from 'antd';
import './tag.css'

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
    const key = props['key'];

    return <Space
        id={key}
        className={`${direction === 'horizontal' && 'd-flex'} justify-content-${align} flex-wrap`}
        direction={direction}
        size={2}
    >
        {items.map((item: any) => AntdTag(item))}
    </Space>
};

export {AntdTags, AntdTag}
