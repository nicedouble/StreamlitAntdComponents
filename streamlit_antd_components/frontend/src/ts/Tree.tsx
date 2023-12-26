import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import type {TreeProps} from 'antd/es/tree';
import {Tree, ConfigProvider} from 'antd';
import {CaretDownFilled} from '@ant-design/icons';
import {strToNode} from "../js/tree.react";
import {
    AlphaColor,
    reindex,
    getCollapseKeys,
    getParentKeys,
    StreamlitScrollbar,
    LabelComponent, MartineFontSize, insertStyle, PrimaryColor
} from "../js/utils.react"
import '../css/tree.css'

interface TreeProp {
    label: any
    items: any[]
    index: any
    icon: any
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    color: any
    height: any
    open_index: any
    open_all: boolean
    checkbox: boolean
    checkbox_strict: boolean
    show_line: boolean
    return_index: boolean;
    kv: any;
}

const AntdTree = (props: TreeProp) => {
    //get data
    const label = props['label']
    const size = props['size']
    const items = strToNode(props.items, size, props.icon)
    const dsk = reindex(props.index, false)
    const openIndex = reindex(props.open_index, false)
    const openAll = props['open_all']
    const color = props['color']
    const height = props['height']
    const checkable = props['checkbox']
    const checkStrictly = props['checkbox_strict']
    const showLine = props['show_line']
    const return_index = props['return_index']
    const kv = props['kv']
    const dok = openAll ? getCollapseKeys(items) : openIndex ? openIndex : dsk && getParentKeys(dsk, items)
    const primaryColor = PrimaryColor(color).primaryColor
    const primaryLightColor = PrimaryColor(color).primaryLightColor

    //state
    const [value, setValue] = useState(dsk)

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //scrollbar
    StreamlitScrollbar()
    const textStyle = `
    span.ant-tree-node-content-wrapper.ant-tree-node-selected {
        color: ${primaryColor};
    }
    .ant-tree-switcher-icon {
        font-size: ${MartineFontSize[size] - 2}px !important;
    }
    .ant-tree-node-selected .tree-desc{
        color:${primaryColor} !important
    }
    `
    insertStyle(`sac.tree.selected`, textStyle)

    //callback
    const onExpand: TreeProps['onExpand'] = (e) => {
        Streamlit.setComponentValue(value.map((x: any) => return_index ? x : kv[x]));
    };
    const onSelect: TreeProps['onSelect'] = (selectedKeys_, info) => {
        setValue(selectedKeys_)
        Streamlit.setComponentValue(selectedKeys_.map((x: any) => return_index ? x : kv[x]));
    };
    const onCheck: TreeProps['onCheck'] = (checkedKeys_, info) => {
        let ck = (Array.isArray(checkedKeys_)) ? checkedKeys_ : checkedKeys_['checked']
        setValue(ck)
        Streamlit.setComponentValue(ck.map((x: any) => return_index ? x : kv[x]))
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tree: {
                        colorPrimary: primaryColor,
                        colorPrimaryHover: primaryColor,
                        colorBgContainer: 'transform',
                        colorText: 'var(--text-color)',
                        colorTextDisabled: AlphaColor('--text-color', 0.5),
                        controlItemBgHover: AlphaColor('--text-color', 0.1),
                        controlItemBgActive: primaryLightColor,
                        controlInteractiveSize: MartineFontSize[size],
                        fontSize: MartineFontSize[size],
                        fontFamily: 'var(--font)',
                        colorBorder: AlphaColor('--text-color', 0.3),
                    },
                },
            }}
        >
            <LabelComponent
                label={label}
                onlyLabel={true}
                children={
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
                        checkable={checkable}
                        selectable={!checkable}
                        height={height}
                        checkStrictly={checkStrictly}
                        switcherIcon={<CaretDownFilled/>}
                        blockNode={true}
                        virtual={false}
                        style={{
                            whiteSpace: 'nowrap', overflowX: 'hidden', overflowY: 'hidden',
                        }}
                    />
                }
            />
        </ConfigProvider>
    );
};

export default AntdTree
