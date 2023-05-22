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
class TreeItem:
    label: str  # label
    key: str  # must be unique in all data
    icon: str = None  # boostrap icon,https://icons.getbootstrap.com/
    disabled: bool = False  # disabled item
    children: List = None  # item children,list of TreeItem

    @property
    def tree_data(self):
        base_dict = {'title': self.label, 'key': self.key}
        if self.icon:
            base_dict.update({'icon': self.icon})
        if self.disabled:
            base_dict.update({'disabled': self.disabled})
        if self.children:
            base_dict.update({'children': self.children})
        return base_dict


def _parse_items(items: List[TreeItem]):
    r = []
    for i in items:
        d = i.tree_data.copy()
        children = d.get('children')
        if children:
            d.update(children=_parse_items(children))
        r.append(d)
    return r


def _is_keys_unique(items):
    keys = []

    def _get_key(items_):
        for i in range(len(items_)):
            node = items_[i]
            keys.append(node['key'])
            if node.get('children'):
                _get_key(node['children'])

    _get_key(items)
    if len(keys) != len(set(keys)):
        duplicate_keys = [i for i in keys if keys.count(i) > 1]
        raise ValueError(f'All key in data must be unique! duplicate keys: {duplicate_keys}')


def antd_tree(
        items: List[TreeItem],
        selected_keys: List[str] = None,
        expanded_keys: List[str] = None,
        expand_all: bool = False,
        checkbox: bool = False,
        checkbox_strict: bool = False,
        multiple=False,
        show_line: bool = False,
        icon: str = None,
        height: int = None,
        key=None
) -> List[str]:
    """antd design tree  https://ant.design/components/tree#tree-props

    :param items: tree data
    :param selected_keys: default selected keys
    :param expanded_keys: default expanded keys.if none,tree will auto expand all selected parent keys.
    :param expand_all: expand all key.expand priority[expand_all>expanded_keys>auto]
    :param checkbox: show checkbox
    :param checkbox_strict: parent key and children key are not associated
    :param multiple: allow multiple select
    :param show_line: show line
    :param icon: bootstrap icon in all key
    :param height: scroll height
    :param key: component unique identifier
    :return: list of current select item keys
    """
    parse_items = _parse_items(items)
    _is_keys_unique(parse_items)
    if isinstance(selected_keys, list) and len(selected_keys) > 1 and not checkbox:
        multiple = True
    r = _component_func(
        treeData=parse_items,
        defaultSelectedKey=selected_keys,
        defaultExpandedKey=expanded_keys,
        defaultExpandAll=expand_all,
        checkable=checkbox,
        checkStrictly=checkbox_strict,
        multiple=multiple,
        showLine=show_line,
        icon=icon,
        height=height,
        key=key
    )
    if r is None and selected_keys is not None:
        return selected_keys
    return r


if __name__ == '__main__':
    with st.sidebar.container():
        data = [
            TreeItem('table1', 'table1'),
            TreeItem('image', 'image', icon='images', children=[
                TreeItem('image1', 'image1', icon='image-alt'),
                TreeItem('image2', 'image2', icon='image-fill'),
            ]),
            TreeItem('table2', 'table2', children=[
                TreeItem('table2-1', 'table2-1'),
                TreeItem('table2-2', 'table2-2'),
            ]),
            TreeItem('table3', 'table3', disabled=True),
            TreeItem('table4', 'table4'),
        ]
        item = antd_tree(
            items=data,
            selected_keys=['image1'],
            checkbox=True,
            show_line=True,
            icon='table',
        )
    st.write(f'The selected item key is **{item}**')
