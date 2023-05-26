import {Streamlit, ComponentProps, withStreamlitConnection} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import type {TreeProps} from 'antd/es/tree';
import {Tree, ConfigProvider} from 'antd';
import {CaretDownFilled} from '@ant-design/icons';
import {strToNode, AlphaColor, treeHeight, getCollapseKeys, getParents} from "./custom.react";
import './custom.css'


const AntdTree = (props: ComponentProps) => {
    //get data
    const treeData = strToNode(props.args['treeData']);
    const dsk = props.args['defaultSelectedKey']
    const defaultExpandedKey = props.args['defaultExpandedKey']
    const dea = props.args['defaultExpandAll']
    const dek = dea ? getCollapseKeys(treeData) : defaultExpandedKey ? defaultExpandedKey : dsk && getParents(dsk, treeData)
    const icon = props.args['icon']
    const height = props.args['height']


    //state
    const [value, setValue] = useState(dsk)
    const [autoHeight, setAutoHeight] = useState(treeHeight(dek, treeData))

    // component height
    useEffect(() => Streamlit.setFrameHeight(height!=null?height:autoHeight))

    //callback
    const onExpand: TreeProps['onExpand'] = (e) => {
        //update component height
        setAutoHeight(treeHeight(e, treeData))
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
                        fontSize:14,
                        fontFamily:'var(--font)',
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
                    defaultExpandedKeys={dek}
                    treeData={treeData}
                    showLine={props.args['showLine']}
                    multiple={props.args['multiple']}
                    checkable={props.args['checkable']}
                    selectable={!props.args['checkable']}
                    height={height}
                    checkStrictly={props.args['checkStrictly']}
                    switcherIcon={<CaretDownFilled/>}
                    showIcon={true}
                    icon={icon && <i className={`bi bi-${icon}`}/>}
                    style={{whiteSpace: 'nowrap', overflowX: 'auto', overflowY: 'hidden'}}
                />
            </div>
        </ConfigProvider>
    );
};

export default withStreamlitConnection(AntdTree)
