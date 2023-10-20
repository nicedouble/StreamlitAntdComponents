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
        position: Position = 'top',
        align: Align = 'start',
        check_all: Union[str] = None,
        disabled: bool = False,
        return_index: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None,
) -> Union[str, int]:
    """antd design checkbox https://ant.design/components/checkbox

    :param items: checkbox items
    :param index: default select item index
    :param format_func: label formatter function,receive str and return str
    :param label: checkbox label,markdown and html with bootstrap available
    :param position: checkbox label position
    :param align: checkbox align
    :param check_all: check all box label,default none to hidden
    :param disabled: disable checkbox
    :param return_index: return select item index
    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component key
    :return: selected item label or index
    """
    # register callback
    register(key, on_change, args, kwargs)
    # parse items
    items, kv = ParseItems(items, format_func).single(key_field='value')
    # parse index
    if isinstance(index, int):
        index = [index]
    if index is None:
        index = []
    # component params
    kw = update_kw(locals(), items)
    # component default
    default = get_default(index, return_index, kv)
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=default, key=key)
