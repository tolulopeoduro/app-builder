import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { setElements } from "../../Redux/Project/Project"
import { addChild, newElement } from "../../utils"
import styles from "./ElementButton.module.scss"


export default (props) => {
	const {name} = props
	const {activeElement, project : {activeComponent, elements}} = useSelector(s => s);
	const dispatch = useDispatch();

	const handleClick = () => {
		let id = require("randomstring").generate();
		let active_element_name = activeElement?.name;

		let el = newElement({
			name : id,
			parent : elements[active_element_name]?.wrapper_element === "div" ? active_element_name : elements[active_element_name],
			wrapper_element : name,
			attributes : {},
			children : [],
			innerHTML : `new ${name}`,
			styles : ``,
			component_name : activeComponent?.name,
			is_component : false
		})
		let m = {}
		m[id] = el;
		console.log(m);
		
		let new_elements = {...elements}
		
		let c = {...new_elements[el.parent]};
		let ar = [...c.children, el?.name]
		c.children = ar;
		console.log("c = ", c)
		new_elements[id] = el
		new_elements[el.parent] = c
		
		console.log(new_elements)
		dispatch(setElements(new_elements))

	}
	return (
		<div onClick={handleClick} className={classNames(activeElement?.wrapper_element===name?[styles.container, styles.active] : styles.container)}>
			{name}
		</div>
	)
}