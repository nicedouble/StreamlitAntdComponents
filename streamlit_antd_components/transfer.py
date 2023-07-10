#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/7 10:04
@Author   : ji hao ran
@File     : transfer.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from .utils import *


def transfer(
        items: List[str],
        index: List[int] = None,
        label: List[str] = None,
        format_func: Union[Label, Callable] = None,
        search: bool = False,
        pagination: bool = False,
        oneway: bool = False,
        disabled: bool = False,
        width: Union[int, str] = None,
        height: int = None,
        return_index=False,
        key=None
) -> List[Union[str, int]]:
    """antd design transfer  https://ant.design/components/transfer

    :param items: transfer source data
    :param index: transfer default target data index
    :param label: transfer label,[left,right]
    :param format_func: item format func
    :param search: show search bar
    :param pagination: show pagination
    :param oneway: oneway mode
    :param disabled: disable transfer
    :param width: width in px
    :param height: height in px
    :param return_index: return item index
    :param key: component unique identifier
    :return: selected transfer label or index
    """
    # parse items
    items, kv = ParseItems(items, format_func).transfer()
    # component params
    kw = parse_kw(locals(), items)
    # pass component id and params to frontend
    r = component_func(id='transfer', kw=kw)
    # parse result
    return ParseResult(r, index, return_index, kv).multi_level
