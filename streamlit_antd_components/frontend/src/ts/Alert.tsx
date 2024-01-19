import {Streamlit} from "streamlit-component-lib";
import React, {useEffect} from "react";
import {Alert, ConfigProvider} from 'antd';
import {GetColor, getSize, insertStyle, MartineRadiusSize, RgbaColor, markdown} from "../js/utils.react";
import Marquee from "react-fast-marquee";
import {CustomIcon} from "./utils";

interface AlertProp {
    label: string;
    description: string;
    size: any
    color: any
    radius: any
    variant: any
    icon: any
    closable: boolean;
    banner: boolean | boolean[];
}

const AntdAlert = (props: AlertProp) => {
    //get data
    const message = props['label']
    const description = props['description']
    const size = props['size']
    const color = props['color']
    const radius = props['radius']
    const variant = props['variant']
    const icon = props['icon']
    const closable = props['closable']
    const banner = props['banner']
    const colorList: any = {
        'info': {'primary': 'rgb(0, 66, 128)', 'lighten': 'rgba(28, 131, 225, 0.1)'},
        'success': {'primary': 'rgb(23, 114, 51)', 'lighten': 'rgba(33, 195, 84, 0.1)'},
        'warning': {'primary': 'rgb(146, 108, 5)', 'lighten': 'rgba(255, 227, 18, 0.1)'},
        'error': {'primary': 'rgb(125, 53, 59)', 'lighten': 'rgba(255, 43, 43, 0.09)'},
    }

    // component height
    useEffect(() => {
        setTimeout(() => Streamlit.setFrameHeight(), 0.001)
    })

    const getStyle = (color: any, size: any) => {
        let element, primary, lighten;
        if (Object.keys(colorList).indexOf(color) !== -1) {
            element = color
            primary = colorList[color].primary
            lighten = colorList[color].lighten
        } else {
            element = 'info'
            primary = GetColor(color)
            lighten = RgbaColor(primary)
        }
        return `
        .ant-alert.ant-alert-${element}{
            color: ${variant === 'filled' ? '#fff' : primary};
            background: ${variant === 'filled' ? primary : variant === 'light' || variant === 'quote-light' ? lighten : 'transparent'};
        }
        .ant-alert.ant-alert-${element} .ant-alert-message{
            color: ${variant === 'filled' ? '#fff' : primary};
        }
        .ant-alert.ant-alert-${element} .anticon.anticon-close{
            color: ${variant === 'filled' ? '#fff' : primary};
            font-size: ${getSize(size) * 0.8}px;
        }
        .ant-alert-${element} .ant-alert-icon{
            color: ${variant === 'filled' ? '#fff' : primary};
            font-size: ${getSize(size) + 8}px;
        }
        .ant-alert{
            border: ${variant === 'outline' ? `1px solid ${primary}` : 0};
            border-left:${variant === 'quote' || variant === 'quote-light' ? `4px solid ${primary}` : '1'};
            border-top-left-radius:${variant === 'quote' || variant === 'quote-light' ? 0 : 'none'} !important;
            border-bottom-left-radius:${variant === 'quote' || variant === 'quote-light' ? 0 : 'none'} !important;
        }
        .ant-alert-description{
            color: ${variant === 'filled' ? '#fff' : GetColor('--text-color')} !important;
        }
        .ant-alert-message{
            font-size:${getSize(size)}px !important;
        }
        `
    }
    insertStyle(`sac.alert.style`, getStyle(color, size))

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
                        fontSize: getSize(size),
                    },
                },
            }}
        >
            <Alert
                message={messageBanner ? <Marquee pauseOnHover={true}>{markdown(message)}</Marquee> : markdown(message)}
                description={description == null ? undefined : descriptionBanner ?
                    <Marquee pauseOnHover={true}>{markdown(description)}</Marquee> : markdown(description)}
                type={Object.keys(colorList).indexOf(color) !== -1 ? color : 'info'}
                showIcon={typeof (icon) === 'boolean' ? icon : true}
                closable={closable}
                banner={totalBanner}
                style={{borderRadius: getSize(radius, MartineRadiusSize)}}
                onClose={() => Streamlit.setFrameHeight(0)}
                icon={typeof (icon) === 'boolean' ? undefined : <CustomIcon icon={icon} class={'ant-alert-icon'}/>}
            />
        </ConfigProvider>
    );
};

export default AntdAlert
