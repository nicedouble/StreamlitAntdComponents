#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/11 13:12
@Author   : ji hao ran
@File     : alert.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from ..utils import *


def alert(
        label: str,
        description: str = None,
        size: Union[MantineSize, int] = 'md',
        color: Union[Msg, MantineColor, str] = 'info',
        radius: Union[MantineSize, int] = 'md',
        variant: Literal['light', 'filled', 'outline', 'transparent', 'quote', 'quote-light'] = 'light',
        icon: Union[bool, str, BsIcon, AntIcon] = False,
        closable: bool = False,
        banner: Union[bool, List[bool], Banner, List[Banner]] = False,
        key=None,
):
    """antd design alert https://ant.design/components/alert

    :param label: alert content,support str and markdown str
    :param description: content description,support str and markdown str
    :param size: alert size,support mantine size and int in px
    :param color: alert color,support 'success', 'info', 'warning', 'error' and mantine color, hex and rgb color
    :param radius: alert radius,support mantine size and int in px
    :param variant: alert variant
    :param icon: show icon or custom icon
    :param closable: show close button
    :param banner: banner style,set list to control message and description banner.
    :param key: component unique identifier
    """
    # update icon
    kw = update_kw(locals(), icon=parse_icon(icon))
    # pass component id and params to frontend
    component(id=get_func_name(), kw=kw, key=key)
