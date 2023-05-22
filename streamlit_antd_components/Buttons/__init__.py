#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/5/18 9:43
@Author   : ji hao ran
@File     : __init__.py.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
import os
from typing import List
from dataclasses import dataclass
import streamlit.components.v1 as components
import streamlit as st

_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        "my_component",
        url="http://localhost:3000",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("my_component", path=build_dir)


@dataclass
class ButtonsItem:
    label: str = None  # label
    icon: str = None  # boostrap icon,https://icons.getbootstrap.com/
    disabled: bool = False  # disabled item
    href: str = None  # link address


def _parse_items(items: List[ButtonsItem]):
    r = []
    for i in items:
        r.append(i.__dict__)
    return r


def antd_buttons(
        items: List[ButtonsItem],
        index: int = None,
        align: str = 'start',
        direction: str = 'horizontal',
        type: str = "default",
        shape: str = 'default',
        compact: bool = False,
        grow: bool = False,
        active: bool = True,
        key=None
) -> str:
    """antd design a group of buttons

    :param items: buttons data
    :param index: default selected button index
    :param align: buttons align ["start","end","center","between","around"],
    :param direction: buttons direction ["horizontal","vertical"]
    :param type: buttons style type ["default", "primary"]
    :param shape: buttons shape type ["default", "round"]
    :param compact: buttons compact style
    :param grow: grow to fill space area
    :param active: click button to show active style.
    :param key: component unique identifier
    :return: selected button index
    """
    parse_items = _parse_items(items)
    r = _component_func(
        items=parse_items,
        index=index,
        align=align,
        direction=direction,
        type=type,
        shape=shape,
        compact=compact,
        grow=grow,
        active=active,
        key=key
    )
    if r is None and index is not None:
        return index
    return r


if __name__ == '__main__':
    st.set_page_config(layout='wide')
    with st.sidebar.container():
        index = st.selectbox('index', [None, 0, 1])
        align = st.selectbox('align', ["start", "end", "center", "between", "around"])
        direction = st.selectbox('direction', ["horizontal", "vertical"])
        type_ = st.selectbox('type', ["default", "primary"])
        shape = st.selectbox('shape', ["default", "round"])
        compact = st.checkbox('compact')
        grow = st.checkbox('grow')
        active = st.checkbox('active', True)
    btn = antd_buttons(
        items=[
            ButtonsItem(icon='wechat'),
            ButtonsItem(icon='wechat'),
            ButtonsItem('button'),
            ButtonsItem('github', icon='github'),
            ButtonsItem('gear', icon='gear'),
            ButtonsItem('google', disabled=True, icon='google'),
            ButtonsItem('link', href='https://www.baidu.com', icon='apple'),
        ],
        index=index,
        align=align,
        direction=direction,
        type=type_,
        shape=shape,
        compact=compact,
        grow=grow,
        active=active
    )
    st.write(btn)