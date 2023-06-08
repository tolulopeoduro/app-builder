import { useSelector } from 'react-redux';
import styles from "./ContainerEditor.module.scss"
import Dropdown from '../BottomBar/Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { update_elements } from '../../Redux/Reducers/elements_reducer';
import { edit_element } from '../../utils';
import Dimensions from '../Dimensions/Dimensions';
import Color from '../Color/Color';
import Border from '../Border/Border';
import hexRgb from 'hex-rgb';

const ContainerEditor = () => {

	const {elements, active_element} = useSelector(s => s);
	const {name, tag, attributes, css} = active_element;
	const {height, width} = attributes.css;
	const [element_style, set_element_style] = useState(null);

	useEffect(() => {
		set_element_style(active_element?.attributes?.css);
	}, [active_element])

	const edit_style = (data) => {
		const new_style = {
			...element_style,
			...data
		}
		set_element_style(new_style)

		const element = {
			...active_element,
			attributes : {
				...attributes,
				css : new_style
			}
		}
		edit_element(element)
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{tag}</h1>
				<span>{name}</span>
			</div>
			<Dimensions {...element_style} edit_style = {edit_style}/>
			<Color {...element_style} type = {"background-color"} edit_style = {edit_style}/>
			<Border border_data={element_style?.border} edit_style={edit_style}/>
			<svg className='add_style' xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
			viewBox="0 0 24 24"><path fill="white" 
			d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg>
		</div>
	)
}

export default ContainerEditor