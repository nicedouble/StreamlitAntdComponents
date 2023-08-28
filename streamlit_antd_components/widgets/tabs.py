#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/6 10:36
@Author   : ji hao ran
@File     : tabs.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from ..utils import *


def tabs(
        items: List[Union[str, dict, TabsItem]],
        index: int = 0,
        format_func: Union[Label, Callable] = None,
        height: int = None,
        align: Align = 'start',
        position: Position = 'top',
        shape: Literal['default', 'card'] = 'default',
        grow: bool = False,
        return_index: bool = False,
        key=None
) -> Union[str, int, None]:
    """antd design tabs  https://ant.design/components/tabs

    :param items: tabs data
    :param index: default selected tab index
    :param format_func: label formatter function,receive str and return str
    :param height: set height in px,available when position in ['right','left']
    :param align: tabs align,available when position in ['top','bottom']
    :param position: tabs position
    :param shape: tabs shape
    :param grow: grow to fill space area,available when position in ['top','bottom']
    :param return_index: if True,return tab index,default return label
    :param key: component unique identifier
    :return: selected tab label or index
    """
    # parse items
    items, kv = ParseItems(items, format_func).single()
    # component params
    kw = parse_kw(locals(), items)
    # pass component id and params to frontend
    r = component_func(id=get_func_name(), kw=kw)
    # parse result
    return ParseResult(r, index, return_index, kv).single()
