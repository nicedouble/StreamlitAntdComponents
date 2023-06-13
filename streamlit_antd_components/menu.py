#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/6 15:47
@Author   : ji hao ran
@File     : menu.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from .utils import *


def menu(
        items: List[Union[str, dict, MenuItem]],
        index: int = 0,
        format_func: Union[Label, Callable] = None,
        size: int = 16,
        indent: int = 24,
        open_index: List[int] = None,
        open_all: bool = False,
        return_index: bool = False,
        key=None
) -> Union[str, int]:
    """antd design menu component https://ant.design/components/menu#menu

    :param items: menu data
    :param index: default selected menu item index
    :param format_func: format label function,must return str
    :param size: menu item font size in px
    :param indent: menu item indent in px
    :param open_index: default opened indexes.if none,menu will open default index's all parent nodes.
    :param open_all: open all items.priority[open_all>open_index]
    :param return_index: if True,return menu item index,default return label
    :param key: component unique identifier
    :return: selected menu label or index
    """
    # parse items
    items, kv = ParseItems(items, format_func).multi_level()
    # component params
    kw = parse_kw(locals(), items)
    # pass component id and params to frontend
    r = component_func(id='menu', kw=kw)
    # parse result
    return ParseResult(r, index, return_index, kv).multi_level
