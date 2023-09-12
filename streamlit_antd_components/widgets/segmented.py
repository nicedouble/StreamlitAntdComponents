#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/11 9:23
@Author   : ji hao ran
@File     : segmented.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from ..utils import *


def segmented(
        items: List[Union[str, dict, SegmentedItem]],
        index: int = 0,
        format_func: Union[Label, Callable] = None,
        radius: SIZE = 'md',
        size: SIZE = 'md',
        align: Align = 'start',
        direction: Direction = 'horizontal',
        grow: bool = False,
        disabled: bool = False,
        readonly: bool = False,
        return_index: bool = False,
        key=None,
) -> Union[str, int]:
    """mantine segmentedControl https://mantine.dev/core/segmented-control/

    :param items: segmented data
    :param index: default selected item index
    :param format_func: label formatter function,receive str and return str
    :param radius: segmented radius
    :param size: segmented size
    :param align: segmented align
    :param direction: segmented direction
    :param disabled: disable segmented
    :param readonly: readonly mode
    :param grow: width 100%
    :param return_index: if True,return button index,default return label
    :param key: component unique identifier
    :return: selected segmented item value or index
    """
    # parse items
    items, kv = ParseItems(items, format_func).single(key_field='value')
    # component params
    kw = parse_kw(locals(), items)
    # pass component id and params to frontend
    r = component_func(id='segmented', kw=kw)
    # parse result
    return ParseResult(r, index, return_index, kv).single()
