import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Cascader, ConfigProvider} from 'antd';
import {CaretDownFilled, CaretRightFilled} from '@ant-design/icons';
import {strToNode, CascaderStyle} from "./cascader.react";
import {AlphaColor} from "../utils.react"
import './cascader.css'


interface CascaderProp{
    label:string
    items: any[]
    default: any
    max_selections: any
    placeholder: any
    disabled: boolean
    clear: boolean
    search: boolean
    multiple: boolean
    strict: boolean
    key: string | undefined
}

const AntdCascader = (props: CascaderProp) => {
    //get data
    const label = props['label']
    const items = strToNode(props['items'])
    const defaultValue = props['default']
    const placeholder = props['placeholder']
    const multiple = props['multiple']
    const disabled = props['disabled']
    const showSearch = props['search']
    const allowClear = props['clear']
    const strict = props['strict']
    const maxTagCount = props['max_selections']
    const key = props['key']

    // load css
    CascaderStyle(multiple)

    //state
    const [height, setHeight] = useState(undefined)

    // component height
    useEffect(() => Streamlit.setFrameHeight(height))

    //callback
    const onChange = (value: any) => {
        // setValue(selectedKeys_)
        console.log(value);
        Streamlit.setComponentValue(value);
    }

    const dropdownVisible = (visible: boolean) => {
        // setHeight(visible ? rootHeight + 180 : undefined)
    }


    return (
        <ConfigProvider
            theme={{
                components: {
                    Cascader: {
                        colorBgContainer: 'var(--background-color)',
                        colorBorder: AlphaColor('--text-color', 0.5),
                        controlItemBgHover: 'var(--secondary-background-color)',
                        controlItemBgActive: AlphaColor(),
                        colorPrimary: 'var(--primary-color)',
                        colorPrimaryHover: 'var(--primary-color)',
                        colorTextDisabled: AlphaColor('--text-color', 0.5),
                    },
                    Select: {
                        colorBgContainer: 'var(--secondary-background-color)',
                        colorBgElevated: 'var(--background-color)',
                        colorBorder: 'var(--background-color) !important',
                        colorFillSecondary: 'var(--primary-color)',
                        colorText: 'var(--text-color)',
                        colorTextPlaceholder: AlphaColor('--text-color', 0.5),
                        colorIcon: '#fff',
                        colorIconHover: '#fff',
                        controlHeight: 40,
                        controlOutlineWidth: 0,
                        lineHeight: 1.6,
                        fontFamily: 'var(--font)',
                    }
                },
            }}
        >
            <div className={'d-flex'} style={{margin: `0 0 ${label === '' ? 0 : 8}px`, fontSize: 14}}>{label}</div>
            <Cascader
                id={key}
                options={items}
                onChange={onChange}
                placeholder={placeholder}
                multiple={multiple}
                disabled={disabled}
                allowClear={allowClear}
                showSearch={showSearch}
                dropdownMatchSelectWidth={true}
                style={{width: '100%'}}
                suffixIcon={<CaretDownFilled/>}
                expandIcon={<CaretRightFilled/>}
                maxTagCount={maxTagCount}
                maxTagTextLength={13}
                defaultValue={defaultValue}
                popupClassName={'shadow-none'}
                onDropdownVisibleChange={dropdownVisible}
                notFoundContent={<div style={{textAlign: 'center', color: 'rgb(163, 168, 184)'}}>No results</div>}
                showCheckedStrategy={strict ? Cascader.SHOW_CHILD : Cascader.SHOW_PARENT}

            />
        </ConfigProvider>
    );
};

export default AntdCascader
