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
        color: MantineColor = None,
        variant: Literal['solid', 'dashed', 'dotted'] = 'solid',
        size: Union[MantineSize, int] = 'xs',
        label_style: Dict[str, str] = None,
        key=None
):
    """mantine divider component https://v6.mantine.dev/core/divider/

    :param label: divider text label
    :param icon: divider text boostrap icon,https://icons.getbootstrap.com/
    :param align: label align
    :param color: divider color
    :param variant: divider variant
    :param size: divider size,support mantine size and int in px
    :param label_style: divider label style,such as {'font-size':'20px','font-weight':'bold','color':'red'}
    :param key: component unique identifier
    """
    # pass component id and params to frontend
    component(id=get_func_name(), kw=locals(), key=key)
