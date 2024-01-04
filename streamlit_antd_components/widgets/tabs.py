#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/6 10:36
@Author   : ji hao ran
@File     : tabs.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from ..utils import *


def tabs(
        items: List[Union[str, dict, TabsItem]],
        index: int = 0,
        format_func: Union[Formatter, Callable] = None,
        align: Align = 'start',
        position: Position = 'top',
        size: Union[MantineSize, int] = 'md',
        variant: Literal['default', 'outline'] = 'default',
        color: Union[MantineColor, str] = None,
        height: int = None,
        use_container_width: bool = False,
        return_index: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None
) -> Union[str, int]:
    """antd design tabs  https://ant.design/components/tabs

    :param items: tabs data
    :param index: default selected tab index
    :param format_func: label formatter function,receive str and return str
    :param align: tabs align,available when position in ['top','bottom']
    :param position: tabs position
    :param size: tabs size,support mantine size and int in px
    :param variant: tabs variant
    :param color: tabs color,default streamlit primary color,support mantine color, hex and rgb color
    :param height: set height in px,available when position in ['right','left']
    :param use_container_width: makes the tabs stretch its width to match the parent container,available when position in ['top','bottom']
    :param return_index: if True,return tab index,default return label
    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component unique identifier
    :return: selected tab label or index
    """
    # register callback
    register(key, on_change, args, kwargs)
    # parse items
    items, kv = ParseItems(items, format_func).single()
    # component params
    kw = update_kw(locals(), items=items)
    # component default
    default = get_default(index, return_index, kv)
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=default, key=key)
