#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/24 15:00
@Author   : ji hao ran
@File     : rate.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from ..utils import *
from dataclasses import is_dataclass


def rate(
        count: int = 5,
        value: float = 0,
        label: str = None,
        description: str = None,
        symbol: Union[str, BsIcon, AntIcon] = None,
        align: Align = 'start',
        size: Union[MantineSize, int] = 'md',
        color: Union[MantineColor, str] = None,
        half: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None,
) -> float:
    """antd design rate https://ant.design/components/rate

    :param count: rate total count
    :param value: rate default value,must be divide by 0.5
    :param label: rate label,support str and markdown str
    :param description: rate description,support str and markdown str
    :param symbol: rate item symbol,default star,can be str or BsIcon,AntIcon
    :param align: rate align
    :param size: symbol size,support mantine size and int in px
    :param color: symbol color,default streamlit primary color,support mantine color, hex and rgb color
    :param half: allow half select
    :param on_change: rate change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component key
    :return: select value
    """
    assert value % 0.5 == 0, 'value must be divisible by 0.5'
    if value % 1 != 0 and not half:
        raise ValueError('value must be int when half is False')
    # register callback
    register(key, on_change, args, kwargs)
    # component params
    kw = dict(locals())
    kw.update(symbol=parse_icon(symbol) if is_dataclass(symbol) else symbol)
    kw = update_kw(kw)
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=value, key=key)
