#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/7 10:23
@Author   : ji hao ran
@File     : cascader.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from .utils import *


def cascader(
        label: str,
        items: List[Union[dict, CasItem]],
        default: List[str] = None,
        format_func: Union[Label, Callable] = None,
        placeholder: str = 'Please choose',
        multiple: bool = False,
        disabled: bool = False,
        search: bool = False,
        clear: bool = False,
        strict: bool = False,
        max_selections: int = None,
        return_index: bool = False,
        key=None
) -> List[Union[str, int]]:
    # parse items
    items, kv = ParseItems(items, format_func).multi_level
    # component params
    kw = parse_kw(locals(), items)
    # pass component id and params to frontend
    r = component_func(id='cascader', kw=kw)
    # parse result
    return ParseResult(r, default, return_index, kv).multi_level

