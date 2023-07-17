import React, { useEffect } from 'react'
import styles from "./NewElementSelect.module.scss";
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import ClickAwayListener from 'react-click-away-listener';
import { create_element } from '../../utils';
import randomstring from "randomstring"
import default_styles from "../../default_styles.json"

const NewElementSelect = () => {
	
	const {modals, elements, active_element} = useSelector(s => s)
	// Animation styles for components
	const initial = {
		opacity: 0,
		bottom: "200vh"
	}

	const animate = {
		height: "auto",
		width: "auto",
		opacity: 1,
		bottom: "56%",
	}


	const handle_element_creation = (type, tag) => {
		const element_data = elements[active_element]
		const parent = element_data?.type === "text" ? element_data?.parent : active_element;
		const name = randomstring.generate();
		const element = {
			is_component : false,
			name: name,
			children : [],
			innerHTML : `new ${type}`,
			type: type,
			tag : tag,
			parent : parent,
			attributes : {
				id : name,
				className : name, "data-builder_id" : name,
				css : {height: "auto", width: "auto",  ...default_styles[tag]}
			},
			style : {},
		}

		create_element(element, parent, name);
	}

	return (
		<AnimatePresence>
			{
				modals?.new_element &&
				<ClickAwayListener>
					<motion.div initial={initial} animate={animate} exit={{bottom: "-50vh"}} className={styles.container}>
						<h1>
							New Element
						</h1>
						<div className={styles.options}>
							<div onClick={() => handle_element_creation("container", "div")}>
								container
							</div>
							<div onClick={() => handle_element_creation("text", "p")}>
								Text
							</div>
						</div>
					</motion.div>
				</ClickAwayListener>
			}
		</AnimatePresence>
	)
}

export default NewElementSelect