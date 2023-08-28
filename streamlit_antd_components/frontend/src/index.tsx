import {ComponentProps, withStreamlitConnection} from "streamlit-component-lib";
import React from "react"
import ReactDOM from "react-dom"
import AntdButtons from "./ts/Buttons";
import AntdTabs from "./ts/Tabs";
import AntdMenu from "./ts/Menu";
import AntdTree from "./ts/Tree";
import AntdCascader from "./ts/Cascader";
import AntdDivider from "./ts/Divider";
import AntdSwitch from "./ts/Switch";
import AntdTransfer from "./ts/Transfer";
import AntdSegmented from "./ts/Segmented";
import AntdAlert from "./ts/Alert";
import AntdRate from "./ts/Rate";
import AntdSteps from "./ts/Steps";
import AntdCheckbox from "./ts/Checkbox";
import AntdResult from "./ts/Result";
import {AntdTags, AntdTag} from "./ts/Tag";
import AntdPagination from "./ts/Pagination";
import AntdDatePicker from "./ts/DatePicker";

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
        case 'tags':
            return AntdTags(kw)
        case 'tag':
            return AntdTag(kw)
        case 'pagination':
            return AntdPagination(kw)
        case 'datepicker':
            return AntdDatePicker(kw)
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
