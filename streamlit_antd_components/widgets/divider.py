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
        size: Union[MantineSize, int] = 'xs',
        label_size: Union[MantineSize, int] = 'md',
        variant: Literal['solid', 'dashed', 'dotted'] = 'solid',
        color: MantineColor = None,
        key=None
):
    """mantine divider component https://v6.mantine.dev/core/divider/

    :param label: divider text label,support str and markdown str
    :param icon: divider text boostrap icon,https://icons.getbootstrap.com/
    :param align: label align
    :param size: divider size,support mantine size and int in px
    :param label_size: divider label size,support mantine size and int in px
    :param variant: divider variant
    :param color: divider color
    :param key: component unique identifier
    """
    # pass component id and params to frontend
    component(id=get_func_name(), kw=locals(), key=key)
