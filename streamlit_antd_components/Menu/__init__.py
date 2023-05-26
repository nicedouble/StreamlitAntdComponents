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
from typing import List, Union, Callable
from dataclasses import dataclass
import streamlit.components.v1 as components

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
    icon: str = None  # item icon,bootstrap icons https://icons.getbootstrap.com/
    disabled: bool = False  # item disabled
    href: str = None  # item link address
    children_as_group: bool = False  # item children as a group style
    children: List = None  # item children,list of TreeItem or MenuDivider

    @property
    def menu_items(self):
        base_dict = {'label': self.label, 'href': self.href}
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


def _parse_items(items: List[Union[MenuItem, MenuDivider]], func):
    j, kv = 0, []

    def __parse_items(items: List[Union[MenuItem, MenuDivider]], func):
        r = []
        nonlocal j
        for i in items:
            item = i.menu_items.copy()
            kv.append(item.get('label'))
            children = item.get('children')
            item.update(key=str(j))
            j += 1
            if isinstance(i, MenuItem):
                if func is not None:
                    item.update(label=func(item.get('label')))
                if children:
                    item.update(children=__parse_items(children, func))
            r.append(item)
        return r

    antd_items = __parse_items(items, func)
    key_title = {idx: i for idx, i in enumerate(kv)}
    return antd_items, key_title


def menu(
        items: List[Union[MenuItem, MenuDivider]],
        index: int = 0,
        format_func: Callable = None,
        size: int = 16,
        indent: int = 24,
        open_index: List[int] = None,
        open_all: bool = False,
        return_index: bool = False,
        key=None
) -> Union[str, int]:
    """antd design menu component https://ant.design/components/menu#menu

    :param items: menu data
    :param index: default selected menu item index
    :param format_func: format label function,must return str
    :param size: menu item font size in px
    :param indent: menu item indent in px
    :param open_index: default opened indexes.if none,menu will open default index's all parent nodes.
    :param open_all: open all items.priority[open_all>open_index]
    :param return_index: if True,return menu item index,default return label
    :param key: component unique identifier
    :return: selected menu label or index
    """
    parse_items, kv = _parse_items(items, format_func)
    r = _component_func(
        items=parse_items,
        defaultSelectedKeys=str(index),
        defaultOpenKeys=[str(i) for i in open_index] if open_index is not None else open_index,
        expandAll=open_all,
        size=size,
        inlineIndent=indent,
        key=key
    )
    r = index if r is None else int(r)
    if not return_index and r is not None:
        return kv.get(r)
    return r
