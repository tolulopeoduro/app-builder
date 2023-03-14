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