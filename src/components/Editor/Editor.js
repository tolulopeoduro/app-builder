import React, { useEffect } from 'react'
import styles from "./Editor.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import BottomBar from '../BottomBar/BottomBar';
import NewElementSelect from '../NewElementSelect/NewElementSelect';
import active_element, { set_active_element } from '../../Redux/Reducers/active_element';
import { update_dimensions } from '../../Redux/Reducers/active_element_dimensions';
import Active_Element_Box from '../Active_Element_Box/Active_Element_Box';
import Color_picker from '../Color/Color_picker/Color_picker';

const Editor = () => {

	const dispatch = useDispatch();
	const state = useSelector(s => s);

	useEffect(() => {
		
	}, [])

	const {elements, modals, active_element, active_element_dimension} = useSelector(s => s);
	
	const frame = document.getElementById("result");

	useEffect(() => {
		document.getElementById('result').contentWindow.postMessage({message_type : "elements", message: elements}, "http://localhost:3000/frame")
	}, [elements])
	
	useEffect(() => {
		document.getElementById('result').contentWindow.postMessage({message_type : "active_element", message: active_element}, "http://localhost:3000/frame")
	}, [active_element])
	

	useEffect(() => {
		window.onmessage = e => {
			if (!e.data?.message) return;
			if (e.origin !== "http://localhost:3000") return;
			let {message_type, message} = e.data;
			message = JSON.parse(JSON.stringify(message))
			message_type === "active_element" && dispatch(set_active_element(message))
			message_type === "active_element_dimension" && dispatch(update_dimensions(message))
		}
	}, [])

	return (
		<div className={styles.Editor}>
			<div style={{height : "95%", width : "95%"}} className={styles.frame}>
				<iframe id="result" src={`${process.env.PUBLIC_URL}/frame`}/>
			</div>
			<NewElementSelect/>
			{ active_element 	&& <BottomBar/> }
			{ (active_element && active_element_dimension) 	&& <Active_Element_Box/>}

		</div>
	)
}


export default Editor