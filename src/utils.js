import { trimEnd, trimStart } from "lodash"
import { setProject } from "./Redux/Project/Project"
import Store from "./Redux/Store"


export const updateText = (text) => {
	const {activeElement, project} = Store.getState(s => s)
	let temp = {...project}
	temp[activeElement] = {...temp[activeElement], children : text }
	Store.dispatch(setProject(temp))
}

export const create_component = (data) => {
	return data;
}

export const newElement = (data) => {
	return data
	// return {
	// 	id : id || require("randomstring").generate(),
	// 	parent,
	// 	position,
	// 	type,
	// 	attributes,
	// 	children : type === "div" ? (children || []) : "hello"
	// }
}

export const addChild = () => {
	
}

export const trim_text_content = (str) => {
	if (str.length > 10) {
		return trimStart(trimEnd(str.substring(0, 10))) + "..."
	}
	return str;
}