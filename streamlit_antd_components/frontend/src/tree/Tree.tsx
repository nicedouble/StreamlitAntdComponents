import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import type {TreeProps} from 'antd/es/tree';
import {Tree, ConfigProvider} from 'antd';
import {CaretDownFilled} from '@ant-design/icons';
import {strToNode, treeHeight} from "./tree.react";
import {AlphaColor, reindex, getCollapseKeys, getParentKeys, StreamlitScrollbar} from "../utils.react"
import './tree.css'

interface TreeProp {
    items: any[]
    index: any
    icon: any
    height: any
    open_index: any
    open_all: boolean
    checkbox: boolean
    checkbox_strict: boolean
    multiple: boolean
    show_line: boolean
    key: string | undefined
}

const AntdTree = (props: TreeProp) => {
    //get data
    const items = strToNode(props['items']);
    const dsk = reindex(props['index'], false)
    let dok = reindex(props['open_index'], false)
    const openAll = props['open_all']
    const icon = props['icon']
    const height = props['height']
    const checkable = props['checkbox']
    const checkStrictly = props['checkbox_strict']
    const multiple = props['multiple']
    const showLine = props['show_line']
    dok = openAll ? getCollapseKeys(items) : dok ? dok : dsk && getParentKeys(dsk, items)

    //state
    const [value, setValue] = useState(dsk)
    const [autoHeight, setAutoHeight] = useState(treeHeight(dok, items))

    // component height
    useEffect(() => Streamlit.setFrameHeight(height != null ? height : autoHeight))
    //scrollbar
    StreamlitScrollbar()
    //callback
    const onExpand: TreeProps['onExpand'] = (e) => {
        //update component height
        setAutoHeight(treeHeight(e, items))
    };
    const onSelect: TreeProps['onSelect'] = (selectedKeys_, info) => {
        setValue(selectedKeys_)
        Streamlit.setComponentValue(selectedKeys_);
    };
    const onCheck: TreeProps['onCheck'] = (checkedKeys_, info) => {
        let ck = (Array.isArray(checkedKeys_)) ? checkedKeys_ : checkedKeys_['checked']
        setValue(ck)
        Streamlit.setComponentValue(ck)
    }

    // antd menu component
    return (
        <ConfigProvider
            theme={{
                components: {
                    //custom tree theme
                    Tree: {
                        colorPrimary: 'var(--primary-color)',
                        colorPrimaryHover: 'var(--primary-color)',
                        colorBgContainer: 'var(--background-color)',
                        colorText: 'var(--text-color)',
                        colorTextDisabled: AlphaColor('--text-color', 0.5),
                        controlItemBgHover: AlphaColor('--text-color', 0.2),
                        controlItemBgActive: AlphaColor(),
                        fontSize: 14,
                        fontFamily: 'var(--font)',
                        colorBorder: AlphaColor('--text-color', 0.2),
                    },
                },
            }}
        >
            <div>
                <Tree
                    onSelect={onSelect}
                    onCheck={onCheck}
                    onExpand={onExpand}
                    selectedKeys={value}
                    checkedKeys={value}
                    defaultSelectedKeys={dsk}
                    defaultCheckedKeys={dsk}
                    defaultExpandedKeys={dok}
                    treeData={items}
                    showLine={showLine}
                    multiple={multiple}
                    checkable={checkable}
                    selectable={!checkable}
                    height={height}
                    checkStrictly={checkStrictly}
                    switcherIcon={<CaretDownFilled/>}
                    showIcon={true}
                    icon={icon && <i className={`bi bi-${icon}`}/>}
                    style={{whiteSpace: 'nowrap', overflowX: 'auto', overflowY: 'hidden'}}
                />
            </div>
        </ConfigProvider>
    );
};

export default AntdTree
