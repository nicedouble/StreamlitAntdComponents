#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/24 15:00
@Author   : ji hao ran
@File     : rate.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from dataclasses import is_dataclass
from typing import Union, Callable, Tuple, Any, Dict

import streamlit_antd_components.utils as u
from streamlit_antd_components.utils import MantineSize, MantineFont, MantineColor, Align, BsIcon, AntIcon


def rate(
        count: int = 5,
        value: float = 3,
        label: str = None,
        description: str = None,
        symbol: Union[str, BsIcon, AntIcon] = None,
        align: Align = 'center',
        half: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None,
        color: Union[MantineColor, str] = None,
        background_color: Union[MantineColor, str] = None,
        size: Union[MantineSize, int] = None,
        font: Union[MantineFont, str] = None,
) -> float:
    """antd design rate https://ant.design/components/rate

    :param count: rate total count
    :param value: rate default value,must be divide by 0.5
    :param label: rate label,support str and markdown str
    :param description: rate description,support str and markdown str
    :param symbol: rate item symbol,default star,can be str or BsIcon,AntIcon
    :param align: rate align
    :param size: symbol size,support mantine size and int in px
    :param half: allow half select
    :param on_change: rate change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component key
    :param color: alert color,support 'success', 'info', 'warning', 'error' and mantine color, hex and rgb color
    :param background_color: alert background color,support mantine color, hex and rgb color
    :param size: alert size,support mantine size and int in px
    :param font: alert font,support mantine font and str
	:return: select value
    """
    assert value % 0.5 == 0, 'value must be divisible by 0.5'
    if value % 1 != 0 and not half:
        raise ValueError('value must be int when half is False')
    # register callback
    u.register(key, on_change, args, kwargs)
    # component params
    kw = dict(locals())
    kw.update(symbol=u.parse_icon(symbol) if is_dataclass(symbol) else symbol)
    kw = u.update_kw(kw)
    # pass component id and params to frontend
    return u.component(id=u.get_func_name(), kw=kw, default=value, key=key)
