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

# global field type
Label = Literal['title', 'upper']
Align = Literal['start', 'center', 'end']
Direction = Literal["horizontal", "vertical"]
Size = Literal["large", "middle", "small"]
Msg = Literal['success', 'info', 'warning', 'error']
Status = Literal['success', 'info', 'warning', 'error', 'empty', 404, 405, 500]
Position = Literal["top", "right", "bottom", "left"]
Color = Literal['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
