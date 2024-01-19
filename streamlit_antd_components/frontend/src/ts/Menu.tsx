import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import type {MenuProps} from 'antd';
import {ConfigProvider, Menu} from 'antd';
import {strToNode} from "../js/menu.react";
import {
    getCollapseKeys, getHrefKeys, getParentKeys, reindex,
    insertStyle, GetColor, RgbaColor, getSize
} from "../js/utils.react"
import '../css/menu.css'

interface MenuProp {
    items: any[];
    index: any;
    open_index: any;
    open_all: boolean;
    size: any
    color: any
    variant: any
    indent: any;
    height: any;
    return_index: boolean;
    kv: any;
    stValue: any
}


const AntdMenu = (props: MenuProp) => {
    const textColor = GetColor('--text-color')
    //get data
    const items = strToNode(props.items, props.size, props.variant, RgbaColor(textColor, 0.5))
    const dsk = reindex(props.index)
    const openIndex = reindex(props.open_index)
    const openAll = props['open_all']
    const size = props['size']
    const color = props['color']
    const variant = props['variant']
    const indent = props['indent']
    const height = props['height']
    const return_index = props['return_index']
    const kv = props['kv']
    const dok = openAll ? getCollapseKeys(items) : openIndex ? openIndex : dsk && getParentKeys(dsk, items)
    const primaryColor = GetColor(color == null ? '--primary-color' : color)
    const primaryLightColor = RgbaColor(primaryColor)
    const bgColor = GetColor('--background-color')

    //custom style
    const textStyle = `
    li.ant-menu-item.ant-menu-item-selected .menu-desc{
        color: ${variant === 'filled' ? RgbaColor('#fff', 0.55) : 'none'} !important
    }
    .ant-menu-submenu-selected > .ant-menu-submenu-title{
        color:${primaryColor} !important
    }
    .ant-menu-item-group-title{
        margin: 4px !important;
        padding: 0 16px 0 ${indent}px !important
    }
    .ant-menu-item-group-list>li{
        padding-left: ${2 * indent}px !important
    }
    .ant-menu-item.ant-menu-item-selected{
        border-left:${variant === 'left-bar' ? `4px solid ${primaryColor}` : 'unset'} !important;
        border-right:${variant === 'right-bar' ? `4px solid ${primaryColor}` : 'unset'} !important;
    }
    .ant-menu-item{
        border-left-style:${variant === 'left-bar' ? 'solid' : 'unset'} !important;
        border-left-color:${variant === 'left-bar' ? 'transparent' : 'unset'} !important;
        border-left-width:${variant === 'left-bar' ? `4px` : 'unset'} !important;
        border-right-style:${variant === 'right-bar' ? 'solid' : 'unset'} !important;
        border-right-color:${variant === 'right-bar' ? 'transparent' : 'unset'} !important;
        border-right-width:${variant === 'right-bar' ? `4px` : 'unset'} !important;
        padding-top: ${getSize(size) * 0.5}px;
        padding-bottom: ${getSize(size) * 0.5}px;
    }
    .ant-menu-submenu-title {
        padding-top: ${getSize(size) * 0.5}px;
        padding-bottom: ${getSize(size) * 0.5}px;
    }
    `
    insertStyle(`sac.menu.style`, textStyle)

    //state
    const [selectKey, setSelectKey] = useState(dsk)

    //component height
    useEffect(() => Streamlit.setFrameHeight())

    //listen index
    const prevIndex = useRef(props['index'])
    const prevStValue = useRef(props['stValue'])
    useEffect(() => {
        const i = props['index']
        const st_i = props['stValue']
        if (i !== prevIndex.current) {
            setSelectKey(reindex(i));
            Streamlit.setComponentValue(return_index ? i : kv[i]);
            prevIndex.current = props['index']
        }
        if (st_i !== prevStValue.current) {
            setSelectKey(reindex(st_i));
            Streamlit.setComponentValue(return_index ? st_i : kv[st_i]);
            prevStValue.current = props['stValue']
        }
    }, [props, kv, return_index])


    //callback
    const onSelect: MenuProps['onSelect'] = (e) => {
        //only not href item will fire
        let hrefKeys = getHrefKeys(items)
        if (hrefKeys.indexOf(e.key) === -1) {
            setSelectKey([e.key]);
            Streamlit.setComponentValue(return_index ? Number(e.key) : kv[Number(e.key)]);
        }
    }
    const onOpenChange: MenuProps['onOpenChange'] = (e) => {
        const stValue = return_index ? Number(selectKey[0]) : kv[Number(selectKey[0])]
        //set time to rerender
        setTimeout(() => Streamlit.setComponentValue(stValue), 200)
    }

    // antd menu component
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemBorderRadius: variant === 'left-bar' || variant === 'right-bar' ? 0 : 8,
                        itemColor: 'var(--text-color)',
                        groupTitleColor: RgbaColor(textColor, 0.5),
                        itemDisabledColor: RgbaColor(textColor, 0.5),
                        itemHoverColor: 'var(--text-color)',
                        itemHoverBg: RgbaColor(textColor),
                        itemActiveBg: RgbaColor(textColor, 0.25),
                        itemSelectedColor: variant === 'filled' ? '#fff' : primaryColor,
                        itemSelectedBg: variant === 'filled' ? primaryColor : variant === 'subtle' ? bgColor : primaryLightColor,
                        subMenuItemBg: bgColor,
                        itemBg: bgColor,
                        colorSplit: RgbaColor(textColor),
                        fontFamily: 'var(--font)',
                        fontSize: getSize(size),
                        itemHeight: getSize(size) + 5,
                    },
                },
            }}
        >
            <Menu
                onSelect={onSelect}
                onOpenChange={onOpenChange}
                selectedKeys={selectKey}
                style={{borderRightWidth: 0, height: height, overflowY: 'auto'}}
                defaultSelectedKeys={dsk}
                defaultOpenKeys={dok}
                mode={'inline'}
                items={items}
                inlineIndent={indent}
                className={'text-wrap text-break'}
                subMenuCloseDelay={0}
            />
        </ConfigProvider>
    );
};

export default AntdMenu
