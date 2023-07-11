import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import type {MenuProps} from 'antd';
import {Menu, ConfigProvider} from 'antd';
import {strToNode} from "./menu.react";
import {AlphaColor, getParentKeys, getCollapseKeys, getHrefKeys, reindex,StreamlitScrollbar} from "../utils.react"
import './menu.css'

interface MenuProp {
    items: any[];
    index: any;
    open_index: any;
    open_all: boolean;
    size: any;
    indent: any;
    key: string | undefined;
}


const AntdMenu = (props: MenuProp) => {
    //component height
    useEffect(() => Streamlit.setFrameHeight())
    //scrollbar
    StreamlitScrollbar()

    //get data
    const items = strToNode(props['items'])
    const dsk = reindex(props['index'])
    let dok = reindex(props['open_index'])
    const openAll = props['open_all']
    const size = props['size']
    const indent = props['indent']
    const key = props['key']
    dok = openAll ? getCollapseKeys(items) : dok ? dok : dsk && getParentKeys(dsk, items)

    //state
    const [selectKey, setSelectKey] = useState(dsk)

    //callback
    const onSelect: MenuProps['onSelect'] = (e) => {
        //only not href item will fire
        let hrefKeys = getHrefKeys(items)
        if (hrefKeys.indexOf(e.key) === -1) {
            setSelectKey([e.key]);
            Streamlit.setComponentValue(Number(e.key));
        }
    }
    const onOpenChange: MenuProps['onOpenChange'] = (e) => {
        //set time to rerender
        setTimeout(() => Streamlit.setComponentValue(Number(selectKey[0])), 200)
    }

    // antd menu component
    return (
        <ConfigProvider
            theme={{
                components: {
                    //custom menu theme
                    Menu: {
                        radiusItem: 10,
                        colorItemText: 'var(--text-color)',
                        colorGroupTitle: AlphaColor('--text-color', 0.5),
                        colorItemTextDisabled: AlphaColor('--text-color', 0.5),
                        colorItemTextHover: 'var(--text-color)',
                        colorItemTextSelected: 'var(--primary-color)',
                        colorItemBgHover: AlphaColor('--text-color', 0.2),
                        colorItemBgSelected: AlphaColor(),
                        colorSubItemBg: 'var(--background-color)',
                        colorItemBg: 'var(--background-color)',
                        colorSplit: AlphaColor('--text-color', 0.2),
                        fontSize: size,
                        fontFamily: 'var(--font)',
                    },
                },
            }}
        >
            <Menu
                id={key}
                onSelect={onSelect}
                onOpenChange={onOpenChange}
                selectedKeys={selectKey}
                style={{borderRightWidth: 0}}
                defaultSelectedKeys={dsk}
                defaultOpenKeys={dok}
                mode={'inline'}
                items={items}
                inlineIndent={indent}
                className={'text-wrap text-break'}
            />
        </ConfigProvider>
    );
};

export default AntdMenu
