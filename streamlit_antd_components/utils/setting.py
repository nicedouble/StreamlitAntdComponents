#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/7/26 13:43
@Author   : ji hao ran
@File     : global.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from typing import Literal

__all__ = [
    'Formatter', 'Align', 'Direction', 'MantineSize', 'Msg', 'Status', 'Position',
    'Color', 'MantineColor', 'MantinePosition',
]
# global field type
Formatter = Literal['title', 'upper']
Align = Literal['start', 'center', 'end']
Direction = Literal["horizontal", "vertical"]
Msg = Literal['success', 'info', 'warning', 'error']
Status = Literal['success', 'info', 'warning', 'error', 'empty', 404, 405, 500]
Position = Literal["top", "right", "bottom", "left"]
Color = Literal['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']

MantineSize = Literal['xs', 'sm', 'md', 'lg', 'xl']
MantinePosition = Literal["left", "right"]
MantineColor = Literal[
    'dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange'
]
