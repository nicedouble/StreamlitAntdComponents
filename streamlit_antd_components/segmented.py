#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/11 9:23
@Author   : ji hao ran
@File     : segmented.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from .utils import *


def segmented(
        items: List[Union[str, dict, SegmentedItem]],
        index: int = 0,
        format_func: Union[Label, Callable] = None,
        size: Size = 'middle',
        disabled: bool = False,
        use_container_width: bool = False,
        return_index: bool = False,
        key=None,
) -> Union[str, int]:
    """antd design segmented

    :param items: segmented data
    :param index: default selected item index
    :param format_func: format label function,must return str
    :param size: segmented item size
    :param disabled: disable segmented
    :param use_container_width: width 100%
    :param return_index: if True,return button index,default return label
    :param key: component unique identifier
    :return: selected segmented item value or index
    """
    # parse items
    items, kv = ParseItems(items, format_func).single_level(field='value')
    # component params
    kw = parse_kw(locals(), items)
    # pass component id and params to frontend
    r = component_func(id='segmented', kw=kw)
    # parse result
    return ParseResult(r, index, return_index, kv).single_level
