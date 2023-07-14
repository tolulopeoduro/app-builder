import React, { useEffect, useState } from 'react'
import styles from "./Color_picker.module.scss"
import { RgbaColorPicker } from 'react-colorful'
import ClickAwayListener from 'react-click-away-listener';
import { hex_to_rgb_object } from '../../../utils';
import rgb2hex from 'rgb2hex';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { update_pallete } from '../../../Redux/Reducers/colors_reducer';

import {AnimatePresence, motion} from "framer-motion"

const Color_picker = (props) => {

	const {attribute, initial_value} = props;
	const colors = useSelector(s => s.colors)
	const dispatch = useDispatch();

	const [color, set_color] = useState(null);

	useEffect(() => {
		set_color(initial_value);
	}, [initial_value])

	const handle_change = debounce((value) => {
		const {r,g,b,a} = value;
		props.handle_change({hex : rgb2hex(`rgb(${r}, ${g}, ${b})`).hex , alpha : a})
	}, 100)

	const add_color = (color) => {
		const new_colors = [...colors]
		new_colors.push(color);
		dispatch(update_pallete(new_colors));
	}

	return (
		<ClickAwayListener onClickAway={props.close_modal}>
			<motion.div className={styles.container} 
			style={{
				position: "absolute",
				left: `${-220}px`,
			}}>
				<div className={styles.header}>
					<span>{attribute.replace("-", " ")}</span>
				</div>
				<RgbaColorPicker color={hex_to_rgb_object(color)} onChange={(e) => handle_change(e)}/>
				<div className={styles.pallete}>
					<div className={styles.header}>
						<span>
							SAVED COLORS
						</span>
					</div>
						<div className={styles.color_list}>
							<AnimatePresence>
								{
									colors?.map
									((color, index) =>
										<motion.div initial={{width: 0}} animate={{width: "1.3rem"}} exit={{opacity:0}}
										key = {index} onClick={() => props.handle_change(color)} style={{backgroundColor: "#fff",height:"1.4rem", width:"1.4rem", display:"flex"}}	>
											<div style={{height:"100%", width:"50%", backgroundColor:color?.hex}}>
											</div>
											<div style={{height:"100%", width:"50%", backgroundColor:color?.hex, opacity: color?.alpha}}>
											</div>
										</motion.div>
									)
								}
							</AnimatePresence>
							<div style={{transition : "all 200ms"}} onClick={() => add_color(color)}>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
								viewBox="0 0 24 24"><path fill="white" 
								d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg>
							</div>
						</div>
				</div>
			</motion.div>
		</ClickAwayListener>
	)
}

export default Color_picker