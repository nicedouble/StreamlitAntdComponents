import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Result, Empty, Space, ConfigProvider} from 'antd';
import {AlphaColor} from "../utils.react";

interface ResultProp {
    title: any;
    subtitle: string | null;
    status: any;
    icon: any;
    key: string | undefined;
}

const AntdResult = (props: ResultProp) => {
    //get data
    let title = props['title']
    const subtitle = props['subtitle']
    const status = props['status']
    const icon = props['icon']
    const key = props['key']
    const colorMap = {
        'info': 'rgba(28, 131, 225, 0.9)',
        'success': 'rgba(33, 195, 84, 0.8)',
        'warning': 'rgba(255, 207, 18,0.9)',
        'error': 'rgba(255, 43, 43, 0.8)',
    }
    // @ts-ignore
    const color = colorMap[status]
    // component height
    useEffect(() => Streamlit.setFrameHeight())

    const resultWrap = (s: ResultProp['status']) => {
        if (s === 'empty') {
            return <Empty
                description={<Space direction={'vertical'} className={'d-flex'}>
                    <div style={{fontSize: 24}}>{title}</div>
                    <div style={{fontSize: 14}}>{subtitle}</div>
                </Space>}
            />
        } else {
            return <Result
                key={key}
                title={title}
                subTitle={subtitle}
                status={status}
                icon={icon !== null ? <i className={`bi bi-${icon}`} style={{fontSize: 72, color: color}}/> : undefined}
                className={'pb-0'}
            />
        }
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Result: {
                        colorTextHeading: 'var(--text-color)',
                        colorTextDescription: AlphaColor('--text-color', 0.5),
                        iconFontSize: 72,
                        extraMargin: 0,
                        colorInfo: colorMap.info,
                        colorSuccess: colorMap.success,
                        colorWarning: colorMap.warning,
                        colorError: colorMap.error,
                    },
                    Empty: {
                        colorText: AlphaColor('--text-color',0.5),
                    }
                },
            }}
        >
            {resultWrap(status)}
        </ConfigProvider>
    );
};

export default AntdResult
