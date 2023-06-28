import React, { Fragment } from 'react'
import styles from "./BackgroundColor.module.scss"
import Dropdown from '../BottomBar/Dropdown/Dropdown'
import Color from '../Color/Color'

const BackgroundColor = (props) => {

	const {background : {type, colors, direction}, background, edit_style} = props;

	const change_value = (data) => {
		edit_style({background : {...background, ...data}})
	}
	
	const change_color = (index, data) => {
		let new_colors = [...colors]
		new_colors.splice(index, 1, data);
		change_value({colors : new_colors})
	}

	const add_to_gradient = (index) => {
		const new_colors = [...colors]
		const new_color = new_colors[index];
		new_colors.splice(index, 0, new_color)
		change_value({colors : new_colors})
	}
	
	const remove_from_gradient = (index) => {
		const new_colors = [...colors]
		new_colors.splice(index, 1);
		change_value({colors : new_colors})
	}

	return (
		<div>
			<h2 className="sub_header">
				BACKGROUND
			</h2>
				<Dropdown value={type?.value} options = {type?.available_options}
				handle_change = {(d) => change_value({type: {...type, value : d}})}
				style={{marginLeft: "0.5rem", marginTop: "0.5rem"}}/>
			<span className={styles.direction_settings} style={{display: "flex"}}>
				<span>
					direction
				</span>
				<Dropdown height="1.3rem" value={direction?.value} options = {direction?.available_options}
				handle_change = {(d) => change_value({direction: {...direction, value : d}})}/>
			</span>
			{
				type.value === "solid" &&
				<Color type="background-color" initial_value={colors[0]} 
				get_value={(data) => change_color(0, data)}/>
			}
			{
				type.value === "gradient" &&
				colors.map((color, index) => (
					<div className={styles.color_item}>
						<Color type="background-color" initial_value={color} 
						get_value={(data) => change_color(index, data)}/>
						<svg className={styles.button} xmlns="http://www.w3.org/2000/svg" 
						onClick={() => add_to_gradient(index)}width="24" height="24" 
						viewBox="0 0 24 24"><path fill="white" 
						d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg>

						<svg style={{width: "1.3rem", marginLeft: "0.25rem"}} 
						onClick={() => remove_from_gradient(index)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path fill="none" stroke="white" strokeLinecap="round" 
							strokeLinejoin="round" strokeWidth="2" d="M20 5H9l-7 7l7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-2 
							4l-6 6m0-6l6 6"/></svg>
					</div>
				))
			}
		</div>
	)
}

export default BackgroundColor