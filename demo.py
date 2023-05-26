#!/usr/bin/env python
# _*_coding:utf-8_*_

"""
@Time     : 2023/5/26 22:14
@Author   : ji hao ran
@File     : demo.py
@Project  : StreamlitAntdComponents
@Software : PyCharm
"""
from os.path import dirname
from os.path import join
import streamlit as st
from streamlit_antd_components import *

st.set_page_config(layout='wide')

with st.sidebar.container():
    component = st.radio('menu', ['readme', 'buttons', 'tabs', 'menu', 'tree', 'code'], label_visibility='collapsed')
    if component == 'buttons':
        index = st.selectbox('index', [0, 1, None])
        format_func = st.selectbox('format_func', ["None", 'lambda x:x.title()', 'lambda x:x.upper()'], 1)
        align = st.selectbox('align', ["start", "center", "end"])
        direction = st.selectbox('direction', ["horizontal", "vertical"])
        shape = st.selectbox('shape', ["default", "round"])
        compact = st.checkbox('compact')
        grow = st.checkbox('grow')
        return_index = st.checkbox('return_index')
        kw = dict(
            index=index,
            align=align,
            direction=direction,
            shape=shape,
            compact=compact,
            grow=grow,
            return_index=return_index,
            format_func=eval(format_func)
        )
    if component == 'tabs':
        index = st.selectbox('index', [0, 1])
        format_func = st.selectbox('format_func', ["None", 'lambda x:x.title()', 'lambda x:x.upper()'], 1)
        height = st.selectbox('height(px)', [None, 150])
        align = st.selectbox('align', ["start", "center", "end"])
        position = st.selectbox('position', ["top", "right", "bottom", "left"])
        shape = st.selectbox('shape', ['default', 'card'])
        grow = st.checkbox('grow')
        return_index = st.checkbox('return_index')
        kw = dict(
            index=index,
            align=align,
            position=position,
            shape=shape,
            height=height,
            grow=grow,
            return_index=return_index,
            format_func=eval(format_func)
        )
    if component == 'menu':
        index = st.selectbox('index', [0, 2])
        format_func = st.selectbox('format_func', ["None", 'lambda x:x.title()', 'lambda x:x.upper()'], 1)
        size = st.slider('size(px)', 10, 20, 16)
        indent = st.slider('indent(px)', 0, 30, 24)
        open_index = st.selectbox('open_index', [None, [1, 3]])
        open_all = st.checkbox('open_all', True)
        return_index = st.checkbox('return_index')
        kw = dict(
            index=index,
            format_func=eval(format_func),
            size=size,
            indent=indent,
            open_index=open_index,
            open_all=open_all,
            return_index=return_index,
        )
    if component == 'tree':
        index = st.selectbox('index', [[0], [0, 2], None])
        format_func = st.selectbox('format_func', ["None", 'lambda x:x.title()', 'lambda x:x.upper()'], 1)
        icon = st.selectbox('icon', [None, 'google', 'twitter'])
        height = st.selectbox('height(px)', [None, 300])
        open_index = st.selectbox('open_index', [None, [1, 11]])
        open_all = st.checkbox('open_all', True)
        checkbox = st.checkbox('checkbox', True)
        checkbox_strict = st.checkbox('checkbox_strict')
        multiple = st.checkbox('multiple')
        show_line = st.checkbox('show_line', True)
        return_index = st.checkbox('return_index')
        kw = dict(
            index=index,
            format_func=eval(format_func),
            icon=icon,
            height=height,
            open_index=open_index,
            open_all=open_all,
            checkbox=checkbox,
            checkbox_strict=checkbox_strict,
            multiple=multiple,
            show_line=show_line,
            return_index=return_index,
        )
