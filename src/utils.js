import { trimEnd, trimStart } from "lodash"
import { setElements, setProject, set_modal } from "./Redux/Project/Project"
import Store from "./Redux/Store"


export const updateText = (text) => {
	const {activeElement, project} = Store.getState(s => s)
	let temp = {...project}
	temp[activeElement] = {...temp[activeElement], children : text }
	Store.dispatch(setProject(temp))
}

export const create_element = (el, parent_id, id) => {

	const state = Store.getState()

	const new_elements = {...state?.project?.elements};
	
	
	let c = {...new_elements[parent_id]};
	let ar = [...c.children, el?.name]
	c.children = ar;
	new_elements[id] = el
	new_elements[parent_id] = c;

	Store.dispatch(setElements(new_elements));
	Store.dispatch(set_modal(null));
	
}

export const create_component = (component) => {
	const state = Store.getState();
	
	const new_elements = {...state?.project?.elements};
	new_elements[component?.name] = component;
	
	Store.dispatch(setElements(new_elements));
}



export const trim_text_content = (str) => {
	if (str.length > 10) {
		return trimStart(trimEnd(str.substring(0, 10))) + "..."
	}
	return str;
}