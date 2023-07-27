#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/25 13:25
@Author   : ji hao ran
@File     : checkbox.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from ..utils import *


def checkbox(
        items: List[Union[str, dict, CheckboxItem]],
        index: Union[int, List[int]] = None,
        format_func: Union[Label, Callable] = None,
        check_all: bool = False,
        check_all_label: str = 'Check all',
        check_all_position: Position = 'top',
        align: Align = 'start',
        direction: Direction = 'horizontal',
        disabled: bool = False,
        return_index: bool = False,
        key=None,
) -> Union[str, int]:
    """antd design checkbox https://ant.design/components/checkbox

    :param items: checkbox items
    :param index: default select item index
    :param format_func: label formatter function,receive str and return str
    :param check_all: show check all box
    :param check_all_label: check all box label
    :param check_all_position: check all box position
    :param align: checkbox align
    :param direction: checkbox direction
    :param disabled: disable checkbox
    :param return_index: return select item index
    :param key: component key
    :return: selected item label or index
    """
    # parse items
    items, kv = ParseItems(items, format_func).single(key_field='value')
    # component params
    kw = parse_kw(locals(), items)
    # pass component id and params to frontend
    r = component_func(id='checkbox', kw=kw)
    # parse result
    # return r
    # r=index if r is None else r
    return ParseResult(r, index, return_index, kv).multi
