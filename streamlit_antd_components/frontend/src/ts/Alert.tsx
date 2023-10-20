import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Alert, ConfigProvider} from 'antd';
import '../css/alert.css'
import {markdown, marquee} from "../js/utils.react";

interface AlertProp {
    message: string;
    description: string;
    type: "info" | "success" | "warning" | 'error';
    radius: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    icon: boolean;
    closable: boolean;
    banner: boolean | boolean[];
}

const AntdAlert = (props: AlertProp) => {
    //get data
    const message = props['message']
    const description = props['description']
    const type = props['type']
    const radius = props['radius']
    const icon = props['icon']
    const closable = props['closable']
    const banner = props['banner']

    // component height
    useEffect(() => {setTimeout(() => Streamlit.setFrameHeight(), 0.001)})

    const radiusMap = {'xs': 2, 'sm': 5, 'md': 10, 'lg': 20, 'xl': 25}

    const getBanner = (ban: boolean | boolean[]) => {
        if (Array.isArray(ban)) {
            //total banner,message banner,description banner
            return [ban[0] || ban[1], ban[0], ban[1]]
        } else {
            return [ban, ban, ban]
        }
    }
    const [totalBanner, messageBanner, descriptionBanner] = getBanner(banner)
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
                message={messageBanner ? marquee(message) : markdown(message)}
                description={descriptionBanner ? marquee(description) : markdown(description)}
                type={type}
                showIcon={icon}
                closable={closable}
                banner={totalBanner}
                style={{borderRadius: radiusMap[radius]}}
                onClose={() => Streamlit.setFrameHeight(0)}
            />
        </ConfigProvider>
    );
};

export default AntdAlert
