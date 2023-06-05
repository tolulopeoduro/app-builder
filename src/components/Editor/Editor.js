import React, { useEffect } from 'react'
import styles from "./Editor.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import BottomBar from '../BottomBar/BottomBar';
import NewElementSelect from '../NewElementSelect/NewElementSelect';
import active_element, { set_active_element } from '../../Redux/Reducers/active_element';
import { update_dimensions } from '../../Redux/Reducers/active_element_dimensions';
import Active_Element_Box from '../Active_Element_Box/Active_Element_Box';

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
		window.onmessage = e => {
			if (e.origin !== "http://localhost:3000") return;
			const {message_type, message} = e.data;
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