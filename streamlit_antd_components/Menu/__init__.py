#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/4/28 13:47
@Author   : ji hao ran
@File     : __init__.py.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""

import os
from typing import List, Union
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
class MenuDivider:
    dashed: bool = False

    @property
    def menu_items(self):
        return {'type': 'divider', 'dashed': self.dashed}


@dataclass
class MenuItem:
    label: str  # item label
    key: str  # item key,must be unique
    icon: str = None  # item icon,bootstrap icons https://icons.getbootstrap.com/
    disabled: bool = False  # item disabled
    href: str = None  # item link address
    children_as_group: bool = False  # item children as a group style
    children: List = None  # item children,list of TreeItem or MenuDivider

    @property
    def menu_items(self):
        # antd menu items shape
        base_dict = {'label': self.label, 'key': self.key, 'href': self.href}
        if self.children_as_group:
            if self.children is None:
                return {**base_dict, 'type': 'group'}
            else:
                return {**base_dict, 'type': 'group', 'children': self.children}
        else:
            if self.children is None:
                return {**base_dict, 'icon': self.icon, 'disabled': self.disabled}
            else:
                return {**base_dict, 'icon': self.icon, 'disabled': self.disabled, 'children': self.children}


def _parse_items(items: List[Union[MenuItem, MenuDivider]]):
    r = []
    for i in items:
        d = i.menu_items.copy()
        if isinstance(i, MenuItem):
            children = d.get('children')
            if children:
                d.update(children=_parse_items(children))
        r.append(d)
    return r


def _is_keys_unique(data):
    keys = []

    def _get_key(data):
        for i in range(len(data)):
            node = data[i]
            if node.get('key'):
                keys.append(node['key'])
            if node.get('children'):
                _get_key(node['children'])

    _get_key(data)
    if len(keys) != len(set(keys)):
        duplicate_keys = [i for i in keys if keys.count(i) > 1]
        raise ValueError(f'All key in data must be unique! duplicate keys: {duplicate_keys}')


def antd_menu(
        items: List[Union[MenuItem, MenuDivider]],
        selected_key: str = None,
        expand_keys: List[str] = None,
        width: int = None,
        indent: int = 24,
        key=None
) -> str:
    """antd design menu component https://ant.design/components/menu#menu

    :param items: menu item content
    :param selected_key: default selected key
    :param expand_keys: default expand key.if none,will expand selected parent key
    :param width: menu width in px
    :param indent: menu indent in px
    :param key: component unique identifier
    :return: current select item key
    """
    parse_items = _parse_items(items)
    _is_keys_unique(parse_items)
    r = _component_func(
        items=parse_items,
        defaultSelectedKeys=[selected_key],
        defaultOpenKeys=expand_keys,
        width=width,
        inlineIndent=indent,
        key=key
    )
    if r is None and selected_key is not None:
        return selected_key
    return r


if __name__ == '__main__':
    items = [
        MenuItem('Homepage', 'homepage', icon='house'),
        MenuItem('App', 'app', icon='app', children=[
            MenuItem('Store', 'store', icon='bag-check'),
            MenuItem('Brand', 'brand', icon='award', children=[
                MenuItem('Github', 'github', icon='github'),
                MenuItem('Google', 'google', icon='google'),
                MenuItem('Apple', 'apple', icon='apple'),
            ]),
        ]),
        MenuItem('Setting', 'setting', icon='gear', children=[
            MenuItem('Admin', 'admin', icon='person-circle'),
            MenuItem('Guest', 'guest', icon='person'),
        ]),
        MenuItem('Disabled', 'disabled', icon='send', disabled=True),
        MenuDivider(),
        MenuItem('Reference', 'reference', children_as_group=True, children=[
            MenuItem('Antd Design menu', 'antd', icon='heart', href='https://ant.design/components/menu#menu'),
            MenuItem('Bootstrap icon', 'icon', icon='bootstrap', href='https://icons.getbootstrap.com/'),
            MenuItem('streamlit-components-tutorial', 'sct', icon='info-circle',
                     href='https://streamlit-components-tutorial.netlify.app/'),
        ]),
    ]
    with st.sidebar.container():
        item = antd_menu(
            items=items,
            selected_key='apple',
        )
    st.write(f'The selected item key is **{item}**')
