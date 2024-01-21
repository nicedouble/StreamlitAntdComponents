#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/6 16:50
@Author   : ji hao ran
@File     : tree.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from typing import List, Union, Callable, Tuple, Any, Dict

import streamlit_antd_components.utils as u
from streamlit_antd_components.utils import MantineSize, MantineFont, MantineColor, Align, Formatter, BsIcon, \
    AntIcon, TreeItem


def tree(
        items: List[Union[str, dict, TreeItem]] = None,
        index: Union[int, List[int]] = None,
        format_func: Union[Formatter, Callable] = None,
        label: str = None,
        description: str = None,
        icon: Union[str, BsIcon, AntIcon] = None,
        align: Align = 'start',
        width: int = None,
        height: int = None,
        open_index: List[int] = None,
        open_all: bool = False,
        checkbox: bool = False,
        checkbox_strict: bool = False,
        show_line: bool = True,
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
    """antd design tree  https://ant.design/components/tree

    :param items: tree data
    :param index: default selected tree item index
    :param format_func: label formatter function,receive str and return str
    :param label: tree label,support str and markdown str
    :param description: tree description,support str and markdown str
    :param icon: tree item icon
    :param align: tree align
    :param size: tree size,support mantine size and int in px
    :param width: tree width
    :param height: tree height
    :param open_index: default opened indexes.if none,tree will open default index's parent nodes.
    :param open_all: open all items.priority[open_all>open_index]
    :param checkbox: show checkbox to allow multiple select
    :param checkbox_strict: parent item and children item are not associated
    :param show_line: show line
    :param return_index: if True,return tree item index,default return label
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
    if isinstance(index, list) and len(index) > 1 and not checkbox:
        raise ValueError(f'length of index ({len(index)}) should =1  when checkbox=False')
    # register callback
    u.register(key, on_change, args, kwargs)
    # parse items
    items, kv = u.ParseItems(items, format_func).multi()
    # parse index
    if index is None and checkbox:
        index = []
    if isinstance(index, int) and checkbox:
        index = [index]
    if isinstance(index, list) and not checkbox:
        index = index[0]
    # component params
    kw = u.update_kw(locals(), items=items, icon=u.parse_icon(icon))
    # component default
    default = u.get_default(index, return_index, kv)
    # pass component id and params to frontend
    return u.component(id=u.get_func_name(), kw=kw, default=default, key=key)
