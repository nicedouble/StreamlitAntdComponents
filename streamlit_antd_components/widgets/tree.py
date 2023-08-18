#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/6 16:50
@Author   : ji hao ran
@File     : tree.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from ..utils import *


def tree(
        label: str = None,
        items: List[Union[str, dict, TreeItem]] = None,
        index: Union[int, List[int]] = None,
        format_func: Union[Label, Callable] = None,
        icon: str = None,
        height: int = None,
        open_index: List[int] = None,
        open_all: bool = False,
        checkbox: bool = False,
        checkbox_strict: bool = False,
        show_line: bool = True,
        return_index: bool = False,
        key=None
) -> List[Union[str, int]]:
    """antd design tree  https://ant.design/components/tree

    :param label: tree label,markdown and html with bootstrap available
    :param items: tree data
    :param index: default selected tree item index
    :param format_func: label formatter function,receive str and return str
    :param icon: bootstrap icon on all tree item. https://icons.getbootstrap.com/
    :param height: set height in px to scroll
    :param open_index: default opened indexes.if none,tree will open default index's parent nodes.
    :param open_all: open all items.priority[open_all>open_index]
    :param checkbox: show checkbox
    :param checkbox_strict: parent item and children item are not associated
    :param show_line: show line
    :param return_index: if True,return tree item index,default return label
    :param key: component unique identifier
    :return: list of selected item label or index
    """
    # parse items
    items, kv = ParseItems(items, format_func).multi()
    # component params
    kw = parse_kw(locals(), items)
    # pass component id and params to frontend
    r = component_func(id='tree', kw=kw)
    # parse result
    return ParseResult(r, [index] if isinstance(index, int) else index, return_index, kv).multi
