import React from 'react'
import styles from "./DropdownOptions.module.scss"
import { font_list } from '../../utils'
import { AnimatePresence, motion } from 'framer-motion'
import ClickAwayListener from 'react-click-away-listener'
import { useDispatch, useSelector } from 'react-redux'
import { update_modals } from '../../Redux/Reducers/modals'

export default () => {
	const {value, options, dropdown_box} = useSelector(s => s.modals.dropdown);
	const dispatch = useDispatch()
	return (
		<div style={{top: dropdown_box?.bottom, left: dropdown_box?.left, zIndex: 8, height: (dropdown_box?.height * options.length)}}  className={styles.options}>
			<AnimatePresence>
					<ClickAwayListener onClickAway={() => dispatch(update_modals({dropdown : null}))}>
						<motion.div initial={{height: 0, opacity: 0.1}} animate={{opacity: 1, height: "auto"}} 
						exit={{height : 0, opacity: 0.5}} className = {styles.options}>
							{
								[value, ...options.filter(e => e !== value)].map((option) => {
									return (
										<div style={{height: dropdown_box?.height}} className = {styles.option} onClick={() => console.log(option)}>
											{option}
										</div>
									)
								})
							}
						</motion.div>
					</ClickAwayListener>
			</AnimatePresence>
		</div>
	)
}