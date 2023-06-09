import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Cascader, ConfigProvider} from 'antd';
import {CaretDownFilled, CaretRightFilled} from '@ant-design/icons';
import type {DefaultOptionType} from 'antd/es/cascader';
import {strToNode, CascaderStyle} from "./cascader.react";
import {AlphaColor, reindex} from "../utils.react"
import './cascader.css'


interface CascaderProp {
    items: any[]
    index: any
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
    const items = strToNode(props['items'])
    const index = reindex(props['index'], false)
    const placeholder = props['placeholder']
    const multiple = props['multiple']
    const disabled = props['disabled']
    const search = props['search']
    const allowClear = props['clear']
    const strict = props['strict']
    const key = props['key']

    // load css
    CascaderStyle(multiple)

    //state
    const [height, setHeight] = useState()

    // component height
    useEffect(() => Streamlit.setFrameHeight(height))

    //callback
    const onChange = (value: any) => {
        let v = value === undefined ? [] : value
        let flatten_value = Array.from(new Set(v.flat())).sort()
        Streamlit.setComponentValue(flatten_value)
    }
    const dropdownVisible = (visible: boolean) => {
        // @ts-ignore
        setHeight(visible ? 75 + 180 : undefined)
    }

    //search
    const filter = (inputValue: string, path: DefaultOptionType[]) => {
        return path.some(
            (option) => (option.rawLabel as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
        )
    }
    // search not found
    const notFoundContent = () => {
        return <div style={{
            textAlign: 'center',
            color: AlphaColor('--text-color', 0.5),
            padding: '70px 0'
        }}>No results</div>
    }

    //display render
    const displayRender = (labels: string[], selectedOptions?: DefaultOptionType[] | undefined) =>
        labels.map((label, i) => {
            if (selectedOptions !== undefined) {
                const option = selectedOptions[i];
                if (option !== null && option !== undefined) {
                    if (i === labels.length - 1) {
                        return (
                            <span key={option.value}>{option.rawLabel}</span>
                        );
                    }
                    return <span key={option.value}>{option.rawLabel} / </span>;
                }
            }
            return <span/>
        })


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
            <Cascader
                id={key}
                options={items}
                onChange={onChange}
                placeholder={placeholder}
                multiple={multiple}
                disabled={disabled}
                allowClear={allowClear}
                showSearch={search && {filter}}
                dropdownMatchSelectWidth={true}
                style={{width: '100%'}}
                suffixIcon={<CaretDownFilled/>}
                expandIcon={<CaretRightFilled/>}
                maxTagCount={'responsive'}
                maxTagTextLength={13}
                defaultValue={index}
                popupClassName={'shadow-none'}
                onDropdownVisibleChange={dropdownVisible}
                notFoundContent={notFoundContent()}
                displayRender={displayRender}
                showCheckedStrategy={strict ? Cascader.SHOW_PARENT : Cascader.SHOW_CHILD}
            />
        </ConfigProvider>
    );
};

export default AntdCascader
