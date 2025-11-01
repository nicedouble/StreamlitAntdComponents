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
    return obj.map((x)=>String(x))
}

export {strToNode,numberToStr}