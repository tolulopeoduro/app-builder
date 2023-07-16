import styles from "./DropdownOptions.module.scss"
import { AnimatePresence, motion } from 'framer-motion'
import ClickAwayListener from 'react-click-away-listener';
import { useDispatch, useSelector } from 'react-redux'
import { update_modals } from '../../Redux/Reducers/modals';
import { useEffect, useState } from "react";

export default (props) => {

	const {modals} = useSelector(s => s);
	const dispatch = useDispatch();
	const [position, set_position] = useState();

	const {style, options, value, height, id, box}  = modals.dropdown

	const calculate_postion = () => {
		let pos = {top : box.top, left : box.left};
		if (!box || !options) return;
		if (box.top + (box.height * options.length) >= window.innerHeight) {
			pos.top = box.top - (box.height * options.length) + box.height;
			pos.left = box.left;
		} else {
		}
		return pos
	}

	useEffect(() => {
		set_position(calculate_postion())
	}, [modals.dropdown])

	const handle_change = (option) => {
		window.postMessage({att : id, option : option}, `${window.location.origin}/editor`);
	}

	return (
		<AnimatePresence>
			{
				modals.dropdown &&
				<ClickAwayListener onClickAway = {() => dispatch(update_modals({dropdown : null}))}>
					<motion.div style={{...style, ...position}} initial={{height: 0, opacity: 0.1}} animate={{opacity: 1, height: "auto"}} 
					exit={{height : 0, opacity: 0.5}} className = {styles.options}>
						{
							[value, ...options.filter(e => e !== value)].map((option, index) => {
								return (
									<div key={index} style={{height : height, fontFamily: id === "font-family" && option}} className = {styles.option} onClick={() => handle_change(option)}>
										{option}
									</div>
								)
							})
						}
					</motion.div>
				</ClickAwayListener>
			}
		</AnimatePresence>
	)
}