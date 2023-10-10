#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/8/2 15:16
@Author   : ji hao ran
@File     : tag.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from ..utils import *


def tags(
        items: Union[str, dict, Tag],
        format_func: Union[Label, Callable] = None,
        align: Align = 'start',
        direction: Direction = 'horizontal',
        checkable: bool = False,
        return_index: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None
):
    """antd design tag  https://ant.design/components/tag

    :param items: tags items
    :param format_func: label formatter function,receive str and return str
    :param align: tags align
    :param direction: tags direction
    :param checkable: tags checkable mode
    :param return_index: if True,return tags index,default return label
    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component unique identifier
    """
    # register callback
    register(key, on_change, args, kwargs)
    # parse items
    items, kv = ParseItems(items, format_func).single()
    # component params
    kw = update_kw(locals(), items)
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=[], key=key)
