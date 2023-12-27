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


def rate(
        label: str = None,
        value: float = 0,
        count: int = 5,
        symbol: Union[str, BsIcon] = None,
        align: Align = 'start',
        position: Position = 'top',
        half: bool = False,
        clear: bool = False,
        readonly: bool = False,
        size: int = 20,
        color: Union[MantineColor, str] = None,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None,
) -> float:
    """antd design rate https://ant.design/components/rate

    :param label: rate label,markdown and html with bootstrap available
    :param value: rate default value,must be divide by 0.5
    :param count: rate total count
    :param symbol: rate item symbol,default star,can be str or BsIcon
    :param align: rate align
    :param position: rate label position
    :param half: allow half select
    :param clear: allow double click to clear select
    :param readonly: readonly mode
    :param size: symbol size in px
    :param color: symbol color,default streamlit primary color,support mantine color, hex and rgb color
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
    kw.update(symbol={'bs': symbol.__dict__.get('name')} if isinstance(symbol, BsIcon) else symbol)
    kw = update_kw(kw)
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=value, key=key)
