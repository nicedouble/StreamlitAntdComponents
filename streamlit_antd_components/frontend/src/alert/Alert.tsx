import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Alert, ConfigProvider} from 'antd';
import Marquee from 'react-fast-marquee';
import './alert.css'

interface AlertProp {
    message: string;
    description: string | null;
    type: "info" | "success" | "warning" | 'error';
    icon: boolean;
    height: number | undefined;
    closable: boolean;
    banner: boolean;
    key: string | undefined;
}

const AntdAlert = (props: AlertProp) => {
    //get data
    let message = props['message']
    const description = props['description']
    const type = props['type']
    const icon = props['icon']
    const height = props['height']
    const closable = props['closable']
    const banner = props['banner']
    const key = props['key']

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    return (
        <ConfigProvider
            theme={{
                components: {
                    Alert: {
                        fontSize: 16,
                        fontSizeLG: 18,
                    },
                },
            }}
        >
            <Alert
                key={key}
                message={banner ? <Marquee pauseOnHover={true} gradient={false}>{message}</Marquee> : message}
                description={description}
                type={type}
                showIcon={icon}
                closable={closable}
                banner={banner}
                style={{minHeight: 42, borderRadius: 5, height: height}}
                onClose={()=>Streamlit.setFrameHeight(0)}
            />
        </ConfigProvider>
    );
};

export default AntdAlert
