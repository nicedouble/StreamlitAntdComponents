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
        color: Union[Msg, MantineColor, str] = 'info',
        radius: MantineSize = 'md',
        icon: Union[bool, str] = False,
        closable: bool = False,
        banner: Union[bool, List[bool]] = False,
        key=None,
):
    """antd design alert https://ant.design/components/alert

    :param label: alert content,markdown and html with bootstrap available
    :param description: content description,markdown and html with bootstrap available
    :param color: alert color
    :param radius: alert radius
    :param icon: show icon
    :param closable: show close button
    :param banner: banner style,set list to control message and description banner.
    :param key: component unique identifier
    """
    # pass component id and params to frontend
    component(id=get_func_name(), kw=locals(), key=key)
