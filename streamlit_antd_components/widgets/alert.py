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
        message: str,
        description: str = None,
        type: Msg = 'info',
        height: int = None,
        icon: bool = False,
        closable: bool = False,
        banner: bool = False,
        key=None,
):
    """antd design alert https://ant.design/components/alert

    :param message: alert content
    :param description: content description
    :param type: alert type
    :param height: alert height,used when banner==True and description is not None
    :param icon: show icon
    :param closable: show close button
    :param banner: alert as banner
    :param key: component unique identifier
    """
    # pass component id and params to frontend
    r = component_func(id='alert', kw=locals())
