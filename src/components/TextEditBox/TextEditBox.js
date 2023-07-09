import React, { useEffect, useState } from 'react'
import styles from "./TextEditBox.module.scss"
import Dropdown from '../BottomBar/Dropdown/Dropdown'
import { AnimatePresence, motion } from 'framer-motion'

const TextEditBox = (props) => {

	const {change_value, element, active_element} = props;
	const [show_textbox, toggle_textbox] = useState(true);

	useEffect(() => {
		toggle_textbox(true)
	}, [element?.innerHTML])

	useEffect(() => {
		let val = active_element?.innerHTML
		if (document.getElementById("text_box")) {
			document.getElementById("text_box").innerHTML = val;
		}
	}, [active_element?.innerHTML, show_textbox])

	useEffect(() => {
		let val = element?.innerHTML
		if (document.getElementById("text")) {
			document.getElementById("text").innerHTML = val;
		}
	}, [active_element?.innerHTML, element?.innerHTML, show_textbox])

	return (
		<div style={{position: "relative"}}>
			<div className={styles.attribute_box}>
				<Dropdown width = "180px" height = "1.5rem"
				value = {element?.tag} 
				options = {["h1", "h2", "p", "span"]} handle_change = {(v) => change_value("tag", v)}/>
			</div>
			<div style={{height : !show_textbox && "1.5rem" }} className={styles.text_content_editor}>
				<div>
					<svg style={{transform : !show_textbox && "rotateX(180deg)"}} onClick={() => toggle_textbox(show_textbox ? false : true)} xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
						<g transform="rotate(180 512 512)">
							<path fill="white" d="M831.872 340.864L512 652.672L192.128 340.864a30.592 30.592 
							0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 
							0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.592 30.592 0 0 0-42.752 0z"/>
						</g>
					</svg>
					<AnimatePresence>
						{
							!show_textbox &&
							<motion.span initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} id="text">
							</motion.span>
						}
					</AnimatePresence>
				</div>
				<AnimatePresence>
				{
					show_textbox &&
					<motion.span initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} id="text_box" contentEditable onKeyUp={(e) => change_value("innerHTML", e?.target.innerHTML)}>
					</motion.span>
				}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default TextEditBox