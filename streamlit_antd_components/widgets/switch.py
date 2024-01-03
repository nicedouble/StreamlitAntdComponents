#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/12 16:28
@Author   : ji hao ran
@File     : switch.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from ..utils import *


def switch(
        label: str = None,
        description: str = None,
        value: bool = False,
        on_label: Union[str, BsIcon] = None,
        off_label: Union[str, BsIcon] = None,
        align: Align = 'start',
        position: MantinePosition = 'right',
        size: MantineSize = 'sm',
        radius: Union[MantineSize, int] = 'xl',
        on_color: Union[MantineColor, str] = None,
        off_color: Union[MantineColor, str] = None,
        disabled: bool = False,
        on_change: Callable = None,
        args: Tuple[Any, ...] = None,
        kwargs: Dict[str, Any] = None,
        key=None
) -> bool:
    """mantine switch  https://v6.mantine.dev/core/switch/

    :param label: switch label
    :param description: switch description
    :param value: default value
    :param on_label: switch on status label,str or BsIcon
    :param off_label: switch off status label,str or BsIcon
    :param align: switch align
    :param position: switch label position
    :param size: switch size,support mantine size
    :param radius: switch radius,support mantine size and int in px
    :param on_color: switch on status color,default streamlit primary color,support mantine color, hex and rgb color
    :param off_color: switch off status color,default streamlit secondary background color,support mantine color, hex and rgb color
    :param disabled: disabled status
    :param on_change: switch change callback
    :param args: callback args
    :param kwargs: callback kwargs
    :param key: component unique identifier
    :return: True when open,False when close
    """
    # register callback
    register(key, on_change, args, kwargs)
    # parse icon
    kw = dict(locals())
    kw.update(on_label={'bs': on_label.__dict__.get('name')} if isinstance(on_label, BsIcon) else on_label)
    kw.update(off_label={'bs': off_label.__dict__.get('name')} if isinstance(off_label, BsIcon) else off_label)
    kw = update_kw(kw)
    # pass component id and params to frontend
    return component(id=get_func_name(), kw=kw, default=value, key=key)
