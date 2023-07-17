import { Fragment, useEffect, useState } from 'react'
import styles from "./BackgroundColor.module.scss"
import Dropdown from '../BottomBar/Dropdown/Dropdown'
import Color from '../Color/Color'
import {AnimatePresence, motion} from "framer-motion"

const BackgroundColor = (props) => {

	const {background : {type, colors, direction, gradient_type, image}, background, edit_style, element_data} = props;
	const [show, toggle] = useState(false)

	const change_value = (data) => {
		edit_style(element_data?.name, {background : {...background, ...data}})
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
		if (!colors[1]) return;
		const new_colors = [...colors]
		new_colors.splice(index, 1);
		change_value({colors : new_colors})
	}

	const handle_custom_value = (e, key) => {
		let new_val = {...image[key]}
		new_val.custom_value = e.target.value;
		change_value({image : {...image, [key] : new_val}})
	}

	return (
		<div>
			<div>
					<Dropdown id ={"background_color_type"} value={type?.value} options = {type?.available_options}
					handle_change = {(d) => change_value({type: {...type, value : d}})}
					style={{marginLeft: "0.5rem", marginTop: "0.5rem"}}/>
					{
					type?.value === "gradient" &&
					<Fragment>
						<span className={styles.direction_settings} style={{display: "flex"}}>
								<span>
									type
								</span>
								<Dropdown id={"background_gradient_type"} height="1.3rem" value={gradient_type?.value} options = {gradient_type?.available_options}
								handle_change = {(d) => change_value({gradient_type: {...gradient_type, value : d}})}/>
						</span>
					</Fragment>
					}
					{
					`${gradient_type?.value}-${type?.value}` === "linear-gradient" &&
					<Fragment>
						<span className={styles.direction_settings} style={{display: "flex"}}>
								<span>
									direction
								</span>
								<Dropdown id="background_gradient_direction" height="1.3rem" value={direction?.value} options = {direction?.available_options}
								handle_change = {(d) => change_value({direction: {...direction, value : d}})}/>
						</span>
					</Fragment>
					}
				{
					type.value === "solid" &&
					<Color type="background-color" initial_value={colors[0]} 
					get_value={(data) => change_color(0, data)}/>
				}
				{
					type.value === "gradient" &&
					colors.map((color, index) => (
						<div key={index} className={styles.color_item}>
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
				{
					type.value === "image" && 
					<div className={styles.url}>
						<input placeholder='url' type='text' onChange={(e) => change_value({image : { ...image, url : e.target.value}})} value={image.url}/>
						<div className={styles.image_settings}>
							{
								Object.keys(image).map((key, index) => {
									if (key !== "url" && key !== "repeat	") 
									return (
										<Fragment key = {index}>
											<div className={styles.input}>
												<span>{key}: </span>
												<Dropdown id={`image_${key}`} height="1.3rem" value={image?.[key]?.value}
												options = {image?.[key]?.available_options}
												handle_change = {v => change_value({image : {...image, [key] : {...image[key], value : v}}})} />
											</div>
											{
												(image[key].value === "input custom size") &&
												<div className={styles.custom_value_input}>
													<span>custom value</span>
													<input  placeholder='url' type='text' onChange={(e) => handle_custom_value(e, key)} value={image[key]?.custom_value}/>
												</div>
											}
										</Fragment>
									)
								})
							}
						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default BackgroundColor