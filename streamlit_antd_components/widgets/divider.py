#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/12 15:15
@Author   : ji hao ran
@File     : divider.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from ..utils import *


def divider(
        label: str = None,
        icon: str = None,
        align: Align = 'start',
        direction: Direction = 'horizontal',
        dashed: bool = False,
        bold: bool = False,
        key=None
):
    """antd design divider component https://ant.design/components/divider

    :param label: divider text label
    :param icon: divider text boostrap icon,https://icons.getbootstrap.com/
    :param align: label align,available when direction='horizontal'
    :param direction: divider direction
    :param dashed: dashed style
    :param bold: label font weight bold
    :param key: component unique identifier
    """
    # pass component id and params to frontend
    component(id=get_func_name(), kw=locals(), key=key)
