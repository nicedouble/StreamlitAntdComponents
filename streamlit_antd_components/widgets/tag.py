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


def tag(
        label: str,
        color: Union[str, Color] = None,
        icon: str = None,
        link: str = None,
        bordered: bool = True,
        closable: bool = False,
        key=None
) -> None:
    """antd design tag  https://ant.design/components/tag

    :param label: tag label
    :param color: label formatter function,receive str and return str
    :param icon: tag align
    :param link: tag direction
    :param bordered: show tag border
    :param closable: show tag close button
    :param key: component unique identifier
    """
    # pass component id and params to frontend
    r = component_func(id='tag', kw=locals())
    # parse result
    return r


def tags(
        items: Union[str, dict, Tag],
        format_func: Union[Label, Callable] = None,
        align: Align = 'start',
        direction: Direction = 'horizontal',
        checkable: bool = False,
        key=None
):
    """antd design tag  https://ant.design/components/tag

    :param items: tags items
    :param format_func: label formatter function,receive str and return str
    :param align: tags align
    :param direction: tags direction
    :param checkable: tags checkable mode
    :param key: component unique identifier
    """
    # parse items
    items, kv = ParseItems(items, format_func).single()
    # component params
    kw = locals()
    kw.update(items=items)
    del kw['format_func']
    # pass component id and params to frontend
    r = component_func(id='tags', kw=kw)
    # parse result
    return [kv.get(i) for i in r] if checkable and isinstance(r, list) else None
