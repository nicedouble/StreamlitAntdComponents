import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {Pagination, ConfigProvider} from 'antd';
import type {PaginationProps} from 'antd';
import {GetColor, insertStyle, RgbaColor, MartineRadiusSize, getSize} from "../js/utils.react"
import '../css/pagination.css'

interface PaginationProp {
    total: any
    index: any
    page_size: any
    jump: any
    align: string
    circle: string
    color: any
    size: any
    radius: any
    variant: any
    previous: any
    next: any
    simple: boolean
    disabled: boolean
    show_total: boolean
    stValue: any
}

const AntdPagination = (props: PaginationProp) => {
    //get data
    const total = props['total'];
    const index = props['index'];
    const page_size = props['page_size'];
    const jump = props['jump'];
    const align = props['align'];
    const color = props['color'];
    const size = props['size'];
    const radius = props['radius'];
    const variant = props['variant'];
    const previous = props['previous'];
    const next = props['next'];
    const simple = props['simple'];
    const disabled = props['disabled'];
    const show_total = props['show_total'];
    const primaryColor = GetColor(color == null ? '--primary-color' : color)
    const primaryLightColor = RgbaColor(primaryColor)
    const textColor = GetColor('--text-color')

    const [current, setCurrent] = useState(index);

    // component height
    useEffect(() => Streamlit.setFrameHeight())


    const textStyle = `
    .ant-pagination-item-active{
        border-color: ${variant === 'light' ? primaryLightColor : primaryColor} !important
    }
    .ant-pagination-item-active a{
        color: ${variant === 'filled' ? '#fff' : primaryColor} !important
    }
    .ant-pagination-options-quick-jumper input{
        border-radius: ${getSize(radius, MartineRadiusSize)}px;
        aspect-ratio: 2/1;
        width:auto !important
    }
    .ant-pagination-item-ellipsis{
        color:${RgbaColor(textColor)} !important
    }
    .ant-pagination-item-link[disabled]{
        color:${RgbaColor(textColor)} !important
    }
    .ant-pagination-item-link,.ant-pagination-item-link-icon{
        font-size:${getSize(size)}px !important
    }
    `
    insertStyle(`sac.pagination.style`, textStyle)

    //callback
    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
        Streamlit.setComponentValue(page)
    }

    //listen index
    const prevIndex = useRef(props['index'])
    const prevStValue = useRef(props['stValue'])
    useEffect(() => {
        const i = props['index']
        const st_i = props['stValue']
        if (i !== prevIndex.current) {
            setCurrent(i);
            Streamlit.setComponentValue(i);
            prevIndex.current = props['index']
        }
        if (st_i !== prevStValue.current) {
            setCurrent(st_i);
            Streamlit.setComponentValue(st_i);
            prevStValue.current = props['stValue']
        }
    }, [props])

    //previous and next button
    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev' && previous !== null) {
            return <button className={'ant-pagination-item-link px-2'} style={{fontSize: getSize(size)}}>
                {previous}
            </button>
        }
        if (type === 'next' && next !== null) {
            return <button className={'ant-pagination-item-link px-2'} style={{fontSize: getSize(size)}}>
                {next}
            </button>
        }
        return originalElement;
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Pagination: {
                        itemActiveBg: variant === 'outline' ? 'transform' : variant === 'light' ? primaryLightColor : primaryColor,
                        colorBgContainer: 'inherit',
                        colorPrimary: primaryColor,
                        colorPrimaryHover: primaryColor,
                        colorText: 'var(--text-color)',
                        colorBgTextHover: RgbaColor(textColor),
                        colorBgTextActive: RgbaColor(textColor, 0.25),
                        borderRadius: getSize(radius, MartineRadiusSize),
                        controlOutlineWidth: 0,
                        colorBorder: RgbaColor(textColor, 0.3),
                        fontSize: getSize(size),
                        itemSize: 3 * getSize(size) - 16,
                        controlHeight: 3 * getSize(size) - 18,
                        colorTextDisabled: RgbaColor(textColor),
                        controlItemBgActiveDisabled: RgbaColor(textColor, 0.1),
                        colorBgContainerDisabled: RgbaColor(textColor, 0.1),
                    },
                },
            }}
        >
            <div className={`d-flex justify-content-${align}`}>
                <Pagination
                    current={current}
                    showQuickJumper={jump}
                    defaultCurrent={index}
                    defaultPageSize={page_size}
                    simple={simple}
                    disabled={disabled}
                    onChange={onChange}
                    total={total}
                    showTitle={false}
                    showSizeChanger={false}
                    itemRender={itemRender}
                    showTotal={show_total ? (t, r) => `${r[0]}-${r[1]} / ${t}` : undefined}
                />
            </div>
        </ConfigProvider>
    );
};

export default AntdPagination
