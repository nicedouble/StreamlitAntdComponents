#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/5/12 10:45
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
class TreeItem:
    label: str  # label
    icon: str = None  # boostrap icon,https://icons.getbootstrap.com/
    disabled: bool = False  # disabled item
    children: List = None  # item children,list of TreeItem

    @property
    def tree_items(self):
        base_dict = {'title': self.label}
        if self.icon:
            base_dict.update({'icon': self.icon})
        if self.disabled:
            base_dict.update({'disabled': self.disabled})
        if self.children:
            base_dict.update({'children': self.children})
        return base_dict


def _parse_items(items: List[TreeItem], func):
    j, kv = 0, []

    def __parse_items(items: List[TreeItem], func):
        r = []
        nonlocal j
        for i in items:
            item = i.tree_items.copy()
            kv.append(item.get('title'))
            children = item.get('children')
            item.update(key=j)
            j += 1
            if func is not None:
                item.update(title=func(item.get('title')))
            if children:
                item.update(children=__parse_items(children, func))
            r.append(item)
        return r

    antd_items = __parse_items(items, func)
    key_title = {idx: i for idx, i in enumerate(kv)}
    return antd_items, key_title


def tree(
        items: List[TreeItem],
        index: List[int] = None,
        format_func: Callable = None,
        icon: str = None,
        height: int = None,
        open_index: List[int] = None,
        open_all: bool = False,
        checkbox: bool = False,
        checkbox_strict: bool = False,
        multiple: bool = False,
        show_line: bool = False,
        return_index: bool = False,
        key=None
) -> List[Union[str, int]]:
    """antd design tree  https://ant.design/components/tree

    :param items: tree data
    :param index: default selected tree item index
    :param format_func: format label function,must return str
    :param icon: bootstrap icon on all tree item. https://icons.getbootstrap.com/
    :param height: set height in px to scroll
    :param open_index: default opened indexes.if none,tree will open default index's parent nodes.
    :param open_all: open all items.priority[open_all>open_index]
    :param checkbox: show checkbox
    :param checkbox_strict: parent item and children item are not associated
    :param multiple: multiple select,available when checkbox=False
    :param show_line: show line
    :param return_index: if True,return tree item index,default return label
    :param key: component unique identifier
    :return: list of selected item label or index
    """
    parse_items, kv = _parse_items(items, format_func)
    if isinstance(index, list) and len(index) > 1 and not checkbox:
        multiple = True
    r = _component_func(
        treeData=parse_items,
        defaultSelectedKey=index,
        defaultExpandedKey=open_index,
        defaultExpandAll=open_all,
        checkable=checkbox,
        checkStrictly=checkbox_strict,
        multiple=multiple,
        showLine=show_line,
        icon=icon,
        height=height,
        key=key
    )
    r = index if r is None else r
    if not return_index and r is not None:
        return [kv.get(i) for i in r]
    return r
