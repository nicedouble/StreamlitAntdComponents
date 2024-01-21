#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/9/14 16:20
@Author   : ji hao ran
@File     : chip.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from typing import List, Union, Literal, Callable, Tuple, Any, Dict

import streamlit_antd_components.utils as u
from streamlit_antd_components.utils import MantineSize, MantineFont, MantineColor, Align, Direction, \
    Formatter, ChipItem


def chip(
        items: List[Union[str, dict, ChipItem]],
        index: Union[int, List[int]] = None,
        format_func: Union[Formatter, Callable] = None,
        label: str = None,
        description: str = None,
        align: Align = 'start',
        direction: Direction = 'horizontal',
        radius: Union[MantineSize, int] = 'lg',
        variant: Literal['outline', 'light', 'filled'] = 'filled',
        multiple: bool = False,
        return_index: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None,
        color: Union[MantineColor, str] = None,
        background_color: Union[MantineColor, str] = None,
        size: Union[MantineSize, int] = None,
        font: Union[MantineFont, str] = None,

) -> Union[str, int, List[str], List[int]]:
    """mantine chip https://mantine.dev/core/chip/

    :param items: chip items
    :param index: default select item index
    :param format_func: label formatter function,receive str and return str
    :param label: chip label,support str and markdown str
    :param description: chip description,support str and markdown str
    :param align: chip align
    :param direction: chip direction
    :param size: chip item size,support mantine size and int in px
    :param radius: chip item radius,support mantine size and int in px
    :param variant: chip item style
    :param multiple: chip multiple mode
    :param return_index: return select item index
    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component key
    :param color: alert color,support 'success', 'info', 'warning', 'error' and mantine color, hex and rgb color
    :param background_color: alert background color,support mantine color, hex and rgb color
    :param size: alert size,support mantine size and int in px
    :param font: alert font,support mantine font and str
	:return: selected item label or index
    """
    # register callback
    u.register(key, on_change, args, kwargs)
    # parse items
    items, kv = u.ParseItems(items, format_func).single(key_field='value')
    # parse index
    if not multiple and isinstance(index, list):
        index = index[0]
    if multiple:
        index = u.update_index(index)
    # component params
    kw = u.update_kw(locals(), items=items)
    # component default
    default = u.get_default(index, return_index, kv)
    # pass component id and params to frontend
    return u.component(id=u.get_func_name(), kw=kw, default=default, key=key)
