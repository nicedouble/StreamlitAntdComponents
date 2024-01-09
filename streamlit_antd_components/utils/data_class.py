#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/6/7 11:43
@Author   : ji hao ran
@File     : data_class.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from dataclasses import dataclass
from typing import List, Literal, Union
from .setting import Color, MantineSize, MantineColor

__all__ = [
    'BsIcon', 'AntIcon',
    'Tag',
    'StepsItem', 'ChipItem', 'CheckboxItem', 'ButtonsItem', 'SegmentedItem', 'TabsItem', 'CasItem', 'MenuItem',
    'TreeItem',
    'parse_icon'
]


@dataclass
class Icon:
    name: str
    size: Union[MantineSize, int] = None
    color: Union[MantineColor, str] = None

    def __post_init__(self):
        self.type = self.__class__.__name__


@dataclass
class BsIcon(Icon):
    pass


@dataclass
class AntIcon(Icon):
    pass


def parse_icon(icon):
    if isinstance(icon, str):
        icon = BsIcon(name=icon).__dict__
    elif isinstance(icon, BsIcon):
        icon = icon.__dict__
    elif isinstance(icon, AntIcon):
        icon = icon.__dict__
    return icon


def parse_tag(tag):
    if isinstance(tag, Tag):
        tag = tag.__dict__
    elif isinstance(tag, str):
        tag = Tag(tag).__dict__
    elif isinstance(tag, list):
        tag = [Tag(i).__dict__ if isinstance(i, str) else i.__dict__ for i in tag]
    return tag


@dataclass
class Item:
    label: str = ''  # item label
    icon: Union[str, BsIcon, AntIcon] = None  # item icon
    disabled: bool = False  # disabled item

    def __post_init__(self):
        self.icon = parse_icon(self.icon)


@dataclass
class NestedItem(Item):
    children: List = None  # item children


@dataclass
class Tag:
    label: str  # label
    color: Union[str, Color] = None  # color
    icon: Union[str, BsIcon, AntIcon] = None  # icon
    link: str = None  # hyperlink
    bordered: bool = True  # show border
    radius: Union[MantineSize, int] = 'md'
    size: Union[MantineSize, int] = 'sm'
    closable: bool = False  # show close button

    def __post_init__(self):
        self.icon = parse_icon(self.icon)


@dataclass
class StepsItem:
    title: str = ''
    subtitle: str = ''
    description: str = ''
    icon: Union[str, BsIcon, AntIcon] = None
    disabled: bool = False

    def __post_init__(self):
        self.icon = parse_icon(self.icon)


@dataclass
class CheckboxItem:
    label: str = ''
    disabled: bool = False


@dataclass
class ChipItem(Item):
    pass


@dataclass
class ButtonsItem(Item):
    href: str = None  # link address
    color: Union[MantineColor, str] = None  # button color


@dataclass
class SegmentedItem(Item):
    href: str = None  # link address


@dataclass
class TabsItem(Item):
    pass


@dataclass
class CasItem(NestedItem):
    pass


@dataclass
class TreeItem(NestedItem):
    tag: Union[str, Tag] = None  # item tag
    description: str = None
    tooltip: str = None  # item tooltip

    def __post_init__(self):
        super(TreeItem, self).__post_init__()
        self.tag = parse_tag(self.tag)


@dataclass
class MenuItem(NestedItem):
    description: str = None
    href: str = None  # item link address
    tag: Union[str, Tag, List[Union[str, Tag]]] = None  # item tag
    type: Literal['group', 'divider'] = None  # item type
    dashed: bool = False  # divider line style,available when type=='divider'

    def __post_init__(self):
        super(MenuItem, self).__post_init__()
        self.tag = parse_tag(self.tag)


if __name__ == '__main__':
    print(Tag('abc', icon=BsIcon('abcd')).__dict__)
