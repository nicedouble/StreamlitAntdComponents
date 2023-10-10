#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/6 10:12
@Author   : ji hao ran
@File     : buttons.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from ..utils import *


def buttons(
        items: List[Union[str, dict, ButtonsItem]],
        index: Union[int, None] = 0,
        format_func: Union[Label, Callable] = None,
        label: str = None,
        align: Align = 'start',
        position: Position = 'top',
        size: Size = 'middle',
        direction: Direction = 'horizontal',
        shape: Shape = 'default',
        type: Type = 'default',
        compact: bool = False,
        return_index: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None,
) -> Union[str, int, None]:
    """antd design a group of buttons

    :param items: buttons data
    :param index: default selected button index.if none,click button will not show active style
    :param format_func: item label formatter function,receive str and return str
    :param label: buttons label,markdown and html with bootstrap available
    :param align: buttons align,available when direction='horizontal'
    :param position: buttons label position
    :param size: buttons size
    :param direction: buttons direction
    :param shape: buttons shape
    :param type: buttons type
    :param compact: buttons compact style
    :param return_index: if True,return button index,default return label
    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component unique identifier
    :return: selected button label or index
    """
    # register callback
    register(key, on_change, args, kwargs)
    # parse items
    items, kv = ParseItems(items, format_func).single()
    # component params
    kw = update_kw(locals(), items)
    # component default
    default = get_default(index, return_index, kv)
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=default, key=key)
