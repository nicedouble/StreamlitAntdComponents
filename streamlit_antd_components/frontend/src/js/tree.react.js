import React from "react";
import {AlphaColor, deepCopy, MartineFontSize} from "./utils.react";
import {AntdTag} from "../ts/Tag";
import {ConfigProvider, Tooltip} from "antd";

//recurve str property to react node
const strToNode = (obj, size, treeIcon) => {
    if (Array.isArray(obj)) {
        return obj.map(obj_ => strToNode(obj_, size, treeIcon))
    } else {
        let obj_copy = deepCopy(obj);
        const itemIcon = obj_copy.icon;
        const tag = obj_copy.tag;
        const description = obj_copy.description;
        const tooltip = obj_copy.tooltip;
        const icon = treeIcon != null ? treeIcon : itemIcon !== null ? itemIcon : null
        if (obj_copy.children) {
            obj_copy.children = obj_copy.children.map(obj_ => strToNode(obj_, size, treeIcon))
        }
        //add description
        if (description) {
            obj_copy.label = <div style={{lineHeight: 1.2, wordBreak: 'break-word', whiteSpace: 'break-spaces'}}>
                <div>{obj_copy.label}</div>
                <div className={'tree-desc'} style={{
                    color: AlphaColor('--text-color', 0.5),
                    fontSize: MartineFontSize[size] - 2,
                }}>{description}</div>
            </div>
        }
        //add tag
        if (tag) {
            obj_copy.label = <div className={'d-flex align-items-start justify-content-between flex-grow-1'}>
                <div className={'mr-3'}>{obj_copy.label}</div>
                <div className={'d-flex flex-wrap align-self-center'}>{Array.isArray(tag) ? tag.map((x) => <div
                    className={'mx-1'}>{AntdTag(x)}</div>) : AntdTag(tag)}
                </div>
            </div>
        }
        //add icon
        if (icon) {
            obj_copy.label = <div className={'d-flex align-items-start'}>
                <div className={'mr-1'}>{<i className={`bi bi-${icon}`}/>}</div>
                <div className={'d-flex  flex-grow-1'}>{obj_copy.label}
                </div>
            </div>
        }
        //add tooltip
        if (tooltip) {
            obj_copy.label = <ConfigProvider
                theme={{
                    components: {
                        Tooltip: {
                            colorBgSpotlight: 'var(--background-color)',
                            colorTextLightSolid: 'var(--text-color)',
                            borderRadius: 6,
                            controlHeight: 12,
                            fontSize: 12,
                        },
                    },
                }}
            >
                <Tooltip
                    title={tooltip}
                    placement={'bottomLeft'}
                    arrow={false}
                    overlayInnerStyle={{padding: '2px 6px', border: `1px solid ${AlphaColor('--text-color')}`}}
                >
                    {obj_copy.label}
                </Tooltip>
            </ConfigProvider>
        }
        obj_copy['title'] = obj_copy.label
        delete obj_copy.label
        delete obj_copy.icon
        return obj_copy
    }
}


export {strToNode}