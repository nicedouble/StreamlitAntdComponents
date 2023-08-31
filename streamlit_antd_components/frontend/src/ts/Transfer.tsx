import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Transfer, ConfigProvider, Button} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
import type {TransferDirection, TransferListProps} from 'antd/es/transfer';
import {AlphaColor, StreamlitScrollbar, LabelComponent} from "../js/utils.react"
import {strToNode, numberToStr} from "../js/transfer.react";
import '../css/transfer.css'

interface TransferProp {
    label: any
    items: any[]
    index: any
    titles: any
    search: boolean
    pagination: boolean
    oneway: boolean
    reload: boolean
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
    const reload = props['reload']
    const disabled = props['disabled']
    const width = props['width']
    const height = props['height']
    const key = props['key']

    //data source
    const [dataSource, setDataSource] = useState(items)
    //target keys
    const [targetKeys, setTargetKeys] = useState(index);

    //callback
    const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
        Streamlit.setComponentValue(nextTargetKeys.map((x) => Number(x)));
    };
    const onSearch = (dir: TransferDirection, value: string) => {
        Streamlit.setComponentValue(targetKeys.map((x: any) => Number(x)))
    };
    const reset = () => {
        setDataSource(items)
        setTargetKeys(index)
        Streamlit.setComponentValue(props['index'])
    }

    //footer
    const renderFooter = (
        _: TransferListProps<any>,
        info ?: any,
    ) => {
        if (info.direction === 'left') {
            return (
                <Button size="small" style={{float: 'left', margin: 5}} onClick={reset} icon={<ReloadOutlined/>}>
                    Reload
                </Button>
            );
        } else {
            return (
                <Button size="small" style={{float: 'right', margin: 5}} onClick={reset} icon={<ReloadOutlined/>}>
                    Reload
                </Button>
            );
        }
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
                        colorPrimaryActive: 'var(--primary-color)',
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
                        dataSource={dataSource}
                        titles={titles}
                        targetKeys={targetKeys}
                        onChange={onChange}
                        onSearch={onSearch}
                        render={(item: any) => item.title}
                        showSearch={search}
                        showSelectAll={true}
                        pagination={pagination}
                        oneWay={oneway}
                        disabled={disabled}
                        listStyle={{
                            width: width,
                            height: height,
                            minHeight: 200 + (search ? 60 : 0) + (reload ? 40 : 0)
                        }}
                        footer={reload ? renderFooter : undefined}
                    />
                }
            />
        </ConfigProvider>
    );
};

export default AntdTransfer
