import { forEach, trimEnd, trimStart, update } from "lodash"
import { store as Store, store } from "./Redux/Store"
import { update_elements } from "./Redux/Reducers/elements_reducer"
import { update_modals } from "./Redux/Reducers/modals"
import { set_active_element } from "./Redux/Reducers/active_element"
import { toggle_undo } from "./Redux/Reducers/undo_redo"
import { colorcolor } from "colorcolor"

export const hex_rgba = (hex, alpha) => {
	let rgb_val = colorcolor(hex, 'rgb').split(/rgb\(|\)/)[1];
	return `rgba(${rgb_val},${alpha && alpha})`
}


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

	Store.dispatch(toggle_undo(false))
	Store.dispatch(update_elements(new_elements));
}

export const edit_element = (element) => {
	const new_elements = {...store.getState(s => s).elements}
	new_elements[element.name] = element;
	Store.dispatch(toggle_undo(false))
	store.dispatch(update_elements(new_elements))
}


export const trim_text_content = (str) => {
	if (str?.length > 10) {
		return trimStart(trimEnd(str.substring(0, 10))) + "..."
	}
	return str;
}

export const obj_to_css = (object) => {
	let str = ""
	str+="transition: all 100ms;"
	Object.keys(object).map(key => {
		if (key === "background") {
			const {colors, type, direction, gradient_type, image}  = object[key];

			switch (type.value) {
				case "image":
						str+=`background-image: url(${image?.url || ""});`
						Object.keys(image).map(key => {
							if (image[key]?.value === "input custom size") {
								str+=`${key} : ${image[key]?.custom_value};`
							} else str+=`${key} : ${image[key]?.value};`
						})
					break;
					case "gradient":
						const list = colors.map(color => color)
						switch (gradient_type?.value) {
							case "radial":
								str+= `background-image: ${gradient_type?.repeating ? "repeating-": ""}radial-gradient(${list});`
								break;
								case "conic":
									str+= `background-image: conic-gradient(${list});`
									break;
									default:
										str+= `background-image: linear-gradient(to ${direction?.value.split("-")[2]}, ${list});`
										break;
									}
									break
									default:
						let color =  colors[0];
						str+= `background-color: ${color};`
						break;
					}
				} 
		if (key === "border") {
			const {size, style, color}  = object[key];
			str+= `border: ${size} ${style}  ${color};`
		} 
		if (key === "color") {
			str+= `color: ${object.color};`
		}
		if (key === "text-decoration") {
			let ar = object?.["text-decoration"]
			if (ar) {
				str+= `text-decoration : ${ar.join(" ")};`
			}
		}
		else
			str += (`${key}: ${object[key].value || object[key]};\n`);
	})
	return str;
}

export const hex_to_rgb_object = (color) => {
	if (!color) return;
	let rgb = color;
	const obj = {
		r: rgb[0], g: rgb[1], b: rgb[2], a: parseFloat(color.alpha)
	}
	return obj
}

const run_through = (new_elements, elements, el) => {
	if (!el) return;
	for(let i = el.children?.length-1; i >= 0; i--) {
		let id = el?.children[i]
		run_through(new_elements, elements, elements[id])
	}
	delete new_elements[el?.name]
}

export const delete_element = (id) => {
	if (id === "App") {
		alert("Can't delete base component")
		return;
	};
	const {elements} = Store.getState(s => s);

	let new_elements = {...elements};
	run_through(new_elements, elements, elements[id])
	Store.dispatch(set_active_element(elements[id].parent))
	Store.dispatch(toggle_undo(false))
	Store.dispatch(update_elements(new_elements))
}

export const font_list = '&family=Delius&family=Eczar&family=Inter&family=Lora&family=Merriweather&family=Merriweather+Sans&family=Montserrat&family=Noto+Serif&family=Open+Sans&family=PT+Serif&family=Roboto&family=Space+Mono&family=Tillana&family=Tinos&family=Work+Sans'
.split('&family=').map((font_name, index) => {
	if (index > 0)
		return font_name.replace("+", " ")
})	

