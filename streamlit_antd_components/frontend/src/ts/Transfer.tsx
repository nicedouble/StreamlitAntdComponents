import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Transfer, ConfigProvider, Button} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
import type { Key } from 'antd/es/table/interface';
import type {TransferDirection, TransferListProps} from 'antd/es/transfer';
import {GetColor, RgbaColor, DarkenColor, insertStyle} from "../js/utils.react"
import {strToNode, numberToStr} from "../js/transfer.react";
import '../css/transfer.css'
import {LabelWrap} from "./utils";

interface TransferProp {
    label: any
    description: any
    items: any[]
    index: any
    titles: any
    search: boolean
    pagination: boolean
    oneway: boolean
    color: any
    align: any
    reload: boolean | string
    disabled: boolean
    width: number
    height: number
    use_container_width: boolean
    return_index: boolean;
    kv: any;
}


const AntdTransfer = (props: TransferProp) => {
    //get data
    const label = props['label']
    const description = props['description']
    const items = strToNode(props['items'])
    const index = numberToStr(props['index'])
    const titles = props['titles']
    const search = props['search']
    const pagination = props['pagination']
    const oneway = props['oneway']
    const color = props['color']
    const align = props['align']
    const reload = props['reload']
    const disabled = props['disabled']
    const width = props['width']
    const height = props['height']
    const grow = props['use_container_width']
    const return_index = props['return_index']
    const kv = props['kv']
    const primaryColor = GetColor(color == null ? '--primary-color' : color)
    const secondaryBgColor = GetColor('--secondary-background-color')
    const textColor = GetColor('--text-color')

    //data source
    const [dataSource, setDataSource] = useState(items)
    //target keys
    const [targetKeys, setTargetKeys] = useState(index);

    //callback
    const onChange = (nextTargetKeys: Key[], direction: TransferDirection, moveKeys: Key[]) => {
        setTargetKeys(nextTargetKeys);
        Streamlit.setComponentValue(nextTargetKeys.map((x) => return_index ? Number(x) : kv[Number(x)]));
    };
    const onSearch = (dir: TransferDirection, value: string) => {
        Streamlit.setComponentValue(targetKeys.map((x: any) => return_index ? Number(x) : kv[Number(x)]))
    };
    const reset = () => {
        setDataSource(items)
        setTargetKeys(index)
        Streamlit.setComponentValue(props['index'].map((x: any) => return_index ? x : kv[x]))
    }

    //footer
    const renderFooter = (
        _: TransferListProps<any>,
        info?: {
            direction: TransferDirection;
        },
    ) => {
        const float = info !== undefined ? info.direction : 'left'
        return (
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: primaryColor,
                        }
                    }
                }}
            >
                <Button size="small" type={'primary'} style={{float: `${float}`, margin: 5}} onClick={reset}
                        icon={<ReloadOutlined/>}>
                    {typeof (reload) == 'boolean' ? 'Reload' : reload}
                </Button>
            </ConfigProvider>
        );
    };

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    const textStyle = `
    .ant-transfer-list-content-item-remove:hover{
        color: ${primaryColor} !important;
    }
    `
    insertStyle('sac.transfer.style', textStyle)

    return (
        <ConfigProvider
            theme={{
                components: {
                    Transfer: {
                        colorBgContainer: 'transform',
                        colorBorder: RgbaColor(textColor),
                        colorText: 'var(--text-color)',
                        colorTextDisabled: RgbaColor(textColor, 0.5),
                        controlItemBgHover: RgbaColor(textColor),
                        controlItemBgActive: 'transform',
                        controlItemBgActiveHover: 'transform',
                        fontFamily: 'var(--font)',
                    },
                    Button: {
                        colorPrimary: primaryColor,
                        colorPrimaryHover: primaryColor,
                        colorPrimaryActive: DarkenColor(primaryColor, 0.1),
                        colorTextDisabled: RgbaColor(textColor, 0.5),
                        colorBgContainerDisabled: RgbaColor(textColor, 0.1),
                    },
                    Checkbox: {
                        colorPrimary: primaryColor,
                        colorPrimaryActive: primaryColor,
                        colorPrimaryHover: primaryColor,
                        colorBgContainer: 'transform',
                        colorBorder: RgbaColor(textColor, 0.3),
                    },
                    Input: {
                        colorBgContainer: 'inherit',
                        colorBorder: RgbaColor(textColor),
                        colorPrimaryHover: primaryColor,
                        activeBorderColor: primaryColor,
                        controlOutlineWidth: 0,
                        colorTextPlaceholder: RgbaColor(textColor, 0.5),
                    },
                    Pagination: {
                        colorText: 'var(--text-color)',
                        colorBgContainer: 'inherit',
                        colorBorder: RgbaColor(textColor),
                        colorPrimary: primaryColor,
                        colorPrimaryHover: primaryColor,
                        controlOutlineWidth: 0,
                        colorTextDisabled: RgbaColor(textColor)
                    },
                    Dropdown: {
                        colorBgElevated: GetColor('--background-color'),
                        colorText: 'var(--text-color)',
                        controlItemBgHover: secondaryBgColor,
                        boxShadowSecondary: `0 0 10px ${secondaryBgColor}, 0 0 6px ${secondaryBgColor}`,
                    },
                    Empty: {
                        colorTextDisabled: RgbaColor(textColor, 0.3),
                    }
                },
            }}
        >
            <LabelWrap
                label={label}
                desc={description}
                align={align}
                grow={grow}
                style={{overflowX: 'auto'}}
                children={
                    <Transfer
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
                            width: grow ? '100%' : width,
                            height: height,
                            minHeight: 200 + (search ? 60 : 0) + (reload ? 40 : 0)
                        }}
                        footer={typeof (reload) == 'string' || String(reload) === 'true' ? renderFooter : undefined}
                    />
                }
            />
        </ConfigProvider>
    );
};

export default AntdTransfer
