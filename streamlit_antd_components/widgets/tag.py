#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/8/2 15:16
@Author   : ji hao ran
@File     : tag.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from ..utils import *


def tags(
        items: List[Union[str, dict, Tag]],
        format_func: Union[Formatter, Callable] = None,
        align: Align = 'start',
        direction: Direction = 'horizontal',
        size: Union[MantineSize, int] = 'sm',
        radius: Union[MantineSize, int] = 'md',
        color: Union[Color, str] = None,
        key=None
):
    """antd design tag  https://ant.design/components/tag

    :param items: tags items
    :param format_func: label formatter function,receive str and return str
    :param align: tags align
    :param direction: tags direction
    :param size: tags size,support mantine size and int in px
    :param radius: tags radius,support mantine size and int in px
    :param color: tags color,support ant color, hex and rgb color
    :param key: component unique identifier
    """
    # parse items
    items, kv = ParseItems(items, format_func).single()
    # component params
    kw = update_kw(locals(), items=items)
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=[], key=key)