export const edit_style = (data, replace) => {
	const {elements, active_element} = Store.getState(s => s);
	const new_style = 
	replace ? data :
	{
		...elements[active_element]?.attributes?.css,
		...data
	}
	
	const element = {
		...elements[active_element],
		attributes : {
			...elements[active_element]?.attributes,
			css : new_style
		}
	}


	edit_element(element)
}

const check_for_new = (current, list) => {
	if (!current || !list) return;
	return list.some(e => JSON.stringify(e) === JSON.stringify(current))
}

export const update_process = (current_state) => {
	let actions = JSON.parse(sessionStorage.getItem("actions"));
	if (!actions) {
		actions = {
			list : [current_state],
			position : 0
		} ;
		sessionStorage.setItem("actions", JSON.stringify(actions));
		return
	} 

	if (actions.position === actions.list.length -1) {
		let n_list = [...actions?.list, current_state]
		actions = {
			list : n_list,
			position : n_list?.length-1,
		} 	
		sessionStorage.setItem("actions", JSON.stringify(actions))
		return
	}
	let n_list = [...actions?.list]
	n_list.splice(actions.position+1, actions.list.length, current_state);
	actions = {
		list : n_list,
		position : n_list?.length-1,
	} 	
	sessionStorage.setItem("actions", JSON.stringify(actions))
	
}


export const undo = () => {
	let actions = JSON.parse(sessionStorage.getItem("actions"));
	if (!actions) return;
	if (actions.position <= 0) return;
	const new_position = actions.position - 1;
	Store.dispatch(toggle_undo(true))
	Store.dispatch(update_elements(actions.list[new_position]))
	
	actions = {...actions, position : new_position}
	sessionStorage.setItem("actions", JSON.stringify(actions))
}

export const redo = () => {
	let actions = JSON.parse(sessionStorage.getItem("actions"));
	if (actions.position >= actions.list.length-1) return;
	if (!actions) return;
	const new_position = actions.position + 1;
	Store.dispatch(toggle_undo(true))
	Store.dispatch(update_elements(actions.list[new_position]))
	
	actions = {...actions, position : new_position}
	sessionStorage.setItem("actions", JSON.stringify(actions))
}


const printEl = (el, elements, tab_spacing) => {
	
	const {tag, innerHTML, name, children, text} = el;

	const handle_children = () => {
		let str = ""
		if (tag === "div") {
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				str+= printEl(elements[child], elements, tab_spacing+1)
			}
		}
		else str +=	innerHTML;
		return str;
	}

	const handle_tabs = (no_of_tabs) => {
		let ar = new Array(no_of_tabs).fill("  ")
		let st = ""
		for (let i = 0; i < ar.length	; i++) {
			st+= ar[i];
		}
		return st;
	}

	const tabs = handle_tabs(tab_spacing);
	let str = "";

	str+= tabs + "<" + tag+ " class = \""+name+"\">\n";
	str+= tabs + handle_children()+"\n";
	str+= tabs + "</" + tag+ ">\n";
// 	`
// ${tabs}<${tag} class = "${name}" >
// ${tabs}${handle_children()}
// ${tabs}</${tag}>
// `
	return str;
}

export const export_app = () => {
	const elements = Store.getState().elements;
	let st = printEl(elements["App"], elements, 3)
	let html_code = 
	`
<!DOCTYPE html>
<html>
    <head>
    <meta charset="utf-8">
    <title>App Buildr</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
${st}
  </body>
</html>
	`
	console.log(html_code)
}

export const remove_alpha_from_hex = (hex) => {
	if (hex.length === 9) {
		let new_hex = hex.split("")
		new_hex.pop();
		new_hex.pop();
		return new_hex?.join("")
	}
	return hex
}

export const screen_logger = (val) => {
	const el = document.createElement("div")
	el.classList.add("screen_logger");
	el.innerHTML = `
	<h2>Onscreen Logger</h2>
	<span>${val}</span>
	`
	document.getElementsByTagName("body")[0].appendChild(el)
	setTimeout(() => {
		document.getElementsByTagName("body")[0].removeChild(el)
	}, 3000)
}