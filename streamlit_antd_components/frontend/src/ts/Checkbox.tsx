import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useRef, useState} from "react";
import {Checkbox, ConfigProvider} from 'antd';
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import {GetColor, getSize, insertStyle, MartineRadiusSize, RgbaColor} from "../js/utils.react"
import {LabelWrap} from "./utils";

interface CheckboxProp {
    label: any
    description: any
    items: any[]
    index: any
    check_all: boolean | string
    radius: any
    size: any
    color: any
    align: string
    disabled: boolean
    return_index: boolean;
    kv: any;
    stValue: any
}

const AntdCheckbox = (props: CheckboxProp) => {
    //get data
    const items = props['items']
    const index = props['index']
    const check_all = props['check_all']
    const label = props['label']
    const description = props['description']
    const radius = props['radius']
    const size = props['size']
    const color = props['color']
    const align = props['align']
    const disabled = props['disabled']
    const return_index = props['return_index']
    const kv = props['kv']
    const allIndex = disabled ? [] : items.filter(item => !item.disabled).map(item => item.value)
    const primaryColor = GetColor(color == null ? '--primary-color' : color)
    const textColor = GetColor('--text-color')
    const bgColor = GetColor('--background-color')

    // component height
    useEffect(() => Streamlit.setFrameHeight())

    const textStyle = `
    .ant-checkbox-inner{
        border-radius:${getSize(radius, MartineRadiusSize)}px !important
    }
    .ant-checkbox-indeterminate .ant-checkbox-inner:after{
        width:50% !important;
        height:50% !important
    }
    .ant-checkbox-checked .ant-checkbox-inner:after{
        top:45% !important
    }
    `
    insertStyle(`sac.checkbox.style`, textStyle)

    //state
    const [checkedList, setCheckedList] = useState<string[]>(index)

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
    const onChange = (list: string[]) => {
        setCheckedList(list)
        setIndeterminate(!!list.length && list.length < allIndex.length);
        setCheckAll(list.length === allIndex.length)
        Streamlit.setComponentValue(list.map((x: any) => return_index ? x : kv[x]))
    }
    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        const stValue = e.target.checked ? allIndex : [];
        setCheckedList(stValue);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
        Streamlit.setComponentValue(stValue.map((x: any) => return_index ? x : kv[x]))
    };

    //listen index
    const prevIndex = useRef(props['index'])
    const prevStValue = useRef(props['stValue'])

    useEffect(() => {
        const i = props['index']
        const st_i = props['stValue']
        if (String(i) !== String(prevIndex.current)) {
            setCheckedList(i);
            prevIndex.current = props['index']
            Streamlit.setComponentValue(i.map((x: any) => return_index ? x : kv[x]))
        }
        if (String(st_i) !== String(prevStValue.current)) {
            const st_ii = Array.isArray(st_i) ? st_i : [st_i]
            setCheckedList(st_ii);
            prevStValue.current = props['stValue']
            Streamlit.setComponentValue(st_ii.map((x: any) => return_index ? x : kv[x]))
        }
    }, [props, kv, return_index])

    const checkAllElement = (x: boolean | string) => {
        if (String(x) === 'false') {
            return undefined
        } else {
            return <Checkbox
                indeterminate={indeterminate}
                checked={checkAll}
                onChange={onCheckAllChange}
                style={{paddingRight: 8, whiteSpace: "nowrap"}}
            >
                {String(x) === 'true' ? 'Check all' : x}
            </Checkbox>
        }
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Checkbox: {
                        colorText: '--text-color',
                        colorPrimary: primaryColor,
                        colorPrimaryHover: 'transform',
                        colorBgContainer: bgColor,
                        colorTextDisabled: RgbaColor(textColor, 0.5),
                        colorBgContainerDisabled: RgbaColor(textColor),
                        colorBorder: RgbaColor(textColor, 0.3),
                        fontSize: getSize(size),
                        controlInteractiveSize: 2 * getSize(size) - 10,
                    },
                },
            }}
        >
            <LabelWrap
                label={label}
                desc={description}
                align={align}
                size={size}
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
