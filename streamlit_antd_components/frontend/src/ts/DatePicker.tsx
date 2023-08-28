import {Streamlit} from "streamlit-component-lib";
import React, {useEffect, useState} from "react";
import {DatePicker, ConfigProvider} from 'antd';
import type {DatePickerProps} from "antd";
import {AlphaColor, LabelComponent, StreamlitScrollbar} from "../js/utils.react"
import '../css/datepicker.css'

interface DatePickerProp {
    label: any
    picker: any
    placeholder: any
    show_range: boolean
    show_time: boolean
    bordered: boolean
    disabled: boolean
    key: any
}

const AntdDatePicker = (props: DatePickerProp) => {
    //get data
    const label = props['label'];
    const picker = props['picker'];
    const placeholder = props['placeholder'];
    const disabled = props['disabled'];
    const show_range = props['show_range'];
    const show_time = props['show_time'];
    const bordered = props['bordered'];
    const key = props['key'];

    //height
    const labelHeight = label !== null ? 30 : 0
    const inputHeight = 45
    const popupHeight = 500

    // component
    const {RangePicker} = DatePicker;
    const Picker = (show_range ? RangePicker : DatePicker) as React.ElementType

    //state
    const [height, setHeight] = useState(labelHeight + inputHeight)

    // component height
    useEffect(() => Streamlit.setFrameHeight(height))

    //scrollbar style
    StreamlitScrollbar()

    //callback
    const datePickerChange: DatePickerProps['onChange'] = (date, ds) => {
        Streamlit.setComponentValue(ds)
    }
    const dateRangePickerChange = (value: any) => {
        Streamlit.setComponentValue(value)
    }
    const onOpenChange = (open: boolean) => {
        setHeight(open ? popupHeight : 0 + labelHeight + inputHeight)
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    DatePicker: {
                        colorBgContainer: 'var(--secondary-background-color)',
                        colorBgElevated: 'var(--background-color)',
                        colorText: 'var(--text-color)',
                        colorTextHeading: 'var(--text-color)',
                        colorTextDisabled: AlphaColor('--text-color', 0.2),
                        colorTextPlaceholder: AlphaColor('--text-color', 0.2),
                        colorLink: 'var(--primary-color)',
                        colorLinkHover: 'var(--primary-color)',
                        colorLinkActive: 'var(--primary-color)',
                        colorIcon: 'var(--text-color)',
                        colorIconHover: 'var(--primary-color)',
                        colorPrimary: 'var(--primary-color)',
                        colorPrimaryHover: 'transform',
                        colorSplit: AlphaColor('--text-color', 0.1),
                        borderRadius: 4,
                        controlHeight: inputHeight,
                        controlOutlineWidth: 0,
                        controlItemBgHover: AlphaColor('--text-color', 0.2),
                        controlItemBgActive: 'var(--primary-color)',
                        fontFamily: 'var(--font)',
                        colorBorder: 'var(--secondary-background-color)',
                    },
                    Button: {
                        colorPrimary: 'var(--primary-color)',
                        colorPrimaryHover: 'var(--primary-color)',
                    },
                },
            }}
        >
            <LabelComponent
                label={label}
                onlyLabel={true}
                children={
                    <Picker
                        key={key}
                        picker={picker}
                        disabled={disabled}
                        showTime={show_time}
                        bordered={bordered}
                        placeholder={placeholder}
                        style={{width: '100%'}}
                        onChange={show_range ? dateRangePickerChange : datePickerChange}
                        onOpenChange={onOpenChange}
                        popupStyle={{padding: '2px 10px'}}
                    />
                }
            />
        </ConfigProvider>
    );
};

export default AntdDatePicker
