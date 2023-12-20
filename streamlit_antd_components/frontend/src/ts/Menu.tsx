import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import type {MenuProps} from 'antd';
import {Menu, ConfigProvider} from 'antd';
import {strToNode} from "../js/menu.react";
import {AlphaColor, getParentKeys, getCollapseKeys, getHrefKeys, reindex, StreamlitScrollbar} from "../js/utils.react"
import '../css/menu.css'

interface MenuProp {
    items: any[];
    index: any;
    open_index: any;
    open_all: boolean;
    size: 'small' | 'middle' | 'large';
    indent: any;
    return_index: boolean;
    kv: any;
    stValue: any
}


const AntdMenu = (props: MenuProp) => {
    //get data
    const items = strToNode(props['items'])
    const dsk = reindex(props['index'])
    let dok = reindex(props['open_index'])
    const openAll = props['open_all']
    const size = props['size']
    const indent = props['indent']
    const return_index = props['return_index']
    const kv = props['kv']
    dok = openAll ? getCollapseKeys(items) : dok ? dok : dsk && getParentKeys(dsk, items)
    const sizeMap = {
        'small': {'fontSize': 14, 'lineHeight': 35},
        'middle': {'fontSize': 16, 'lineHeight': 40},
        'large': {'fontSize': 20, 'lineHeight': 45}
    }

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

    //scrollbar
    StreamlitScrollbar()

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
                        itemBorderRadius: 8,
                        itemColor: 'var(--text-color)',
                        groupTitleColor: AlphaColor('--text-color', 0.5),
                        itemDisabledColor: AlphaColor('--text-color', 0.5),
                        itemHoverColor: 'var(--text-color)',
                        itemSelectedColor: 'var(--primary-color)',
                        itemHoverBg: AlphaColor('--text-color', 0.1),
                        itemActiveBg: AlphaColor('--text-color', 0.2),
                        itemSelectedBg: AlphaColor(),
                        subMenuItemBg: 'transform',
                        itemBg: 'transform',
                        colorSplit: AlphaColor('--text-color', 0.2),
                        fontFamily: 'var(--font)',
                        iconMarginInlineEnd: 10,
                        fontSize: sizeMap[size]['fontSize'],
                        itemHeight: sizeMap[size]['lineHeight'],
                        iconSize: sizeMap[size]['fontSize'] + 3,
                    },
                },
            }}
        >
            <Menu
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
