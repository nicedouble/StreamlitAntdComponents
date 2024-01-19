#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/7 11:50
@Author   : ji hao ran
@File     : component_func.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
import json
import os
import streamlit.components.v1 as components
import streamlit as st
from dataclasses import is_dataclass
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


def convert_session_value(id, value, kv: dict, return_index: bool):
    if value is not None:
        list_value = value if isinstance(value, list) else [value]
        if len(list_value) == 0:
            return
        if kv is not None:
            # index list
            r = [k for k, v in kv.items() if (k if return_index else v) in list_value]
            if len(r) == 0:
                raise ValueError(f'{value} is invalid in {id} component !')
            return r if isinstance(value, list) else r[0]
        else:
            return value


class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if is_dataclass(obj):
            return obj.__dict__
        return super().default(obj)


def component(id, kw, default=None, key=None):
    # repair component session init value
    if key is not None and key not in st.session_state:
        st.session_state[key] = default
    # pass component session state value to frontend
    if key is not None:
        # convert value
        st_value = convert_session_value(id, st.session_state[key], kw.get('kv'), kw.get('return_index'))
        kw.update({"stValue": st_value})
    else:
        kw.update({"stValue": None})
    return component_func(id=id, kw=json.loads(json.dumps(kw, cls=CustomEncoder)), default=default, key=key)
