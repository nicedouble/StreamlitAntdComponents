#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/6 15:47
@Author   : ji hao ran
@File     : menu.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from typing import List, Union, Literal, Callable, Tuple, Any, Dict

import streamlit_antd_components.utils as u
from streamlit_antd_components.utils import MantineSize, MantineFont, MantineColor, Formatter, MenuItem


def menu(
        items: List[Union[str, dict, MenuItem]],
        index: int = 0,
        format_func: Union[Formatter, Callable] = None,
        variant: Literal['light', 'filled', 'subtle', 'left-bar', 'right-bar'] = 'light',
        indent: int = 24,
        height: int = None,
        open_index: List[int] = None,
        open_all: bool = False,
        return_index: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None,
        color: Union[MantineColor, str] = None,
        background_color: Union[MantineColor, str] = None,
        size: Union[MantineSize, int] = None,
        font: Union[MantineFont, str] = None,

) -> Union[str, int]:
    """antd design menu component https://ant.design/components/menu#menu

    :param items: menu data
    :param index: default selected menu item index
    :param format_func: label formatter function,receive str and return str
    :param size: menu size,support mantine size and int in px
    :param variant: menu variant
    :param indent: menu item indent in px
    :param height: menu height in px
    :param open_index: default opened indexes.if none,menu will open default index's all parent nodes.
    :param open_all: open all items.priority[open_all>open_index]
    :param return_index: if True,return menu item index,default return label
    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component unique identifier
    :param color: alert color,support 'success', 'info', 'warning', 'error' and mantine color, hex and rgb color
    :param background_color: alert background color,support mantine color, hex and rgb color
    :param size: alert size,support mantine size and int in px
    :param font: alert font,support mantine font and str
	:return: selected menu label or index
    """
    # register callback
    u.register(key, on_change, args, kwargs)
    # parse items
    items, kv = u.ParseItems(items, format_func).multi()
    # component params
    kw = u.update_kw(locals(), items=items)
    # component default
    default = u.get_default(index, return_index, kv)
    # pass component id and params to frontend
    return u.component(id=u.get_func_name(), kw=kw, default=default, key=key)
