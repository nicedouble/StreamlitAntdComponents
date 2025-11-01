import React from "react";
import {deepCopy, getSize} from "./utils.react";
import {AntdTags} from "../ts/Tag";
import {ConfigProvider, Tooltip} from "antd";
import {CustomIcon} from "../ts/utils";

//recurve str property to react node
const strToNode = (obj, size, treeIcon, desc_color) => {
    if (Array.isArray(obj)) {
        return obj.map(obj_ => strToNode(obj_, size, treeIcon, desc_color))
    } else {
        let obj_copy = deepCopy(obj);
        const itemIcon = obj_copy.icon;
        const tag = obj_copy.tag;
        const description = obj_copy.description;
        const tooltip = obj_copy.tooltip;
        const icon = itemIcon != null ? itemIcon : treeIcon !== null ? treeIcon : null
        if (obj_copy.children) {
            obj_copy.children = obj_copy.children.map(obj_ => strToNode(obj_, size, treeIcon, desc_color))
        }
        //add description
        if (description) {
            obj_copy.label = <div style={{lineHeight: 1.2, wordBreak: 'break-word', whiteSpace: 'break-spaces'}}>
                <div>{obj_copy.label}</div>
                <div className={'tree-desc'}
                     style={{color: desc_color, fontSize: getSize(size) - 2}}>{description}</div>
            </div>
        }
        //add tag
        if (tag) {
            obj_copy.label = <div className={'d-flex align-items-center justify-content-between flex-grow-1'}>
                <div className={'mr-3'}>{obj_copy.label}</div>
                <AntdTags
                    items={Array.isArray(tag) ? tag : [tag]}
                    align={'end'}
                    size={getSize(size) - 4}
                />
            </div>
        }
        //add icon
        if (icon) {
            obj_copy.label = <div className={'d-flex align-items-center'}>
                <CustomIcon icon={icon} style={{marginRight: 5, alignSelf: 'start'}}/>
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
                            fontSize: getSize(size) - 4,
                        },
                    },
                }}
            >
                <Tooltip
                    title={tooltip}
                    placement={'bottomLeft'}
                    arrow={false}
                    overlayInnerStyle={{padding: '2px 6px', border: `1px solid ${desc_color}`}}
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