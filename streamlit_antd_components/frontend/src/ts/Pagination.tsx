import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {Pagination, ConfigProvider} from 'antd';
import type {PaginationProps} from 'antd';
import {AlphaColor} from "../js/utils.react"

interface PaginationProp {
    total: any
    index: any
    page_size: any
    jump: any
    align: string
    circle: string
    simple: boolean
    disabled: boolean
    show_total: boolean
    stValue:any
}

const AntdPagination = (props: PaginationProp) => {
    //get data
    const total = props['total'];
    const index = props['index'];
    const page_size = props['page_size'];
    const jump = props['jump'];
    const align = props['align'];
    const circle = props['circle'];
    const simple = props['simple'];
    const disabled = props['disabled'];
    const show_total = props['show_total'];

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    const [current, setCurrent] = useState(index);

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
            prevStValue.current = props['stValue']
        }
    }, [props])

    return (
        <ConfigProvider
            theme={{
                components: {
                    Pagination: {
                        itemActiveBg: 'transform',
                        colorBgContainer: 'inherit',
                        colorPrimary: 'var(--primary-color)',
                        colorPrimaryHover: 'var(--primary-color)',
                        colorText: 'var(--text-color)',
                        colorBgTextActive: AlphaColor('--text-color', 0.2),
                        colorBgTextHover: AlphaColor('--text-color', 0.1),
                        borderRadius: circle ? 16 : 6,
                        controlOutlineWidth: 0,
                        colorBorder: AlphaColor('--text-color', 0.3),
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
                    showTotal={show_total ? (t, r) => `${r[0]}-${r[1]} / ${t} items` : undefined}
                />
            </div>
        </ConfigProvider>
    );
};

export default AntdPagination
