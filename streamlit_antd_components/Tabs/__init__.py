#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/5/24 13:29
@Author   : ji hao ran
@File     : __init__.py.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
import os
from typing import List, Union, Literal, Callable
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
class TabsItem:
    label: str = None  # label
    icon: str = None  # boostrap icon,https://icons.getbootstrap.com/
    disabled: bool = False  # disabled item


def _parse_items(items: List[Union[str, TabsItem]], func):
    r = []
    for i in items:
        item = i.__dict__.copy() if isinstance(i, TabsItem) else {'label': i}
        label = item.get('label')
        if label is None:
            item.update(label='')
        if func is not None:
            item.update(label=func(item.get('label')))
        r.append(item)
    return r


def tabs(
        items: List[Union[str, TabsItem]],
        index: int = 0,
        format_func: Callable = None,
        height: int = None,
        align: Literal["start", "center", "end"] = 'start',
        position: Literal["top", "right", "bottom", "left"] = 'top',
        shape: Literal['default', 'card'] = 'default',
        grow: bool = False,
        return_index: bool = False,
        key=None
) -> Union[str, int, None]:
    """antd design tabs  https://ant.design/components/tabs

    :param items: tabs data
    :param index: default selected tab index
    :param format_func: format label function,must return str
    :param height: set height in px,available when position in ['right','left']
    :param align: tabs align,available when position in ['top','bottom']
    :param position: tabs position
    :param shape: tabs shape
    :param grow: grow to fill space area,available when position in ['top','bottom']
    :param return_index: if True,return tab index,default return label
    :param key: component unique identifier
    :return: selected tab label or index
    """
    parse_items = _parse_items(items, format_func)
    r = _component_func(
        items=parse_items,
        index=index,
        align=align,
        tabPosition=position,
        shape=shape,
        height=height,
        grow=grow,
        key=key
    )
    r = index if r is None else r
    if not return_index:
        return items[r].__dict__.get('label') if isinstance(items[r], TabsItem) else items[r]
    return r
