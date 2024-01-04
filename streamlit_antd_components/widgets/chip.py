#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/9/14 16:20
@Author   : ji hao ran
@File     : chip.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from ..utils import *


def chip(
        items: List[Union[str, dict, ChipItem]],
        index: Union[int, List[int]] = None,
        format_func: Union[Formatter, Callable] = None,
        label: str = None,
        description: str = None,
        align: Align = 'start',
        direction: Direction = 'horizontal',
        size: Union[MantineSize, int] = 'md',
        radius: Union[MantineSize, int] = 'lg',
        variant: Literal['outline', 'light', 'filled'] = 'filled',
        color: Union[MantineColor, str] = None,
        multiple: bool = False,
        return_index: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None,
) -> Union[str, int, List[str], List[int]]:
    """mantine chip https://mantine.dev/core/chip/

    :param items: chip items
    :param index: default select item index
    :param format_func: label formatter function,receive str and return str
    :param label: chip label,support str and markdown str
    :param description: chip description,support str and markdown str
    :param align: chip align
    :param direction: chip direction
    :param size: chip item size,support mantine size and int in px
    :param radius: chip item radius,support mantine size and int in px
    :param variant: chip item style
    :param color: chip color,default streamlit primary color,support mantine color, hex and rgb color
    :param multiple: chip multiple mode
    :param return_index: return select item index
    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component key
    :return: selected item label or index
    """
    # register callback
    register(key, on_change, args, kwargs)
    # parse items
    items, kv = ParseItems(items, format_func).single(key_field='value')
    # parse index
    if not multiple and isinstance(index, list):
        index = index[0]
    if multiple:
        index = update_index(index)
    # component params
    kw = update_kw(locals(), items=items)
    # component default
    default = get_default(index, return_index, kv)
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=default, key=key)
