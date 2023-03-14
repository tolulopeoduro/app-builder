import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveElement } from "../../Redux/ActiveElement"
import styles from "./ChildrenItem.module.scss"

export default (props) => {
	const {project : {elements}} = useSelector(s => s)
	const {element} = props; 
	const [element_data, set_element_data] = useState(null);
	const [active, set_active] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => set_element_data(elements[element]), [element, elements])

	return (
		<Fragment>
			<div className={styles.container} onClick={() => dispatch(setActiveElement(element?.name))}>
				<span className={styles.type}>{element_data?.wrapper_element}</span>
				{element_data?.innerHTML && <span className={styles.content}>{element_data?.innerHTML}</span>}
				<svg onClick={() => set_active(active ? false : true)} className={active ? styles.active_dropdown : styles.inactive_dropdown} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7 10l5 5l5-5z"/></svg>
			</div>
		</Fragment>
	)
}