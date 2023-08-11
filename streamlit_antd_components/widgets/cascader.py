#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/7 10:23
@Author   : ji hao ran
@File     : cascader.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from ..utils import *


def cascader(
        label: str = None,
        items: List[Union[str, dict, CasItem]] = None,
        index: Union[int, List[int]] = None,
        format_func: Union[Label, Callable] = None,
        placeholder: str = 'Please choose',
        multiple: bool = False,
        disabled: bool = False,
        search: bool = False,
        clear: bool = False,
        strict: bool = False,
        return_index: bool = False,
        key=None
) -> List[Union[str, int]]:
    """antd design cascader  https://ant.design/components/cascader

    :param label: cascader label
    :param items: cascader data
    :param index: default selected cascader item index
    :param format_func: label formatter function,receive str and return str
    :param placeholder: placeholder
    :param multiple: multiple select
    :param disabled: disabled status
    :param search: allow search
    :param clear: add clear all button
    :param strict: parent item and children item are not associated
    :param return_index: if True,return item index,default return label
    :param key: component unique identifier
    :return: list of selected item label or index
    """
    # parse items
    items, kv = ParseItems(items, format_func).multi(field='value')
    # component params
    kw = parse_kw(locals(), items)
    # pass component id and params to frontend
    r = component_func(id='cascader', kw=kw)
    # parse result
    return ParseResult(r, index, return_index, kv).multi
