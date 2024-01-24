#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/25 9:15
@Author   : ji hao ran
@File     : steps.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from typing import List, Union, Literal, Callable, Tuple, Any, Dict

import streamlit_antd_components.utils as u
from streamlit_antd_components.utils import MantineSize, MantineFont, MantineColor, StepsItem, Direction, Formatter

MantineFont


def steps(
        items: List[Union[str, dict, StepsItem]],
        index: int = 0,
        format_func: Union[Formatter, Callable] = None,
        variant: Literal['default', 'navigation'] = 'default',
        placement: Direction = 'horizontal',
        direction: Direction = 'horizontal',
        dot: bool = False,
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
    """antd design steps

    :param items: steps items
    :param index: default select item index
    :param format_func: label formatter function,receive str and return str
    :param size: steps size,support mantine size and int in px
    :param variant: steps variant
    :param placement: item title placement
    :param direction: steps direction
    :param dot: dot style steps
    :param return_index: return select item index
    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component key
    :param color: alert color,support 'success', 'info', 'warning', 'error' and mantine color, hex and rgb color
    :param background_color: alert background color,support mantine color, hex and rgb color
    :param size: alert size,support mantine size and int in px
    :param font: alert font,support mantine font and str
	:return: selected item title or index
    """
    # register callback
    u.register(key, on_change, args, kwargs)
    # parse items
    items, kv = u.ParseItems(items, format_func).single(label_field='title')
    # component params
    kw = u.update_kw(locals(), items=items)
    # component default
    default = u.get_default(index, return_index, kv)
    # pass component id and params to frontend
    return u.component(id=u.get_func_name(), kw=kw, default=default, key=key)
