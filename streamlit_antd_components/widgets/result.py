#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/27 11:48
@Author   : ji hao ran
@File     : result.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from ..utils import *


def result(
        label: str = None,
        description: str = None,
        status: Status = 'info',
        icon: str = None,
        key=None,
):
    """antd design result https://ant.design/components/result

    :param label: result label,support str and markdown str
    :param description: result description,support str and markdown str
    :param status: result status
    :param icon: custom bs icon
    :param key: component unique identifier
    """
    # pass component id and params to frontend
    component(id=get_func_name(), kw=locals(), key=key)
