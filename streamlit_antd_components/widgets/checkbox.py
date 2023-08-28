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
        label: str = None,
        align: Align = 'start',
        position: Position = 'top',
        check_all: bool = False,
        disabled: bool = False,
        return_index: bool = False,
        key=None,
) -> Union[str, int]:
    """antd design checkbox https://ant.design/components/checkbox

    :param items: checkbox items
    :param index: default select item index
    :param format_func: label formatter function,receive str and return str
    :param label: checkbox label,markdown and html with bootstrap available
    :param align: checkbox align
    :param position: checkbox label position
    :param check_all: show check all box
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
    r = component_func(id=get_func_name(), kw=kw)
    # parse result
    r = ParseResult(r, [index] if isinstance(index, int) else index, return_index, kv).multi
    return [] if r is None else r
