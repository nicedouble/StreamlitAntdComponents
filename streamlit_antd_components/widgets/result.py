#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/27 11:48
@Author   : ji hao ran
@File     : result.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from typing import Union

import streamlit_antd_components.utils as u
from streamlit_antd_components.utils import Status, BsIcon, AntIcon


def result(
        label: str = None,
        description: str = None,
        status: Status = 'info',
        icon: Union[str, BsIcon, AntIcon] = None,
        key=None,
):
    """antd design result https://ant.design/components/result

    :param label: result label,support str and markdown str
    :param description: result description,support str and markdown str
    :param status: result status
    :param icon: custom icon
    :param key: component unique identifier
    """
    # update icon
    kw = u.update_kw(locals(), icon=u.parse_icon(icon))
    # pass component id and params to frontend
    u.component(id=u.get_func_name(), kw=kw, key=key)
