#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/11 13:12
@Author   : ji hao ran
@File     : alert.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from typing import List, Union, Literal

import streamlit_antd_components.utils as u
from streamlit_antd_components.utils import MantineColor, MantineSize, MantineFont, BsIcon, AntIcon, Banner


def alert(
        label: str,
        description: str = None,
        radius: Union[u.MantineSize, int] = 'md',
        variant: Literal['light', 'filled', 'outline', 'transparent', 'quote', 'quote-light'] = 'light',
        icon: Union[bool, str, BsIcon, AntIcon] = True,
        closable: bool = True,
        banner: Union[bool, List[bool], Banner, List[Banner]] = True,
        key=None,
        color: Union[MantineColor, str] = None,
        background_color: Union[MantineColor, str] = None,
        size: Union[MantineSize, int] = None,
        font: Union[MantineFont, str] = None,

):
    """antd design alert https://ant.design/components/alert

    :param label: alert content,support str and markdown str
    :param description: content description,support str and markdown str
    :param radius: alert radius,support mantine size and int in px
    :param variant: alert variant
    :param icon: show icon or custom icon
    :param closable: show close button
    :param banner: banner style,set list to control message and description banner.
    :param key: component unique identifier
    :param color: alert color,support 'success', 'info', 'warning', 'error' and mantine color, hex and rgb color
    :param background_color: alert background color,support mantine color, hex and rgb color
    :param size: alert size,support mantine size and int in px
    :param font: alert font,support mantine font and str
    """
    # update icon
    kw = u.update_kw(locals(), icon=u.parse_icon(icon))
    # pass component id and params to frontend
    u.component(id=u.get_func_name(), kw=kw, key=key)
