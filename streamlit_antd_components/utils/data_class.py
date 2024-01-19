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
    'Tag', 'Banner',
    'StepsItem', 'ChipItem', 'CheckboxItem', 'ButtonsItem', 'SegmentedItem', 'TabsItem', 'CasItem', 'MenuItem',
    'TreeItem',
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


@dataclass
class Banner:
    play: bool = True  # Whether to play or pause the marquee
    direction: Literal['left', 'right'] = 'left'  # The direction the marquee is sliding
    speed: int = 50  # Speed calculated as pixels/second
    pauseOnHover: bool = True  # Whether to pause the marquee when hovered


@dataclass
class Item:
    label: str = ''  # item label
    icon: Union[str, BsIcon, AntIcon] = None  # item icon
    disabled: bool = False  # disabled item


@dataclass
class NestedItem(Item):
    children: List = None  # item children


@dataclass
class Tag:
    label: str = None  # label
    icon: Union[str, BsIcon, AntIcon] = None  # icon
    link: str = None  # hyperlink
    size: Union[MantineSize, int] = None
    radius: Union[MantineSize, int] = None
    color: Union[Color, str] = None  # color
    bordered: bool = True  # show border
    closable: bool = False  # show close button


@dataclass
class StepsItem:
    title: str = ''
    subtitle: str = ''
    description: str = ''
    icon: Union[str, BsIcon, AntIcon] = None
    disabled: bool = False


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
    tag: Union[str, Tag, List[Union[str, Tag]]] = None  # item tag


@dataclass
class CasItem(NestedItem):
    pass


@dataclass
class TreeItem(NestedItem):
    tag: Union[str, Tag, List[Union[str, Tag]]] = None  # item tag
    description: str = None
    tooltip: str = None  # item tooltip


@dataclass
class MenuItem(NestedItem):
    description: str = None
    href: str = None  # item link address
    tag: Union[str, Tag, List[Union[str, Tag]]] = None  # item tag
    type: Literal['group', 'divider'] = None  # item type
    dashed: bool = False  # divider line style,available when type=='divider'


if __name__ == '__main__':
    print(Tag('abc', icon=BsIcon('abcd')).__dict__)
