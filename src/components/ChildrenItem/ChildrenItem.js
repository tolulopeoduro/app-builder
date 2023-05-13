import classNames from "classnames"
import { forEach } from "lodash"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveElement } from "../../Redux/ActiveElement"
import { setElements } from "../../Redux/Project/Project"
import { trim_text_content } from "../../utils"
import styles from "./ChildrenItem.module.scss"
import { Icon } from '@iconify/react';

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

	const handle_delete = () => {
		const {name, parent, is_component, children} = element_data;
		if (is_component && name === "App") {
			alert("Cannot delete base component")
		};
		let new_elements = {...elements}
		for(let i = 0; i < children.length; i++) {
			new_elements[children[i]] = null;
		}

		let new_parent = {...new_elements[parent]}
		let new_children = [...new_parent?.children]
		let position = new_children.indexOf(name)
		new_children.splice(position, 1)
		new_parent = {...new_parent, children : new_children}
		delete new_elements[name];
		new_elements[parent] = new_parent;
		dispatch(setElements(new_elements))
	}

	return (
		<Fragment>
			<div className={classNames(styles.container, {[styles.active_element] : activeElement?.name === element})} onClick={() => dispatch(() => handle_click(element?.name))}>
				<span className={styles.left}>
					{new Array(level).fill(<span className={styles.tab}></span>).map((el) => el)}
					{
						element_data?.is_component ? 
						<span className={styles.component_name}>{element_data?.name}</span>
						:
						<Fragment>
							<span className={styles.type}>{element_data?.wrapper_element}</span>
							{element_data?.innerHTML && <span className={styles.content}>{trim_text_content(element_data?.text_content)}</span>}
						</Fragment>
					}
					{element_data?.wrapper_element === "div" && <svg onClick={(e) => toggle_active(e)} className={active ? styles.active_dropdown : styles.inactive_dropdown} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7 10l5 5l5-5z"/></svg>}
				</span>
				<span className={styles.right}>
					<Icon icon="ph:gear" />&nbsp;
					<svg onClick={(e) => handle_delete(e)} id="delete_el" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path fill="currentColor" 
						d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 
						2H6v12h12V8zm-4.586 6l1.768 1.768l-1.414 1.414L12 15.414l-1.768 1.768l-1.414-1.414L10.586 
						14l-1.768-1.768l1.414-1.414L12 12.586l1.768-1.768l1.414 1.414L13.414 14zM9 4v2h6V4H9z"/>
					</svg>
				</span>
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