#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/7 10:04
@Author   : ji hao ran
@File     : transfer.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from ..utils import *


def transfer(
        label: str = None,
        items: List[str] = None,
        index: List[int] = None,
        titles: List[str] = None,
        format_func: Union[Label, Callable] = None,
        search: bool = False,
        pagination: bool = False,
        oneway: bool = False,
        disabled: bool = False,
        reload: Union[bool, str] = False,
        width: Union[int, str] = None,
        height: int = None,
        return_index=False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None
) -> List[Union[str, int]]:
    """antd design transfer  https://ant.design/components/transfer

    :param label: transfer label,markdown and html with bootstrap available
    :param items: transfer source data
    :param index: transfer default target data index
    :param titles: transfer left and right box title,[left,right]
    :param format_func: label formatter function,receive str and return str
    :param search: show search bar
    :param pagination: show pagination
    :param oneway: oneway mode
    :param disabled: disable transfer
    :param reload: reload button,set str to rename button label
    :param width: width in px
    :param height: height in px
    :param return_index: return item index
    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component unique identifier
    :return: selected transfer label or index
    """
    # register callback
    register(key, on_change, args, kwargs)
    # parse items
    items, kv = ParseItems(items, format_func).transfer()
    # component params
    kw = update_kw(locals(), items=items)
    # component default
    default = get_default(index, return_index, kv)
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=default, key=key)
