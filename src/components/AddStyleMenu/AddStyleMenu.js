import React, { useEffect, useState } from 'react';
import styles from  "./AddStyleMenu.module.scss";
import ClickAwayListener from 'react-click-away-listener';
import defaults from "../../attributes_data.json"

const AddStyleMenu = (props) => {

	const [show_menu, toggle_menu] = useState(false);
	const [position, set_position] = useState({})
	const {attributes, edit_style} = props;

	useEffect(() => {
		attributes.splice(attributes.indexOf("flex_settings"), 0);
	},[])

	const getPosition = () => {
		let el = document.getElementById("add_style")
		let box = el?.getBoundingClientRect()
		if(!box) return;
		let total_height = box?.bottom + (box.height * attributes.length)
		if (total_height > window.innerHeight) {
			let b = {bottom : (el.offsetParent?.offsetHeight - el?.offsetTop - box.height)+document.getElementById("container_editor_body").scrollTop}
			return b
		} 
		return{top: el?.offsetTop - document.getElementById("container_editor_body").scrollTop}
	}

	useEffect(() => {
		set_position(getPosition())
		document.getElementById("container_editor_body").style.overflowX = show_menu ? "hidded" : "scroll"
	}, [show_menu])

	return attributes.length > 0 &&
		<div order={props.order} id = "add_style" style={{display:"flex", marginTop:"0.5rem"}}>
			<div onClick={() => toggle_menu(true)} 
			style={{backgroundColor : show_menu && "rgba(0,0,0,0.3)"}} className={styles.add_style_button}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
				viewBox="0 0 24 24"><path fill="white" 
				d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg>
			</div>
			{
				show_menu &&
				<ClickAwayListener onClickAway={() => toggle_menu(false)}>
					<div id ="available_styles"onClick={() => toggle_menu(false)} style={{height: `${1.5 * attributes.length}rem`, ...position}} className={styles.available_style_list}>
						<div>
							{
								attributes?.map((attribute, index) => {
									return (
										<div key = {index} className={styles.item} onClick={() => edit_style({[attribute] : defaults[attribute]})}>
											{attribute}
										</div>
									)
								})
							}
						</div>
					</div>
				</ClickAwayListener>
			}
		</div>
}

export default AddStyleMenu