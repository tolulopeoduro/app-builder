import { useState } from "react"
import StateItem from "../StateItem/StateItem"
import classes from "./ComponentModal.module.scss"
import { create_component } from "../../utils";
import { useDispatch } from "react-redux";
import { set_modal } from "../../Redux/Project/Project";

export default () => {

	const [component_name, set_component_name] = useState("");
	const [component_states, update_component_states] = useState([]);
	const dispatch = useDispatch();
	
	const handle_create_component = () => {
			// Verify Component naming
			if (!/^[A-Z]/.test(component_name))
				return false;
			
			let default_string = component_name;
			create_component({
				name : component_name,
				wrapper_element : "div",
				attributes : {},
				states : {},
				children : [],
				innerHTML : default_string,
				styles : ``,
				is_component : true,	
				text_content : default_string,
				location : `src/${component_name}`,
				component_name,
			})
			dispatch(set_modal(null))
	}

	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<span>
					NEW COMPONENT
				</span>
				
			</div>
			<input
			placeholder = "ComponentName"
			className={classes.component_name}
			value = {component_name}
			onChange = {(e) => set_component_name(e.target.value)}
			/>
			<div className={classes.footer}>
				<span onClick={() => handle_create_component()}>
					CREATE COMPONENT
				</span>
			</div>

		</div>
	)
}