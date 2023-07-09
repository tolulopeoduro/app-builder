// import React, { useEffect, useState } from 'react'
// import styles from "./TextEditor.module.scss"
// import Dropdown from '../Dropdown/Dropdown'
// import { useDispatch, useSelector } from 'react-redux'
// import { update_elements } from '../../../Redux/Reducers/elements_reducer'
// import Dimensions from '../../Dimensions/Dimensions'

// const TextEditor = () => {

// 	const {elements, active_element} = useSelector(s => s);
// 	const [element_style, set_element_style] = useState(null);
// 	const name 
// 	const dispatch = useDispatch()
// 	const element = elements[active_element?.name]

// 	useEffect(() => {
// 		set_element_style(active_element?.attributes?.css);
// 	}, [active_element])


// 	const change_type = (val) => {
// 		const new_elements = {...elements};
// 		new_elements[element?.name] = {...elements[element?.name], tag : val}
// 		dispatch(update_elements(new_elements));
// 	}

// 	const edit_style = (data, replace) => {
// 		const new_style = 
// 		replace ? data :
// 		{
// 			...element_style,
// 			...data
// 		}

// 		set_element_style(new_style)

// 		const element = {
// 			...active_element,
// 			attributes : {
// 				...attributes,
// 				css : new_style
// 			}
// 		}
// 		edit_element(element)
// 	}

// 	return (
// 		<div className = {styles.container}>
// 			<h1>
// 				Text
// 			</h1>
// 			<div>
// 				<Dropdown width = "180px" height = "1.5rem"
// 				value = {element?.tag} 
// 				options = {["h1", "h2", "p", "span"]} handle_change = {change_type}/>
// 			</div>
// 			<Dimensions {...element_style} edit_style={edit_style}/>
// 		</div>
// 	)
// }

// export default TextEditor