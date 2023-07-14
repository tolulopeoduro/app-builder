import React, { Fragment, useEffect, useState } from 'react'
import styles from "./Border.module.scss"
import Dropdown from '../BottomBar/Dropdown/Dropdown'
import Color_picker from '../Color/Color_picker/Color_picker';
import Color from '../Color/Color';

const Border = (props) => {

	const [border, edit_border] = useState(null);
	const [show_color_picker, toggle_color_picker] = useState(false);
	const {border_data, edit_style} = props;

	useEffect(() => {
		edit_border(border_data);
	}, [border_data]);

	const change_dropdown_value = (value) => {
		edit_border({...border, style: value})
	}
	
	const change_val = (key, value) => {
		edit_border({...border, [key]: value})
	}

	useEffect(() => {
		if (!border) return;
		const {color} = border;
		if (color?.hex.match(/^#[A-F0-9]/i) && (color?.hex.length === 7 || color?.hex.length === 4) ) {
			edit_style({'border' : border});
		}
	}, [border])

	const options  = ["solid", "dotted", "dashed", "double", "inset", "outset"]

	return (
		<div>
			<Color type="border-color" initial_value={border?.color} get_value={(val) => change_val("color", val)}/>
			<div className={styles.border}>
				<br/>
				<span className={styles.color_input}>	
					<input type="text" onChange={(e) => change_val("size", e.target.value)} value={border?.size}/>
				</span>
				<Dropdown handle_change={change_dropdown_value} value={border?.style} 
				options ={options}/>
			</div>
		</div>
	)
}

export default Border