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
        format_func: Union[Formatter, Callable] = None,
        label: str = None,
        description: str = None,
        size: Union[MantineSize, int] = 'md',
        radius: Union[MantineSize, int] = 'md',
        variant: Literal['filled', 'outline', 'dashed', 'text', 'link'] = 'outline',
        color: Union[MantineColor, str] = None,
        align: Align = 'start',
        direction: Direction = 'horizontal',
        gap: Union[MantineSize, int] = 'sm',
        use_container_width: bool = False,
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
    :param label: buttons label,support str and markdown str
    :param description: buttons description,support str and markdown str
    :param size: button size,support mantine size and int in px
    :param radius: button radius,support mantine size and int in px
    :param variant: buttons variant
    :param color: buttons color,default streamlit primary color,support mantine color, hex and rgb color
    :param align: buttons align,available when direction='horizontal'
    :param direction: buttons direction
    :param gap: buttons gap,support mantine size and int in px.set as 0 to display compact mode
    :param use_container_width: makes the buttons stretch its width to match the parent container
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
    kw = update_kw(locals(), items=items)
    # component default
    default = get_default(index, return_index, kv)
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=default, key=key)
