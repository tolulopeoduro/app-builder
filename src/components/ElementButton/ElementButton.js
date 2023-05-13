import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { setElements } from "../../Redux/Project/Project"
import { addChild, create_element} from "../../utils"
import styles from "./ElementButton.module.scss"


export default (props) => {
	const {name} = props
	const {activeElement, project : {activeComponent, elements}} = useSelector(s => s);
	const dispatch = useDispatch();
	const handleClick = () => {
		let is_container = activeElement?.wrapper_element === "div";
		let parent_id = is_container ? activeElement?.name : activeElement.parent
		let id = require("randomstring").generate();
		
		let default_string = `new ${name}`;
		create_element({
			name : id,
			parent : parent_id,
			wrapper_element : name,
			attributes : {},
			children : [],
			position : activeElement?.children.length,
			innerHTML : default_string,
			styles : ``,
			component_name : activeComponent?.name,
			is_component : false,
			text_content : default_string
		}, parent_id, id)

	}
	return (
		<div onClick={handleClick} className={classNames(activeElement?.wrapper_element===name?[styles.container, styles.active] : styles.container)}>
			{"<"}{name}{'>'}
		</div>
	)
}