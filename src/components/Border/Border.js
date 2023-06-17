import React, { Fragment, useEffect, useState } from 'react'
import styles from "./Border.module.scss"
import Dropdown from '../BottomBar/Dropdown/Dropdown'

const Border = (props) => {

	const [border, edit_border] = useState(null);
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
		if (color.match(/^#[A-F0-9]/i) && (color.length === 7 || color.length === 4) ) {
			edit_style({'border' : border});
		}
	}, [border])

	const options  = ["solid", "dotted", "dashed", "double", "inset", "outset"]

	return (
		<div>
			<h2 className={styles.sub_header}>
				BORDER
			</h2>
			<div className={styles.border}>
				<div className={styles.color_display} style={{backgroundColor: border_data?.color}}>
				</div>
				<span className={styles.color_input} >	
					<input type='text' onChange={(e) => change_val("color", e.target.value)} value={border?.color}/>
					<input type="text" onChange={(e) => change_val("size", e.target.value)} value={border?.size}/>
				</span>
				<Dropdown handle_change={change_dropdown_value} value={border?.style} 
				options ={options}/>
			</div>
		</div>
	)
}

export default Border