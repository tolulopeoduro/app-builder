import React, { useEffect, useState } from 'react'
import styles from "./Editor.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import BottomBar from '../BottomBar/BottomBar';
import NewElementSelect from '../NewElementSelect/NewElementSelect';
import active_element, { set_active_element } from '../../Redux/Reducers/active_element';
import { update_dimensions } from '../../Redux/Reducers/active_element_dimensions';
import Active_Element_Box from '../Active_Element_Box/Active_Element_Box';
import Color_picker from '../Color/Color_picker/Color_picker';
import { view_element } from '../../Redux/Reducers/viewed_element';
import ElementDescriptionBox from '../ElementDescriptionBox/ElementDescriptionBox';
import { update_modals } from '../../Redux/Reducers/modals';
import { AnimatePresence, motion } from 'framer-motion';
import Dropdown from '../BottomBar/Dropdown/Dropdown';
import DropdownOptions from '../DropdownOptions/DropdownOptions';

const Editor = () => {

	const dispatch = useDispatch();

	const {elements, modals, active_element, active_element_dimension, viewed_element} = useSelector(s => s);
	const [show_editor, toggle_editor] = useState(false)
	
	const frame = document.getElementById("result");

	useEffect(() => {
		window.addEventListener("contextmenu",(e) => {
			e.preventDefault();
		})
	}, [])

	useEffect(() => {
		document.getElementById('result').contentWindow.postMessage({message_type : "elements", message: elements}, "http://localhost:3000/frame")
	}, [elements])
	
	useEffect(() => {
		document.getElementById('result').contentWindow.postMessage({message_type : "active_element", message: active_element}, "http://localhost:3000/frame")
	}, [active_element?.name])
	
	useEffect(() => {
		dispatch(update_modals({editor : true}))
	}, [active_element])

	useEffect(() => {
		if (modals?.editor === false && modals.new_element) dispatch(update_modals({new_element : false}))
	}, [modals])

	useEffect(() => {
		window.onmessage = e => {
			if (!e.data?.message) return;
			if (e.origin !== "http://localhost:3000") return;
			let {message_type, message} = e.data;
			message = JSON.parse(JSON.stringify(message))
			message_type === "active_element" && dispatch(set_active_element(message))
			message_type === "active_element_dimension" && dispatch(update_dimensions(message))
			message_type === "view_element" && dispatch(view_element(message))
		}
	}, [])


	useEffect(() => {
		dispatch(update_modals({peek : false}))
		setTimeout(() => {
			dispatch(update_modals({peek : true}))
		}, 0)
	}, [viewed_element])


	return (
		<div id="editor" className={styles.Editor}>
			<div style={{height : "100%", width : "100%"}} className={styles.frame}>
				<iframe id="result" src={`${process.env.PUBLIC_URL}/frame`}/>
			</div>
			<AnimatePresence>
			{ (modals?.editor && active_element) 	&& <BottomBar hide_editor={() => dispatch(update_modals({editor : false}))}/> }
			</AnimatePresence>
			<NewElementSelect/>
			{ (active_element && active_element_dimension) 	&& <Active_Element_Box/>}
			{(viewed_element && modals?.peek) && <ElementDescriptionBox {...viewed_element}/>}
			<AnimatePresence>
				{
					(active_element &&!modals?.editor) &&
					<motion.div onClick={() => dispatch(update_modals({editor : true}))} className={styles.show_editor}initial={{top : window.innerHeight -250}} animate={{opacity:1, top: "auto"}} exit={{ top : window.innerHeight -250, opacity: 0}}>
						<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><g transform="rotate(180 512 512)"><path fill="white" d="M831.872 340.864L512 652.672L192.128 340.864a30.592 30.592 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.592 30.592 0 0 0-42.752 0z"/></g></svg>
					</motion.div>
				}
			</AnimatePresence>
			{modals?.dropdown && <DropdownOptions/>}
		</div>
	)
}


export default Editor