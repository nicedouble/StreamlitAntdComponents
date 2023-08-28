#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/8/23 14:19
@Author   : ji hao ran
@File     : datepicker.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from ..utils import *


def datepicker(
        label: str = None,
        picker: PICKER = 'date',
        placeholder: Union[str, List[str]] = None,
        show_range: bool = False,
        show_time: bool = False,
        bordered: bool = True,
        disabled: Union[bool, List[bool]] = False,
        key=None,
):
    """antd design date-picker https://ant.design/components/date-picker

    :param label: datepicker label
    :param picker: picker type
    :param placeholder: placeholder
    :param show_range: date range picker
    :param show_time: show time picker
    :param bordered: bordered style
    :param disabled: disable datepicker
    :param key: component key
    :return: date for date range
    """
    # pass component id and params to frontend
    r = component_func(id=get_func_name(), kw=locals())
    # parse result
    return r
