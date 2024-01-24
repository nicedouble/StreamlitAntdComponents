#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/8/2 15:16
@Author   : ji hao ran
@File     : tag.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from typing import List, Union, Callable

import streamlit_antd_components.utils as u
from streamlit_antd_components.utils import MantineSize, MantineFont, MantineColor, Align, Direction, \
    Formatter, Tag


def tags(
        items: List[Union[str, dict, Tag]],
        format_func: Union[Formatter, Callable] = None,
        align: Align = 'start',
        direction: Direction = 'horizontal',
        radius: Union[MantineSize, int] = 'md',
        key=None,
        color: Union[MantineColor, str] = None,
        background_color: Union[MantineColor, str] = None,
        size: Union[MantineSize, int] = None,
        font: Union[MantineFont, str] = None,

):
    """antd design tag  https://ant.design/components/tag

    :param items: tags items
    :param format_func: label formatter function,receive str and return str
    :param align: tags align
    :param direction: tags direction
    :param size: tags size,support mantine size and int in px
    :param radius: tags radius,support mantine size and int in px
    :param key: component unique identifier
    :param color: alert color,support 'success', 'info', 'warning', 'error' and mantine color, hex and rgb color
    :param background_color: alert background color,support mantine color, hex and rgb color
    :param size: alert size,support mantine size and int in px
    :param font: alert font,support mantine font and str
    """
    # parse items
    items, kv = u.ParseItems(items, format_func).single()
    # component params
    kw = u.update_kw(locals(), items=items)
    # pass component id and params to frontend
    return u.component(id=u.get_func_name(), kw=kw, default=[], key=key)
