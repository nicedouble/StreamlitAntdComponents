#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/6 16:50
@Author   : ji hao ran
@File     : tree.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from typing import Union, List

import streamlit_antd_components as sac
from streamlit_antd_components.utils import MantineSize, MantineColor, MantineFont


def theme(
        color: Union[MantineColor, str] = None,
        background_color: Union[MantineColor, str] = None,
        size: Union[MantineSize, int] = None,
        font: Union[MantineFont, str] = None,
) -> List[Union[str, int]]:
    """antd theme.

    :param color: alert color,support 'success', 'info', 'warning', 'error' and mantine color, hex and rgb color
    :param background_color: alert background color,support mantine color, hex and rgb color
    :param size: alert size,support mantine size and int in px
    :param font: alert font,support mantine font and str
    """
    sac._theme = dict(color=color, background_color=background_color, size=size, font=font)


if not hasattr(sac, '_theme'):
    theme()
