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
        items: List[str] = None,
        index: List[int] = None,
        format_func: Union[Formatter, Callable] = None,
        label: str = None,
        description: str = None,
        titles: List[str] = None,
        align: Align = 'start',
        color: Union[MantineColor, str] = None,
        search: bool = False,
        pagination: bool = False,
        oneway: bool = False,
        disabled: bool = False,
        reload: Union[bool, str] = False,
        width: int = None,
        height: int = None,
        listStyle: Dict[str, Any] = None,
        use_container_width: bool = False,
        return_index: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None
) -> List[Union[str, int]]:
    """antd design transfer  https://ant.design/components/transfer

    :param items: transfer source data
    :param index: transfer default target data index
    :param format_func: label formatter function,receive str and return str
    :param label: transfer label,support str and markdown str
    :param description: transfer description,support str and markdown str
    :param titles: transfer left and right box title,[left,right]
    :param align: transfer align
    :param color: transfer color,default streamlit primary color,support mantine color, hex and rgb color
    :param search: show search bar
    :param pagination: show pagination
    :param oneway: oneway mode
    :param disabled: disable transfer
    :param reload: reload button,set str to rename button label
    :param width: width in px
    :param height: height in px
    :param listStyle: custom style for transfer list (e.g., {'color': 'white'})
    :param use_container_width: makes the transfer stretch its width to match the parent container
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
    kw = update_kw(locals(), items=items, **(kwargs or {}))
    
    # Include listStyle explicitly if provided
    if listStyle:
        kw['listStyle'] = listStyle
    
    # component default
    default = get_default(index, return_index, kv)
    
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=default, key=key)
