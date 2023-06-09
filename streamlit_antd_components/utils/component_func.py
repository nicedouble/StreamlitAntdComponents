#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/7 11:50
@Author   : ji hao ran
@File     : component_func.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
import os
import streamlit.components.v1 as components
from .. import _RELEASE

if not _RELEASE:
    component_func = components.declare_component(
        "my_component",
        url="http://localhost:3000",
    )
else:
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    build_dir = os.path.join(parent_dir, "frontend/build")
    component_func = components.declare_component("my_component", path=build_dir)
