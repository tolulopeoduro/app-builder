import classNames from "classnames"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveElement } from "../../Redux/ActiveElement"
import styles from "./ChildrenItem.module.scss"

const ChildrenItem = (props) => {
	const {project : {elements}, activeElement} = useSelector(s => s)
	const {element, level} = props; 
	const [element_data, set_element_data] = useState(null);
	const [active, set_active] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => set_element_data(elements[element]), [element, elements])

	const handle_click = (data) => {
		dispatch(setActiveElement(element_data))
	}

	const toggle_active = (e) => {
		set_active(active ? false : true)
		e.stopPropagation();
	}

	return (
		<Fragment>
			<div className={classNames(styles.container, {[styles.active_element] : activeElement?.name === element})} onClick={() => dispatch(() => handle_click(element?.name))}>
				{new Array(level).fill(<span className={styles.tab}></span>).map((el) => el)}
				<span className={styles.type}>{element_data?.wrapper_element}</span>
				{element_data?.innerHTML && <span className={styles.content}>{element_data?.text_content}</span>}
				{element_data?.wrapper_element === "div" && <svg onClick={(e) => toggle_active(e)} className={active ? styles.active_dropdown : styles.inactive_dropdown} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7 10l5 5l5-5z"/></svg>}
			</div>
			<div id="children" className={classNames(styles.children, {[styles.active] : active}, {[styles.inactive] : !active})}>
				{
					active &&
					element_data?.children?.map((el, index) => 
						<Fragment>
							<ChildrenItem key = "index" element={el} level = {level+1}/>
						</Fragment>
					)
				}
			</div>
		</Fragment>
	)
}

export default ChildrenItem;