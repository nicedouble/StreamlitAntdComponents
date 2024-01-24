#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/7 11:45
@Author   : ji hao ran
@File     : __init__.py.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
import inspect

from .callback import register
from .component_func import component
from .data_class import *
from .parser import *
from .setting import *


def get_func_name():
    return inspect.stack()[1][3]
