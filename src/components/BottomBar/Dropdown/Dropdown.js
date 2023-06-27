import React, { Fragment, useEffect, useState } from 'react'
import styles from "./Dropdown.module.scss"
import ClickAwayListener from 'react-click-away-listener';
import {motion, AnimatePresence} from "framer-motion"

const Dropdown = (props) => {
	
	const {width, height, options, handle_change, value} = props;

	const [active, set_active] = useState(false);

	useEffect(() => {
		set_active(false)
	}, [value])

	return (
		<Fragment>
			<div className = {styles.box}>
				<div style={{height : height}} className = {styles.dropdown} onClick={() => set_active(true)}>
					<div className = {styles.value}>
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
									<motion.div initial={{height: 0, opacity: 0.1}} animate={{opacity: 1, height: "auto"}} exit={{height : 0, opacity: 0.5}} className = {styles.options}>
										{
											[value, ...options.filter(e => e !== value)].map((option) => {
												return (
													<div style={{height : height}} className = {styles.option} onClick={() => handle_change(option)}>
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