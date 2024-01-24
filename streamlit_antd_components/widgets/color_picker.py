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


def color_picker(
        label: str = None,
        description: str = None,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None,
        color: Union[MantineColor, str] = None,
        background_color: Union[MantineColor, str] = None,
        size: Union[MantineSize, int] = None,
        font: Union[MantineFont, str] = None,

) -> List[Union[str, int]]:
    """ant design color-picker  https://ant.design/components/color-picker

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
    # items, kv = u.ParseItems(items, format_func).multi(field='value')
    # parse index
    # component params
    kw = u.update_kw(locals())
    # component default
    # default = 0
    # pass component id and params to frontend
    return u.component(id=u.get_func_name(), kw=kw, key=key)
