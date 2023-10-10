import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Checkbox, ConfigProvider} from 'antd';
import type {CheckboxValueType} from "antd/es/checkbox/Group";
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import {AlphaColor, LabelComponent} from "../js/utils.react"

interface CheckboxProp {
    label: any
    items: any[]
    index: any
    check_all: boolean
    position: 'top' | 'right' | 'bottom' | 'left'
    align: string
    disabled: boolean
    return_index: boolean;
    kv: any;
}

const AntdCheckbox = (props: CheckboxProp) => {
    //get data
    const items = props['items']
    let index = props['index']
    const check_all = props['check_all']
    const label = props['label']
    const position = props['position']
    const align = props['align']
    const disabled = props['disabled']
    const return_index = props['return_index']
    const kv = props['kv']
    const allIndex = disabled ? [] : items.filter(item => !item.disabled).map(item => item.value)

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    //state
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(index)

    const initState = (x: number[], y: number[]) => {
        if (x.length === y.length) {
            return {'checkAll': true, 'indeterminate': false}
        } else {
            if (x.length > 0) {
                return {'checkAll': false, 'indeterminate': true}
            } else {
                return {'checkAll': false, 'indeterminate': false}
            }
        }
    }
    const [indeterminate, setIndeterminate] = useState(initState(index, allIndex)['indeterminate']);
    const [checkAll, setCheckAll] = useState(initState(index, allIndex)['checkAll']);

    //callback
    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list)
        setIndeterminate(!!list.length && list.length < allIndex.length);
        setCheckAll(list.length === allIndex.length)
        Streamlit.setComponentValue(list.map((x: any) => return_index ? x : kv[x]))
    }
    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        let stValue = e.target.checked ? allIndex : [];
        setCheckedList(stValue);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
        Streamlit.setComponentValue(stValue.map((x: any) => return_index ? x : kv[x]))
    };

    const checkAllElement = (x: boolean) => {
        if (x) {
            return <Checkbox
                indeterminate={indeterminate}
                checked={checkAll}
                onChange={onCheckAllChange}
                style={{paddingRight: 8, whiteSpace: "nowrap"}}
            >
                {'All'}
            </Checkbox>
        } else {
            return undefined
        }
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Checkbox: {
                        colorText: '--text-color',
                        colorPrimary: 'var(--primary-color)',
                        colorPrimaryHover: 'transform',
                        colorBgContainer: '--background-color',
                        colorTextDisabled: AlphaColor('--text-color', 0.5),
                        colorBgContainerDisabled: AlphaColor('--text-color', 0.2),
                        colorBorder: AlphaColor('--text-color', 0.3),
                        fontSize: 16,
                    },
                },
            }}
        >
            <LabelComponent
                label={label}
                align={align}
                position={position}
                children={
                    <div className={`d-flex flex-row align-items-start`}>
                        {checkAllElement(check_all)}
                        <Checkbox.Group
                            options={items}
                            disabled={disabled}
                            defaultValue={index}
                            value={checkedList}
                            onChange={onChange}
                        />
                    </div>
                }
            />
        </ConfigProvider>
    );
};

export default AntdCheckbox
