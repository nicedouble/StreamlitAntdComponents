import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Alert, ConfigProvider} from 'antd';
import '../css/alert.css'
import {GetColor, insertStyle, markdown, marquee, RgbaColor} from "../js/utils.react";

interface AlertProp {
    label: string;
    description: string;
    color: "info" | "success" | "warning" | 'error';
    radius: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    icon: boolean | string;
    closable: boolean;
    banner: boolean | boolean[];
}

const AntdAlert = (props: AlertProp) => {
    //get data
    const message = props['label']
    const description = props['description']
    const color = props['color']
    const radius = props['radius']
    const icon = props['icon']
    const closable = props['closable']
    const banner = props['banner']
    const msgList = ['info', 'success', 'warning', 'error']

    // component height
    useEffect(() => {
        setTimeout(() => Streamlit.setFrameHeight(), 0.001)
    })

    if (msgList.indexOf(color) === -1) {
        const primaryColor = GetColor(color)
        const textStyle = `
        .ant-alert.ant-alert-info{
            color: ${primaryColor};
            background: ${RgbaColor(primaryColor)};
        }
        .ant-alert.ant-alert-info .ant-alert-message{
            color: ${primaryColor};
        }
        .ant-alert.ant-alert-info .anticon.anticon-close{
            color: ${primaryColor};
        }
        .ant-alert-info .ant-alert-icon{
            color: ${primaryColor}
        }
        `
        insertStyle(`sac.alert.style`, textStyle)
    }

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
                type={msgList.indexOf(color) !== -1 ? color : 'info'}
                showIcon={typeof (icon) === 'boolean' ? icon : true}
                closable={closable}
                banner={totalBanner}
                style={{borderRadius: radiusMap[radius]}}
                onClose={() => Streamlit.setFrameHeight(0)}
                icon={typeof (icon) === 'boolean' ? undefined : <i className={`bi bi-${icon}`}/>}
            />
        </ConfigProvider>
    );
};

export default AntdAlert
