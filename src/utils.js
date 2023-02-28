import { setProject } from "./Redux/Project/Project"
import Store from "./Redux/Store"


export const updateText = (text) => {
	const {activeElement, project} = Store.getState(s => s)
	let temp = {...project}
	temp[activeElement] = {...temp[activeElement], children : text }
	console.log(temp[activeElement])
	Store.dispatch(setProject(temp))
}

export const create_component = (data) => {
	return data;
}