import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Path.module.scss"

const Path = (props) => {
	const {project : {elements}} = useSelector(s => s)
	const {element} = props;
	const {parent, name, is_component, wrapper_element} = element;

	const [active, set_active] = useState(false)

	const toggle_active = (e) => {
		e.stopPropagation();
		set_active(active ? false : true);
	}

	return (
		<Fragment>
			{parent && <Path element = {elements[parent]}/>}
			{parent && <svg onClick={(e) => toggle_active(e)} className={active ? styles.active_dropdown : styles.inactive_dropdown} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7 10l5 5l5-5z"/></svg>}
			{
				is_component ?
				<span className={styles.content}>{name}</span> :
				<span className={styles.content}>{wrapper_element}</span>
			}
		</Fragment>
	)
}

export default Path;