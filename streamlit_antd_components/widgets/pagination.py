#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/8/9 13:40
@Author   : ji hao ran
@File     : pagination.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from ..utils import *


def pagination(
        total: int = 0,
        index: int = 1,
        page_size: int = 10,
        align: Align = 'start',
        circle: bool = False,
        disabled: bool = False,
        jump: bool = False,
        simple: bool = False,
        show_total: bool = False,
        key=None,
) -> float:
    """antd design pagination https://ant.design/components/pagination

    :param total: total number of data items
    :param index: default initial page number
    :param page_size: number of data items per page
    :param align: pagination align
    :param circle: circle style
    :param disabled: disable pagination status
    :param jump: determine whether you can jump to pages directly
    :param simple: simple mode
    :param show_total: To display the total number and range
    :param key: component key
    :return: select value
    """
    # pass component id and params to frontend
    r = component_func(id=get_func_name(), kw=locals())
    # parse result
    return r if r is not None else index
