import React, { Fragment, useEffect, useState } from 'react'
import styles from "./Dropdown.module.scss"
import ClickAwayListener from 'react-click-away-listener';
import {motion, AnimatePresence} from "framer-motion"

const Dropdown = (props) => {
	
	const {width, height, options, handleChange} = props;

	const [active, set_active] = useState(false);

	return (
		<Fragment>
			<div className = {styles.box}>
				<div className = {styles.dropdown} onClick={() => set_active(true)}>
					<div className = {styles.value}>
						dotted
					</div>
					<div className = {styles.button}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="m7 10l5 5l5-5z"/></svg>
					</div>
				</div>
						<AnimatePresence>
							{
								active &&
								<ClickAwayListener onClickAway = {() => set_active(false)}>
									<motion.div initial={{height: 0, opacity: 0}} animate={{opacity: 1, height: "auto"}} exit={{height : 0, opacity : 0}} className = {styles.options}>
										{
											options.map((option) => {
												return (
													<div className = {styles.option} onClick={() => handleChange(option)}>
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