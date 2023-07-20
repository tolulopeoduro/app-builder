import React, { useEffect, useMemo, useState } from 'react'
import styles from "./TextEditBox.module.scss"
import Dropdown from '../BottomBar/Dropdown/Dropdown'
import { AnimatePresence, motion } from 'framer-motion'
import available_options from "../../css_available_options.json"
import active_element from '../../Redux/Reducers/active_element'
import { debounce } from 'lodash'

const TextEditBox = (props) => {

	const {change_value, element_data, element_style, edit_style} = props;
	const [show_textbox, toggle_textbox] = useState(true);

	useEffect(() => {
		let val = element_data?.innerHTML;
		document.getElementById("text_box").innerHTML = val;
	}, [element_data?.name])

	const edit_text = (e) => {
		setTimeout(() => {
			handleEnd(e)
		}, 0)
	}

	const handleEnd = useMemo(
		(e) => debounce((e) =>  {
			const p = e.target.innerHTML;
			const reg1 = /<div><br><\/div>/g
			const reg2 = /<div>/g
			const reg3 = /s<\/div>/g
			const p2 = p.replace(reg1, "<br/>").replace(reg2, "<br/>").replace("</div>", "").split("</div>").join("")
			change_value(element_data?.name, "innerHTML", p2)
		}, 150), []
	)

	const alignments = [
		{
			value : "left",
			icon : <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M224 64v8a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-8a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8ZM40 120h128a8 8 0 0 0 8-8v-8a8 8 0 0 0-8-8H40a8 8 0 0 0-8 8v8a8 8 0 0 0 8 8Zm176 16H40a8 8 0 0 0-8 8v8a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8v-8a8 8 0 0 0-8-8Zm-48 40H40a8 8 0 0 0-8 8v8a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-8a8 8 0 0 0-8-8Z"/></svg>
		},
		{
			value : "center",
			icon : <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M224 64v8a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-8a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8Zm-32 56a8 8 0 0 0 8-8v-8a8 8 0 0 0-8-8H64a8 8 0 0 0-8 8v8a8 8 0 0 0 8 8Zm24 16H40a8 8 0 0 0-8 8v8a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8v-8a8 8 0 0 0-8-8Zm-24 40H64a8 8 0 0 0-8 8v8a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-8a8 8 0 0 0-8-8Z"/></svg>
		},
		{
			value : "right",
			icon : <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M224 64v8a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-8a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8Zm-8 32H88a8 8 0 0 0-8 8v8a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-8a8 8 0 0 0-8-8Zm0 40H40a8 8 0 0 0-8 8v8a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8v-8a8 8 0 0 0-8-8Zm0 40H88a8 8 0 0 0-8 8v8a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-8a8 8 0 0 0-8-8Z"/></svg>
		}
	]

	const decoration = [
		{
			value : "overline",
			icon : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M5 5V3h14v2H5Zm7 16q-2.925 0-4.963-2.038T5 14q0-2.925 2.038-4.963T12 7q2.925 0 4.963 2.038T19 14q0 2.925-2.038 4.963T12 21Zm0-2.5q1.875 0 3.188-1.313T16.5 14q0-1.875-1.313-3.188T12 9.5q-1.875 0-3.188 1.313T7.5 14q0 1.875 1.313 3.188T12 18.5Z"/></svg>
		},
		{
			value : "underline",
			icon : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 5v5a5 5 0 0 0 10 0V5M5 19h14"/></svg>
		},
		{
			value : "line-through",
			icon : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="white" d="M19 12a1 1 0 0 1 .117 1.993L19 14h-2.11c.217.327.392.684.518 1.063c.953 2.859-1.109 5.809-4.083 5.933L13.13 21h-1.702a5.737 5.737 0 0 1-5.02-2.958l-.112-.213l-.182-.365a.992.992 0 0 1-.105-.6a1 1 0 0 1 1.817-.427l.042.066l.217.431a3.737 3.737 0 0 0 3.131 2.06l.212.006h1.701a2.51 2.51 0 0 0 1.297-4.66l-.174-.096l-.488-.244H5a1 1 0 0 1-.117-1.993L5 12h14Zm-6.428-9a5.737 5.737 0 0 1 5.132 3.171l.18.363a1.002 1.002 0 0 1-1.405 1.32a.995.995 0 0 1-.316-.306l-.035-.058l-.213-.424A3.737 3.737 0 0 0 12.572 5h-1.701a2.51 2.51 0 0 0-1.123 4.756L12.236 11H8.013A4.51 4.51 0 0 1 6.59 8.937C5.618 6.017 7.791 3 10.871 3h1.701Z"/></g></svg>
		},
	]

	const add_decor = (value) => {
		if (!element_style["text-decoration"]) return;
		const ar = [...element_style["text-decoration"]]
		ar.push(value)
		edit_style(element_data?.name, {["text-decoration"] : ar})
	}
	
	const remove_decor = (value) => {
		const ar = [...element_style["text-decoration"]]
		ar.splice(ar.indexOf(value), 1)
		edit_style(element_data?.name, {["text-decoration"] : ar})
	}

	return (
		<div order="-1" style={{position: "relative"}}>
			<div className={styles.attribute_box}>
				<Dropdown id="position" width = "180px" height = "1.5rem"
				value = {element_data?.tag} 
				options = {["h1", "h2", "p"]} handle_change = {(v) => change_value(element_data?.name, "tag", v)}/>
			</div>
			<div style={{height : !show_textbox && "40px" }} className={styles.text_content_editor}>
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
					<motion.span style={{height: "100%", width: "100%"}} id ="text_box" contentEditable onKeyUp={(e) => edit_text(e)}>
					</motion.span>
				}
				</AnimatePresence>
			</div>
			<div>
				<div className={styles.style_input}>
					<span>font size</span>
					<input type='text' value = {element_style?.["font-size"]} onChange={(e) => edit_style(element_data?.name, {["font-size"] : e.target.value})}/>
				</div>
				<div className={styles.style_input}>
					<span>font weight</span>
					<Dropdown id = "text_font_weight" height = "1.5rem" value = {element_style?.["font-weight"]} 
					options ={available_options?.["font-weight"]} handle_change={(value) => edit_style(element_data?.name, {["font-weight"] : value}) } />
				</div>
				<div className={styles.text_decoration}>
					{
						alignments.map((option,index) => (
							<div key={index} style={{backgroundColor : element_style["text-align"] === option.value && "rgba(0,0,0,0.2)"}}
							onClick = {() => edit_style(element_data?.name, {"text-align" : option.value})}
							className={styles.text_align_value}>
								{option.icon}
							</div>
						))
					}
				</div>
				<div className={styles.text_decoration}>
					{
						decoration.map((option,index) => (
							<div style={{backgroundColor : element_style["text-decoration"].includes(option.value) && "rgba(0,0,0,0.2)"}} 
							className={styles.text_align_value} 
							onClick={() => !element_style["text-decoration"]?.includes(option.value) ? add_decor(option.value) : remove_decor(option.value)} >
								{option.icon}
							</div>
						))
					}
				</div>
			</div>
		</div>
	)
}

export default TextEditBox