#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/12 15:15
@Author   : ji hao ran
@File     : divider.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

from typing import Union, Literal

import streamlit_antd_components.utils as u
from streamlit_antd_components.utils import MantineSize, MantineColor, Align, BsIcon, AntIcon, \
    MantineFont


def divider(
        label: str = None,
        icon: Union[str, BsIcon, AntIcon] = None,
        align: Align = 'center',
        variant: Literal['solid', 'dashed', 'dotted'] = 'solid',
        key=None,
        color: Union[MantineColor, str] = None,
        background_color: Union[MantineColor, str] = None,
        size: Union[MantineSize, int] = "xs",
        font: Union[MantineFont, str] = None,

):
    """mantine divider component https://v6.mantine.dev/core/divider/

    :param label: divider text label,support str and markdown str
    :param icon: divider text icon
    :param align: label align
    :param size: divider size,support mantine size and int in px
    :param variant: divider variant
            
    
    
   divider color
    :param key: component unique identifier
    """
    # update icon
    kw = u.update_kw(locals(), icon=u.parse_icon(icon))
    # pass component id and params to frontend
    u.component(id=u.get_func_name(), kw=kw, key=key)
