import { trimEnd, trimStart, update } from "lodash"
import { store as Store, store } from "./Redux/Store"
import { update_elements } from "./Redux/Reducers/elements_reducer"
import { update_modals } from "./Redux/Reducers/modals"
import rgb2hex from "rgb2hex"
import hex2rgb from "hex2rgb"
import hex2rgba from "hex2rgba"


// export const updateText = (text) => {
// 	const {activeElement, project} = Store.getState(s => s)
// 	let temp = {...project}
// 	temp[activeElement] = {...temp[activeElement], children : text }
// 	Store.dispatch(setProject(temp))
// }

export const create_element = (el, parent_id, id) => {

	const {elements} = Store.getState()

	const new_elements = {...elements};
	
	
	let c = {...new_elements[parent_id]};
	let ar = [...c.children, el?.name]
	c.children = ar;
	new_elements[id] = el
	new_elements[parent_id] = c;

	Store.dispatch(update_elements(new_elements));
	Store.dispatch(update_modals({new_element : false}));
}

export const edit_element = (element) => {
	const new_elements = {...store.getState(s => s).elements}
	new_elements[element?.name] = element;
	store.dispatch(update_elements(new_elements))
}



export const trim_text_content = (str) => {
	if (str.length > 10) {
		return trimStart(trimEnd(str.substring(0, 10))) + "..."
	}
	return str;
}


const process_color_value = (value) => {
	console.log(value);
}

export const obj_to_css = (object) => {
	let str = ""
	Object.keys(object).map(key => {
		if (key === "background-color") {
			const background = object[key];
			str+= `background-color: ${hex2rgba(background?.value, background.alpha)};`
		} 
		if (key === "border") {
			const {size, style, color}  = object[key];
			str+= `border: ${size} ${style}  ${hex2rgba(color)};`
		} 
		else
			str += (`${key}: ${object[key]};\n`);

	})
	return str;
}