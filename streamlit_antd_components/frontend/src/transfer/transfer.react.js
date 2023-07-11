//recurve str property to react node
const strToNode = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(obj_ => strToNode(obj_))
    } else {
        return {'key': String(obj['key']), 'title': obj['titleFormatter']}
    }
}
const numberToStr = (obj) => {
    if (obj===null){
        return []
    }
    if (Array.isArray(obj)) {
        return obj.map(obj_ => numberToStr(obj_))
    } else {
        return String(obj)
    }
}

export {strToNode,numberToStr}