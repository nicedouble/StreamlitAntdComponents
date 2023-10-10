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
import streamlit as st
from .. import _RELEASE

if not _RELEASE:
    component_func = components.declare_component(
        "sac",
        url="http://localhost:3000",
    )
else:
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    build_dir = os.path.join(parent_dir, "frontend/build")
    component_func = components.declare_component("sac", path=build_dir)


def component(id, kw, default=None, key=None):
    # repair component session init value
    if key is not None and key not in st.session_state:
        st.session_state[key] = default
    return component_func(id=id, kw=kw, default=default, key=key)