with st.container():
    if component == 'readme':
        readme = open(join(dirname(__file__), "README.md")).read()
        st.write(readme)
    if component == 'buttons':
        btn0 = buttons(['button1', 'button2', 'button3'], **kw)
        st.write(f'The selected button {"index" if return_index else "label"} is: {btn0}')
        btn1 = buttons([
            ButtonsItem(icon='chevron-bar-left'),
            ButtonsItem(icon='chevron-left'),
            ButtonsItem(icon='chevron-right'),
            ButtonsItem(icon='chevron-bar-right'),
        ], **kw)
        st.write(f'The selected button {"index" if return_index else "label"} is: {btn1}')
        btn2 = buttons(
            items=[
                ButtonsItem('apple', icon='apple'),
                ButtonsItem('google', icon='google'),
                ButtonsItem('github', icon='github'),
                ButtonsItem('disabled', disabled=True),
                ButtonsItem('link', href='https://ant.design/components/button', icon='link'),
            ], **kw
        )
        st.write(f'The selected button {"index" if return_index else "label"} is: {btn2}')
        with st.expander('API'):
            st.help(buttons)
            st.help(ButtonsItem)
    if component == 'tabs':
        tab0 = tabs(['tab1', 'tab2', 'tab3'], **kw)
        st.write(f'The selected tab {"index" if return_index else "label"} is: {tab0}')
        tab1 = tabs([
            TabsItem(icon='table'),
            TabsItem(icon='pie-chart-fill'),
            TabsItem(icon='graph-up-arrow'),
            TabsItem(icon='bar-chart'),
        ], **kw)
        st.write(f'The selected tab {"index" if return_index else "label"} is: {tab1}')
        tab2 = tabs(
            items=[
                TabsItem('apple', icon='apple'),
                TabsItem('google', icon='google'),
                TabsItem('github', icon='github'),
                TabsItem('disabled', disabled=True),
            ], **kw
        )
        st.write(f'The selected tab {"index" if return_index else "label"} is: {tab2}')
        with st.expander('API'):
            st.help(tabs)
            st.help(TabsItem)
    if component == 'menu':
        col = st.columns(5)
        with col[1]:
            item0 = menu(
                items=[MenuItem(f'menu{i}') for i in range(10)], **kw)
            st.write(f'The selected menu item {"index" if return_index else "label"} : {item0}')
        with col[3]:
            items = [
                MenuItem('home', icon='house'),
                MenuItem('app', icon='app', children=[
                    MenuItem('store', icon='bag-check'),
                    MenuItem('brand', icon='award', children=[
                        MenuItem('github', icon='github'),
                        MenuItem('google', icon='google'),
                        MenuItem('apple', icon='apple', children=[
                            MenuItem('admin', icon='person-circle'),
                            MenuItem('guest', icon='person'),
                        ]),
                    ]),
                ]),
                MenuItem('disabled', icon='send', disabled=True),
                MenuDivider(),
                MenuItem('reference', children_as_group=True, children=[
                    MenuItem('antd-menu', icon='heart', href='https://ant.design/components/menu#menu'),
                    MenuItem('bootstrap-icon', icon='bootstrap', href='https://icons.getbootstrap.com/'),
                    MenuItem('streamlit-components-tutorial', icon='info-circle',
                             href='https://streamlit-components-tutorial.netlify.app/'),
                ]),
            ]
            item1 = menu(items, **kw)
            st.write(f'The selected menu item {"index" if return_index else "label"} : {item1}')
        with st.expander('API'):
            st.help(menu)
            st.help(MenuItem)
            st.help(MenuDivider)
    if component == 'tree':
        col = st.columns(5)
        with col[1]:
            item0 = tree(
                items=[TreeItem(f'item{i}') for i in range(10)], **kw)
            st.write(f'The selected tree item {"index" if return_index else "label"} : {item0}')
        with col[3]:
            item1 = tree(
                items=[
                    TreeItem('item1'),
                    TreeItem('item2', icon='apple', children=[
                        TreeItem('item2-1', icon='github'),
                        TreeItem('item2-2', children=[
                            TreeItem('item2-2-1'),
                            TreeItem('item2-2-2'),
                            TreeItem('item2-2-3', children=[
                                TreeItem('item2-2-3-1'),
                                TreeItem('item2-2-3-2'),
                                TreeItem('item2-2-3-3'),
                            ]),
                        ]),
                    ]),
                    TreeItem('disabled', disabled=True),
                    TreeItem('item3', children=[
                        TreeItem('item3-1'),
                        TreeItem('item3-2'),
                    ]),
                ], **kw)
            st.write(f'The selected tree item {"index" if return_index else "label"} : {item1}')
        with st.expander('API'):
            st.help(tree)
            st.help(TreeItem)
    if component == 'code':
        st.code("""
                    from os.path import dirname
        from os.path import join
        import streamlit as st
        from streamlit_antd_components import *

        st.set_page_config(layout='wide')

        with st.sidebar.container():
            component = st.radio('me', ['readme', 'buttons', 'tabs', 'menu', 'tree', 'code'], label_visibility='hidden')
            st.write('---')
            if component == 'buttons':
                index = st.selectbox('index', [0, 1, None])
                format_func = st.selectbox('format_func', ["None", 'lambda x:x.title()', 'lambda x:x.upper()'], 1)
                align = st.selectbox('align', ["start", "center", "end"])
                direction = st.selectbox('direction', ["horizontal", "vertical"])
                shape = st.selectbox('shape', ["default", "round"])
                compact = st.checkbox('compact')
                grow = st.checkbox('grow')
                return_index = st.checkbox('return_index')
                kw = dict(
                    index=index,
                    align=align,
                    direction=direction,
                    shape=shape,
                    compact=compact,
                    grow=grow,
                    return_index=return_index,
                    format_func=eval(format_func)
                )
            if component == 'tabs':
                index = st.selectbox('index', [0, 1])
                format_func = st.selectbox('format_func', ["None", 'lambda x:x.title()', 'lambda x:x.upper()'], 1)
                height = st.selectbox('height(px)', [None, 150])
                align = st.selectbox('align', ["start", "center", "end"])
                position = st.selectbox('position', ["top", "right", "bottom", "left"])
                shape = st.selectbox('shape', ['default', 'card'])
                grow = st.checkbox('grow')
                return_index = st.checkbox('return_index')
                kw = dict(
                    index=index,
                    align=align,
                    position=position,
                    shape=shape,
                    height=height,
                    grow=grow,
                    return_index=return_index,
                    format_func=eval(format_func)
                )
            if component == 'menu':
                index = st.selectbox('index', [0, 2])
                format_func = st.selectbox('format_func', ["None", 'lambda x:x.title()', 'lambda x:x.upper()'], 1)
                size = st.slider('size(px)', 10, 20, 16)
                indent = st.slider('indent(px)', 0, 30, 24)
                open_index = st.selectbox('open_index', [None, [1, 3]])
                open_all = st.checkbox('open_all', True)
                return_index = st.checkbox('return_index')
                kw = dict(
                    index=index,
                    format_func=eval(format_func),
                    size=size,
                    indent=indent,
                    open_index=open_index,
                    open_all=open_all,
                    return_index=return_index,
                )
            if component == 'tree':
                index = st.selectbox('index', [[0], [0, 2], None])
                format_func = st.selectbox('format_func', ["None", 'lambda x:x.title()', 'lambda x:x.upper()'], 1)
                icon = st.selectbox('icon', [None, 'google', 'twitter'])
                height = st.selectbox('height(px)', [None, 300])
                open_index = st.selectbox('open_index', [None, [1, 11]])
                open_all = st.checkbox('open_all', True)
                checkbox = st.checkbox('checkbox', True)
                checkbox_strict = st.checkbox('checkbox_strict')
                multiple = st.checkbox('multiple')
                show_line = st.checkbox('show_line', True)
                return_index = st.checkbox('return_index')
                kw = dict(
                    index=index,
                    format_func=eval(format_func),
                    icon=icon,
                    height=height,
                    open_index=open_index,
                    open_all=open_all,
                    checkbox=checkbox,
                    checkbox_strict=checkbox_strict,
                    multiple=multiple,
                    show_line=show_line,
                    return_index=return_index,
                )
        with st.container():
            if component == 'readme':
                readme = open(join(dirname(__file__), "README.md")).read()
                st.write(readme)
            if component == 'buttons':
                btn0 = buttons(['button1', 'button2', 'button3'], **kw)
                st.write(f'The selected button {"index" if return_index else "label"} is: {btn0}')
                btn1 = buttons([
                    ButtonsItem(icon='chevron-bar-left'),
                    ButtonsItem(icon='chevron-left'),
                    ButtonsItem(icon='chevron-right'),
                    ButtonsItem(icon='chevron-bar-right'),
                ], **kw)
                st.write(f'The selected button {"index" if return_index else "label"} is: {btn1}')
                btn2 = buttons(
                    items=[
                        ButtonsItem('apple', icon='apple'),
                        ButtonsItem('google', icon='google'),
                        ButtonsItem('github', icon='github'),
                        ButtonsItem('disabled', disabled=True),
                        ButtonsItem('link', href='https://ant.design/components/button', icon='link'),
                    ], **kw
                )
                st.write(f'The selected button {"index" if return_index else "label"} is: {btn2}')
                with st.expander('API'):
                    st.help(buttons)
                    st.help(ButtonsItem)
            if component == 'tabs':
                tab0 = tabs(['tab1', 'tab2', 'tab3'], **kw)
                st.write(f'The selected tab {"index" if return_index else "label"} is: {tab0}')
                tab1 = tabs([
                    TabsItem(icon='table'),
                    TabsItem(icon='pie-chart-fill'),
                    TabsItem(icon='graph-up-arrow'),
                    TabsItem(icon='bar-chart'),
                ], **kw)
                st.write(f'The selected tab {"index" if return_index else "label"} is: {tab1}')
                tab2 = tabs(
                    items=[
                        TabsItem('apple', icon='apple'),
                        TabsItem('google', icon='google'),
                        TabsItem('github', icon='github'),
                        TabsItem('disabled', disabled=True),
                    ], **kw
                )
                st.write(f'The selected tab {"index" if return_index else "label"} is: {tab2}')
                with st.expander('API'):
                    st.help(tabs)
                    st.help(TabsItem)
            if component == 'menu':
                col = st.columns(5)
                with col[1]:
                    item0 = menu(
                        items=[MenuItem(f'menu{i}') for i in range(10)], **kw)
                    st.write(f'The selected menu item {"index" if return_index else "label"} : {item0}')
                with col[3]:
                    items = [
                        MenuItem('home', icon='house'),
                        MenuItem('app', icon='app', children=[
                            MenuItem('store', icon='bag-check'),
                            MenuItem('brand', icon='award', children=[
                                MenuItem('github', icon='github'),
                                MenuItem('google', icon='google'),
                                MenuItem('apple', icon='apple', children=[
                                    MenuItem('admin', icon='person-circle'),
                                    MenuItem('guest', icon='person'),
                                ]),
                            ]),
                        ]),
                        MenuItem('disabled', icon='send', disabled=True),
                        MenuDivider(),
                        MenuItem('reference', children_as_group=True, children=[
                            MenuItem('antd-menu', icon='heart', href='https://ant.design/components/menu#menu'),
                            MenuItem('bootstrap-icon', icon='bootstrap', href='https://icons.getbootstrap.com/'),
                            MenuItem('streamlit-components-tutorial', icon='info-circle',
                                     href='https://streamlit-components-tutorial.netlify.app/'),
                        ]),
                    ]
                    item1 = menu(items, **kw)
                    st.write(f'The selected menu item {"index" if return_index else "label"} : {item1}')
                with st.expander('API'):
                    st.help(menu)
                    st.help(MenuItem)
                    st.help(MenuDivider)
            if component == 'tree':
                col = st.columns(5)
                with col[1]:
                    item0 = tree(
                        items=[TreeItem(f'item{i}') for i in range(10)], **kw)
                    st.write(f'The selected tree item {"index" if return_index else "label"} : {item0}')
                with col[3]:
                    item1 = tree(
                        items=[
                            TreeItem('item1'),
                            TreeItem('item2', icon='apple', children=[
                                TreeItem('item2-1', icon='github'),
                                TreeItem('item2-2', children=[
                                    TreeItem('item2-2-1'),
                                    TreeItem('item2-2-2'),
                                    TreeItem('item2-2-3', children=[
                                        TreeItem('item2-2-3-1'),
                                        TreeItem('item2-2-3-2'),
                                        TreeItem('item2-2-3-3'),
                                    ]),
                                ]),
                            ]),
                            TreeItem('disabled', disabled=True),
                            TreeItem('item3', children=[
                                TreeItem('item3-1'),
                                TreeItem('item3-2'),
                            ]),
                        ], **kw)
                    st.write(f'The selected tree item {"index" if return_index else "label"} : {item1}')
                with st.expander('API'):
                    st.help(tree)
                    st.help(TreeItem)
                    """, line_numbers=True)
