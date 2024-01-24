#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/6 10:12
@Author   : ji hao ran
@File     : buttons.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from typing import List, Union, Literal, Callable, Tuple, Any, Dict

import streamlit_antd_components.utils as u
from streamlit_antd_components.utils import MantineSize, MantineFont, MantineColor, Align, Direction


def buttons(
        items: List[Union[str, dict, u.ButtonsItem]],
        index: Literal[0, 1] = 0,
        format_func: Union[u.Formatter, Callable] = None,
        label: str = None,
        description: str = None,
        radius: Union[MantineSize, int] = 'md',
        variant: Literal['filled', 'outline', 'dashed', 'text', 'link'] = 'outline',
        align: Align = 'start',
        direction: Direction = 'horizontal',
        gap: Union[MantineSize, int] = 'sm',
        use_container_width: bool = False,
        return_index: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None,
        color: Union[MantineColor, str] = None,
        background_color: Union[MantineColor, str] = None,
        size: Union[MantineSize, int] = None,
        font: Union[MantineFont, str] = None,

) -> Union[str, int, None]:
    """antd design a group of buttons

    :param items: buttons data
    :param index: default selected button index.if none,click button will not show active style
    :param format_func: item label formatter function,receive str and return str
    :param label: buttons label,support str and markdown str
    :param description: buttons description,support str and markdown str
    :param size: button size,support mantine size and int in px
    :param radius: button radius,support mantine size and int in px
    :param variant: buttons variant
    :param align: buttons align,available when direction='horizontal'
    :param direction: buttons direction
    :param gap: buttons gap,support mantine size and int in px.set as 0 to display compact mode
    :param use_container_width: makes the buttons stretch its width to match the parent container
    :param return_index: if True,return button index,default return label
    :param on_change: item change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component unique identifier
    :param color: alert color,support 'success', 'info', 'warning', 'error' and mantine color, hex and rgb color
    :param background_color: alert background color,support mantine color, hex and rgb color
    :param size: alert size,support mantine size and int in px
    :param font: alert font,support mantine font and str
	:return: selected button label or index
    """
    # register callback
    u.register(key, on_change, args, kwargs)
    # parse items
    items, kv = u.ParseItems(items, format_func).single()
    # component params
    kw = u.update_kw(locals(), items=items)
    # component default
    default = u.get_default(index, return_index, kv)
    # pass component id and params to frontend
    return u.component(id=u.get_func_name(), kw=kw, default=default, key=key)
