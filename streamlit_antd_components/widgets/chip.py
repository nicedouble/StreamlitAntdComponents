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
        format_func: Union[Label, Callable] = None,
        label: str = None,
        align: Align = 'start',
        position: Position = 'top',
        direction: Direction = 'horizontal',
        radius: SIZE = 'lg',
        size: SIZE = 'md',
        variant: Variant = 'filled',
        multiple: bool = True,
        return_index: bool = False,
        key=None,
) -> Union[str, int]:
    """mantine chip https://mantine.dev/core/chip/

    :param items: chip items
    :param index: default select item index
    :param format_func: label formatter function,receive str and return str
    :param label: chip label,markdown and html with bootstrap available
    :param align: chip align
    :param position: chip label position
    :param direction: chip direction
    :param radius: chip item radius
    :param size: chip item size
    :param variant: chip item style
    :param multiple: chip multiple mode
    :param return_index: return select item index
    :param key: component key
    :return: selected item label or index
    """
    # parse items
    items, kv = ParseItems(items, format_func).single(key_field='value')
    # parse index
    if not multiple and isinstance(index, list):
        index = index[0]
    if multiple:
        if isinstance(index, int):
            index = [index]
        if index is None:
            index = []
    # component params
    kw = parse_kw(locals(), items)
    # pass component id and params to frontend
    r = component_func(id=get_func_name(), kw=kw)
    # parse result
    if multiple:
        r = ParseResult(r, index, return_index, kv).multi
        return [] if r is None else r
    else:
        r = ParseResult(r, index, return_index, kv).single()
        return r
