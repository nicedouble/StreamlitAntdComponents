import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Transfer, ConfigProvider} from 'antd';
import type {TransferDirection} from "antd/es/transfer";
import {AlphaColor, StreamlitScrollbar, LabelComponent} from "../utils.react"
import {strToNode, numberToStr} from "./transfer.react";
import './transfer.css'


interface TransferProp {
    label: any
    items: any[]
    index: any
    titles: any
    search: boolean
    pagination: boolean
    oneway: boolean
    disabled: boolean
    width: number | string
    height: number
    key: string | undefined
}


const AntdTransfer = (props: TransferProp) => {
    //get data
    const label = props['label']
    const items = strToNode(props['items'])
    const index = numberToStr(props['index'])
    const titles = props['titles']
    const search = props['search']
    const pagination = props['pagination']
    const oneway = props['oneway']
    const disabled = props['disabled']
    const width = props['width']
    const height = props['height']
    const key = props['key']
    //target keys
    const [targetKeys, setTargetKeys] = useState(index);

    //callback
    const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
        const nntk = nextTargetKeys.map((x) => Number(x));
        Streamlit.setComponentValue(nntk);
    };

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //scrollbar
    StreamlitScrollbar()
    const shadow = AlphaColor('--text-color', 0.1)

    return (
        <ConfigProvider
            theme={{
                components: {
                    Transfer: {
                        colorBgContainer: 'var(--background-color)',
                        colorBorder: AlphaColor('--text-color', 0.2),
                        colorText: 'var(--text-color)',
                        colorTextDisabled: AlphaColor('--text-color', 0.5),
                        controlItemBgHover: 'var(--secondary-background-color)',
                        controlItemBgActive: 'transform',
                        controlItemBgActiveHover: 'transform',
                        fontFamily: 'var(--font)',
                    },
                    Button: {
                        colorPrimary: 'var(--primary-color)',
                        colorPrimaryHover: 'var(--primary-color)',
                        colorTextDisabled: AlphaColor('--text-color', 0.5),
                        colorBgContainerDisabled: AlphaColor('--text-color', 0.1),
                    },
                    Checkbox: {
                        colorPrimary: 'var(--primary-color)',
                        colorPrimaryActive: 'var(--primary-color)',
                        colorPrimaryHover: 'var(--primary-color)',
                        colorBgContainer: 'var(--background-color)',
                        colorBorder: AlphaColor('--text-color', 0.2),
                    },
                    Input: {
                        colorBgContainer: 'var(--background-color)',
                        colorBorder: AlphaColor('--text-color', 0.2),
                        colorPrimaryHover: 'var(--primary-color)',
                        controlOutlineWidth: 0,
                        colorTextPlaceholder: AlphaColor('--text-color', 0.2),
                    },
                    Pagination: {
                        colorText: 'var(--text-color)',
                        colorBgContainer: 'var(--background-color)',
                        colorBorder: AlphaColor('--text-color', 0.2),
                        colorPrimary: 'var(--primary-color)',
                        colorPrimaryHover: 'var(--primary-color)',
                        controlOutlineWidth: 0
                    },
                    Dropdown: {
                        colorBgElevated: 'var(--background-color)',
                        colorText: 'var(--text-color)',
                        controlItemBgHover: 'var(--secondary-background-color)',
                        boxShadowSecondary: `0 6px 16px 0 ${shadow}, 0 3px 6px -4px ${shadow}, 0 9px 28px 8px ${shadow}`
                    },
                    Empty: {
                        colorTextDisabled: AlphaColor('--text-color', 0.2),
                    }
                },
            }}
        >
            <LabelComponent
                label={label}
                onlyLabel={true}
                children={
                    <Transfer
                        key={key}
                        dataSource={items}
                        titles={titles}
                        targetKeys={targetKeys}
                        onChange={onChange}
                        render={(item: any) => item.title}
                        showSearch={search}
                        showSelectAll={true}
                        pagination={pagination}
                        oneWay={oneway}
                        disabled={disabled}
                        listStyle={{width: width, height: height}}
                    />
                }
            />
        </ConfigProvider>
    );
};

export default AntdTransfer
