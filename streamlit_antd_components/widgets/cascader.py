#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/7 10:23
@Author   : ji hao ran
@File     : cascader.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from typing import List, Union, Callable, Tuple, Any, Dict

import streamlit_antd_components.utils as u
from streamlit_antd_components.utils import MantineSize, MantineFont, MantineColor, Formatter, CasItem


def cascader(
        items: List[Union[str, dict, CasItem]] = None,
        index: Union[int, List[int]] = None,
        label: str = None,
        description: str = None,
        format_func: Union[Formatter, Callable] = None,
        placeholder: str = 'Please choose',
        multiple: bool = False,
        disabled: bool = False,
        search: bool = False,
        clear: bool = False,
        strict: bool = False,
        return_index: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None,
        color: Union[MantineColor, str] = None,
        background_color: Union[MantineColor, str] = None,
        size: Union[MantineSize, int] = None,
        font: Union[MantineFont, str] = None,

) -> List[Union[str, int]]:
    """antd design cascader  https://ant.design/components/cascader

    :param items: cascader data
    :param index: default selected cascader item index
    :param label: cascader label,support str and markdown str
    :param description: cascader description,support str and markdown str
    :param format_func: label formatter function,receive str and return str
    :param placeholder: placeholder
    :param multiple: multiple select
    :param disabled: disabled status
    :param search: allow search
    :param clear: add clear all button
    :param strict: parent item and children item are not associated
    :param return_index: if True,return item index,default return label
    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component unique identifier
    :param color: alert color,support 'success', 'info', 'warning', 'error' and mantine color, hex and rgb color
    :param background_color: alert background color,support mantine color, hex and rgb color
    :param size: alert size,support mantine size and int in px
    :param font: alert font,support mantine font and str

	:return: list of selected item label or index
    """
    # register callback
    u.register(key, on_change, args, kwargs)
    # parse items
    items, kv = u.ParseItems(items, format_func).multi(field='value')
    # parse index
    if index is None:
        index = []
    # component params
    kw = u.update_kw(locals(), items=items)
    # component default
    default = u.get_default(index, return_index, kv)
    # pass component id and params to frontend
    return u.component(id=u.get_func_name(), kw=kw, default=default, key=key)
