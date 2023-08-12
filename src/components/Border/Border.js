import React, { Fragment, useEffect, useState } from 'react'
import styles from "./Border.module.scss"
import Dropdown from '../BottomBar/Dropdown/Dropdown'
import Color_picker from '../Color/Color_picker/Color_picker';
import Color from '../Color/Color';

const Border = (props) => {

	const [border, edit_border] = useState(null);

	const [show_color_picker, toggle_color_picker] = useState(false);
	const {border_data, edit_style, element_data} = props;
	
	const change_val = (key, value) => {
		let new_border = {...border_data, [key] : value}
		edit_style(element_data?.name, {border : new_border})
	}

	const handle_color_change = (hex) => {
		if (!border_data) return;
		if (hex.match(/^#[A-F0-9]/i) && ((hex.length === 7 || hex.length === 9) || 	hex.length === 4) ) {
			change_val("color", hex)
		}
	}


	const options  = ["solid", "dotted", "dashed", "double", "inset", "outset"]

	return (
		<div>
			<Color type="border-color" initial_value={border_data?.color} get_value={(val) => handle_color_change(val)}/>
			<div className={styles.border}>
				<br/>
				<span className={styles.color_input}>	
					<input type="text" onChange={(e) => change_val("size", e.target.value)} value={border_data?.size}/>
				</span>
				<Dropdown id ={"border_style"} handle_change={(value) => change_val("style", value)} value={border_data?.style} 
				options ={options}/>
			</div>
		</div>
	)
}

export default Border