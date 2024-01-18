import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {Cascader, ConfigProvider} from 'antd';
import {CaretDownFilled, CaretRightFilled} from '@ant-design/icons';
import type {DefaultOptionType} from 'antd/es/cascader';
import {strToNode} from "../js/cascader.react";
import {reindex, GetColor, RgbaColor, insertStyle} from "../js/utils.react"
import '../css/cascader.css'
import {LabelWrap} from "./utils";

interface CascaderProp {
    label: any
    description: any
    items: any[]
    index: any
    placeholder: any
    disabled: boolean
    clear: boolean
    color: any
    search: boolean
    multiple: boolean
    strict: boolean
    return_index: boolean;
    kv: any;
}

const AntdCascader = (props: CascaderProp) => {
    //get data
    const label = props['label']
    const description = props['description']
    const items = strToNode(props.items)
    const index = reindex(props['index'], false)
    const placeholder = props['placeholder']
    const multiple = props['multiple']
    const disabled = props['disabled']
    const search = props['search']
    const color = props['color']
    const allowClear = props['clear']
    const strict = props['strict']
    const return_index = props['return_index']
    const kv = props['kv']
    const primaryColor = GetColor(color == null ? '--primary-color' : color)
    const textColor = GetColor('--text-color')

    // load css
    let borderStyle = `
        /*dropdown border*/
        .ant-select-dropdown {
            border: 1px solid ${RgbaColor(textColor, 0.1)};
        }
        /*vertical border*/
        ul.ant-cascader-menu:not(:last-child) {
            border-inline-end: 1px solid ${RgbaColor(textColor, 0.1)} !important;
        }
        .ant-cascader-menu-item-active .ant-cascader-menu-item-content{
            color:${primaryColor} !important
        }
    `
    let checkboxStyle = `
        .ant-select-selection-item{
            color: rgb(255, 255, 255);
        }
    `
    insertStyle('sac.cascader.style', multiple ? borderStyle + checkboxStyle : borderStyle)

    //state
    const [height, setHeight] = useState()

    // component height
    useEffect(() => Streamlit.setFrameHeight(height))

    //callback
    const onChange = (value: any) => {
        let v = value === undefined ? [] : value
        let flatten_value = Array.from(new Set(v.flat())).sort()
        const st = flatten_value.map((x: any) => return_index ? x : kv[x])
        Streamlit.setComponentValue(st)
    }
    const dropdownVisible = (visible: boolean) => {
        let labelHeight = label !== null ? 30 : 0
        // @ts-ignore
        setHeight(visible ? 230 + labelHeight : undefined)
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
            color: RgbaColor(textColor, 0.5),
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
                        controlItemBgHover: 'var(--secondary-background-color)',
                        controlItemBgActive: RgbaColor(primaryColor),
                        colorPrimary: primaryColor,
                        colorPrimaryHover: primaryColor,
                        colorTextDisabled: RgbaColor(textColor, 0.5),
                        colorBorder: RgbaColor(textColor, 0.3),
                    },
                    Select: {
                        colorBgContainer: 'var(--secondary-background-color)',
                        colorBgElevated: 'var(--background-color)',
                        colorBorder: 'var(--background-color) !important',
                        colorFillSecondary: primaryColor,
                        colorText: 'var(--text-color)',
                        colorTextPlaceholder: RgbaColor(textColor, 0.5),
                        colorIcon: '#fff',
                        colorIconHover: '#fff',
                        controlHeight: 40,
                        controlOutlineWidth: 0,
                        lineHeight: 1.6,
                        fontFamily: 'var(--font)',
                        borderRadius: 8,
                        colorBgContainerDisabled:'var(--secondary-background-color)',
                    },
                },
            }}
        >
            <LabelWrap
                label={label}
                desc={description}
                grow={true}
                children={
                    <Cascader
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
                        expandTrigger={'click'}
                        showCheckedStrategy={strict ? Cascader.SHOW_PARENT : Cascader.SHOW_CHILD}
                    />
                }
            />
        </ConfigProvider>
    );
};

export default AntdCascader
