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
        format_func: Union[Formatter, Callable] = None,
        label: str = None,
        description: str = None,
        radius: Union[MantineSize, int] = 'sm',
        align: Align = 'start',
        check_all: Union[bool, str] = False,
        disabled: bool = False,
        return_index: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None,
        color: Union[MantineColor, str] = None,
        background_color: Union[MantineColor, str] = None,
        size: Union[MantineSize, int] = None,
        font: Union[MantineFont, str] = None,

) -> List[Union[str, int]]:
    """antd design checkbox https://ant.design/components/checkbox

    :param items: checkbox items
    :param index: default select item index
    :param format_func: label formatter function,receive str and return str
    :param label: checkbox label,support str and markdown str
    :param description: checkbox description,support str and markdown str
    :param size: checkbox item size
    :param radius: checkbox item radius

    :param align: checkbox align
    :param check_all: check all box label
    :param disabled: disable checkbox
    :param return_index: return select item index
    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component key
        :param color: alert color,support 'success', 'info', 'warning', 'error' and mantine color, hex and rgb color
    :param background_color: alert background color,support mantine color, hex and rgb color
    :param size: alert size,support mantine size and int in px
    :param font: alert font,support mantine font and str
	:return: selected item label or index
    """
    # register callback
    register(key, on_change, args, kwargs)
    # parse items
    items, kv = ParseItems(items, format_func).single(key_field='value')
    # parse index
    index = update_index(index)
    # component params
    kw = update_kw(locals(), items=items, index=index)
    # component default
    default = get_default(index, return_index, kv)
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=default, key=key)
