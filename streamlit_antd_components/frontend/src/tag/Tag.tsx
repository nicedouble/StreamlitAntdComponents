import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Space, Tag} from 'antd';

interface itemProp {
    label: any
    color: any
    icon: any
    link: any
    bordered: any
    closable: any
}

interface TagProp {
    items: itemProp[]
    align: string
    direction: "horizontal" | "vertical"
    key: any
}

const AntdTag = (props: TagProp) => {
    //get data
    const items = props['items'];
    const align = props['align'];
    const direction = props['direction'];
    const key = props['key'];

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    return (
        <Space
            id={key}
            className={`${direction === 'horizontal' && 'd-flex'} justify-content-${align} flex-wrap`}
            direction={direction}
        >
            {items.map((item: any, idx) => {
                    return <Tag
                        key={idx}
                        color={item.color}
                        icon={item['icon'] && <i className={`bi bi-${item['icon']} mx-1`}/>}
                        closeIcon={item.closable}
                        bordered={item.bordered}
                        className={'d-flex align-items-center'}
                    >
                        {item.link ? <a href={item.link} target={'_blank'} rel="noreferrer">{item.label}</a> : item.label}
                    </Tag>
                }
            )}
        </Space>
    );
};

export default AntdTag
