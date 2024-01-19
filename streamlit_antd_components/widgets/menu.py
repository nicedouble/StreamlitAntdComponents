#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/6 15:47
@Author   : ji hao ran
@File     : menu.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from ..utils import *


def menu(
        items: List[Union[str, dict, MenuItem]],
        index: int = 0,
        format_func: Union[Formatter, Callable] = None,
        size: Union[MantineSize, int] = 'md',
        variant: Literal['light', 'filled', 'subtle', 'left-bar', 'right-bar'] = 'light',
        color: Union[MantineColor, str] = None,
        indent: int = 24,
        height: int = None,
        open_index: List[int] = None,
        open_all: bool = False,
        return_index: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None
) -> Union[str, int]:
    """antd design menu component https://ant.design/components/menu#menu

    :param items: menu data
    :param index: default selected menu item index
    :param format_func: label formatter function,receive str and return str
    :param size: menu size,support mantine size and int in px
    :param variant: menu variant
    :param color: menu color,default streamlit primary color,support mantine color, hex and rgb color
    :param indent: menu item indent in px
    :param height: menu height in px
    :param open_index: default opened indexes.if none,menu will open default index's all parent nodes.
    :param open_all: open all items.priority[open_all>open_index]
    :param return_index: if True,return menu item index,default return label
    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component unique identifier
    :return: selected menu label or index
    """
    # register callback
    register(key, on_change, args, kwargs)
    # parse items
    items, kv = ParseItems(items, format_func).multi()
    # component params
    kw = update_kw(locals(), items=items)
    # component default
    default = get_default(index, return_index, kv)
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=default, key=key)
