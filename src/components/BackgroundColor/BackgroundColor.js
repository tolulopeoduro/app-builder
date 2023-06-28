import React from 'react'
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
					<Color type="background-color" initial_value={color} 
					get_value={(data) => change_color(index, data)}/>
				))
			}
		</div>
	)
}

export default BackgroundColor