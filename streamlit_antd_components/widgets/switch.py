#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/12 16:28
@Author   : ji hao ran
@File     : switch.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from ..utils import *


def switch(
        label: str = None,
        value: bool = False,
        checked: Union[str, BsIcon] = None,
        unchecked: Union[str, BsIcon] = None,
        align: Align = 'start',
        position: Position = 'top',
        size: Size = 'middle',
        disabled: bool = False,
        key=None
) -> bool:
    """antd design switch  https://ant.design/components/switch

    :param label: switch label,markdown and html with bootstrap available
    :param value: default value
    :param checked: checked content,str or BsIcon
    :param unchecked: unchecked content,str or BsIcon
    :param align: switch horizontal align
    :param position: switch label position
    :param size: switch size
    :param disabled: disabled status
    :param key: component unique identifier
    :return: True when open,False when close
    """
    # parse icon
    kw = dict(locals())
    kw.update(checked={'bs': checked.__dict__.get('name')} if isinstance(checked, BsIcon) else checked)
    kw.update(unchecked={'bs': unchecked.__dict__.get('name')} if isinstance(unchecked, BsIcon) else unchecked)
    # pass component id and params to frontend
    r = component_func(id='switch', kw=kw)
    # parse result
    return value if r is None else r
