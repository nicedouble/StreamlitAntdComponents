import {ComponentProps, withStreamlitConnection} from "streamlit-component-lib";
import React from "react"
import ReactDOM from "react-dom"
import AntdButtons from "./buttons/Buttons";
import AntdTabs from "./tabs/Tabs";
import AntdMenu from "./menu/Menu";
import AntdTree from "./tree/Tree";
import AntdCascader from "./cascader/Cascader";
import AntdDivider from "./divider/Divider";
import AntdSwitch from "./switch/Switch";
import AntdTransfer from "./transfer/Transfer";
import AntdSegmented from "./segmented/Segmented";
import AntdAlert from "./alert/Alert";
import AntdRate from "./rate/Rate";
import AntdSteps from "./steps/Steps";
import AntdCheckbox from "./chekcbox/Checkbox";
import AntdResult from "./result/Result";

//switch component
const AntdComponent = (props: ComponentProps) => {
    //get data
    const id = props.args['id']
    const kw = props.args['kw']

    //return component base on component id
    switch (id) {
        case 'buttons':
            return AntdButtons(kw);
        case 'tabs':
            return AntdTabs(kw);
        case 'menu':
            return AntdMenu(kw);
        case 'tree':
            return AntdTree(kw);
        case 'cascader':
            return AntdCascader(kw);
        case 'divider':
            return AntdDivider(kw);
        case 'switch':
            return AntdSwitch(kw);
        case 'transfer':
            return AntdTransfer(kw);
        case 'segmented':
            return AntdSegmented(kw);
        case 'alert':
            return AntdAlert(kw);
        case 'rate':
            return AntdRate(kw);
        case 'steps':
            return AntdSteps(kw)
        case 'checkbox':
            return AntdCheckbox(kw)
        case 'result':
            return AntdResult(kw)
        default:
            return <></>
    }
};

//wrap component
const StreamlitAntdComponent = withStreamlitConnection(AntdComponent)

//render component
ReactDOM.render(
    <React.StrictMode>
        <StreamlitAntdComponent/>
    </React.StrictMode>,
    document.getElementById("root")
)
