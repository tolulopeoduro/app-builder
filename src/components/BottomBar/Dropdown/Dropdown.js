import React, { Fragment, useEffect, useState } from 'react'
import styles from "./Dropdown.module.scss"
import ClickAwayListener from 'react-click-away-listener';
import {motion, AnimatePresence} from "framer-motion"
import { act } from 'react-dom/test-utils';

const Dropdown = (props) => {
	
	const {width, height, options, handle_change, value, style, id} = props;

	const [active, set_active] = useState(false);
	const [position , set_position] = useState({})

	useEffect(() => {
		set_active(false)
	}, [value])

	
	const getPosition = () => {
		let el = document.getElementById(value)
		let box = el?.getBoundingClientRect()
		if (!box) return;
		let total_height = box?.bottom + (box.height * options?.length);
		console.log(document.getElementById("container_editor_body").scrollTop)
		if (total_height > window.innerHeight) {
			return {bottom : (el.offsetParent?.offsetHeight - el?.offsetTop)+(document.getElementById("container_editor_body").scrollTop + (-box.height))}
		} 
		return{top: el.offsetTop - box?.height}
	}

	useEffect(() => {
		set_position(getPosition())
		document.getElementById("container_editor_body").style.overflowX = active ?  "hidden" : "scroll"
	}, [active])

	return (
		<Fragment>
			<div id = {value} style={{height: height}} className = {styles.box}>
				<div style={{height : height, ...style}} className = {styles.dropdown} onClick={() => set_active(true)}>
					<div style={{fontFamily : id  === "font-family" && value}} className = {styles.value}>
						{value}
					</div>
					<div className = {styles.button}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="m7 10l5 5l5-5z"/></svg>
					</div>
				</div>
						<AnimatePresence>
							{
								active &&
								<ClickAwayListener onClickAway = {() => set_active(false)}>
									<motion.div style={{...style, ...position}} initial={{height: 0, opacity: 0.1}} animate={{opacity: 1, height: "auto"}} 
									exit={{height : 0, opacity: 0.5}} className = {styles.options}>
										{
											[value, ...options.filter(e => e !== value)].map((option) => {
												return (
													<div style={{height : height, fontFamily: id === "font-family" && option}} className = {styles.option} onClick={() => handle_change(option)}>
														{option}
													</div>
												)
											})
										}
									</motion.div>
								</ClickAwayListener>
							}
						</AnimatePresence>
			</div>
		</Fragment>
	)
}

export default Dropdown