#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/25 9:15
@Author   : ji hao ran
@File     : steps.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from ..utils import *


def steps(
        items: List[Union[str, dict, StepsItem]],
        index: int = 0,
        format_func: Union[Label, Callable] = None,
        placement: Direction = 'horizontal',
        size: Literal['default', 'small'] = 'default',
        direction: Direction = 'horizontal',
        type: Literal['default', 'navigation', 'inline'] = 'default',
        dot: bool = False,
        return_index: bool = False,
        key=None,
) -> Union[str, int]:
    """antd design steps

    :param items: steps items
    :param index: default select item index
    :param format_func: label formatter function,receive str and return str
    :param placement: item title placement
    :param size: steps size
    :param direction: steps direction
    :param type: steps type
    :param dot: dot style steps
    :param return_index: return select item index
    :param key: component key
    :return: selected item title or index
    """
    # parse items
    items, kv = ParseItems(items, format_func).single(label_field='title')
    # component params
    kw = parse_kw(locals(), items)
    # pass component id and params to frontend
    r = component_func(id='steps', kw=kw)
    # parse result
    return ParseResult(r, index, return_index, kv).single(label_field='title')
