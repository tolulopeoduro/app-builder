import React from 'react'
import styles from "./TextEditor.module.scss"
import Dropdown from '../Dropdown/Dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { update_elements } from '../../../Redux/Reducers/elements_reducer'

const TextEditor = () => {

	const {elements} = useSelector(s => s);
	const dispatch = useDispatch()

	const change_type = (val) => {
		const new_elements = {...elements};
		new_elements["App"] = {...elements["App"], tag : val}
		dispatch(update_elements(new_elements));
	}

	return (
		<div className = {styles.container}>
			<h1>
				Text
			</h1>
			<Dropdown width = "180px" height = "2.2rem" 
			options = {["h1", "h2", "p"]} handleChange = {change_type}/>
		</div>
	)
}

export default TextEditor