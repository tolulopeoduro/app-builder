import React, { useState } from 'react';
import styles from  "./AddStyleMenu.module.scss";
import ClickAwayListener from 'react-click-away-listener';
import defaults from "../../default_attribute_value.json"

const AddStyleMenu = (props) => {

	const [show_menu, toggle_menu] = useState(false);
	const {attributes, edit_style} = props;

	console.log(defaults)

	return attributes.length > 0 &&

		<div style={{display:"flex", marginTop:"0.5rem"}}>
			<div onClick={() => toggle_menu(true)} 
			style={{backgroundColor : show_menu && "rgba(0,0,0,0.3)"}} className={styles.add_style_button}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
				viewBox="0 0 24 24"><path fill="white" 
				d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg>
			</div>
			{
				show_menu &&
				<ClickAwayListener onClickAway={() => toggle_menu(false)}>
					<div style={{height: `${1.5 * attributes.length}rem`}} className={styles.available_style_list}>
						<div>
							{
								attributes?.map(attribute => {
									return (
										<div className={styles.item} onClick={() => edit_style({[attribute] : defaults[attribute]})}>
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