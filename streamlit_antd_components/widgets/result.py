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
        title: str = None,
        subtitle: str = None,
        status: Status = 'info',
        icon: str = None,
        key=None,
):
    """antd design result https://ant.design/components/result

    :param title: result title,markdown and html with bootstrap available
    :param subtitle: result subtitle,markdown and html with bootstrap available
    :param status: result status
    :param icon: custom bs icon
    :param key: component unique identifier
    """
    # pass component id and params to frontend
    kw = locals()
    kw.update(title=str(status).title() if title is None else title)
    r = component_func(id='result', kw=kw)
