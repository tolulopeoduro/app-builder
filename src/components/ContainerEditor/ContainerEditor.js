import { useSelector } from 'react-redux';
import styles from "./ContainerEditor.module.scss"
import { useEffect, useState } from 'react';
import { edit_element } from '../../utils';
import Dimensions from '../Dimensions/Dimensions';
import Color from '../Color/Color';
import Border from '../Border/Border';
import AddStyleMenu from '../AddStyleMenu/AddStyleMenu';

const ContainerEditor = () => {

	const {active_element} = useSelector(s => s);
	const {name, tag, attributes} = active_element;
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

	const [list, set_list] = useState([])

	useEffect(() => {
		if (!element_style) return;
		const list = ["background-color", "border"].map(e => {
			let a = true
			let d = Object.keys(element_style)
			
			for (let i = 0; i < d.length; i++) {
				if (e === d[i]) {
					a = false;
					break;
				};
			}
			if (a) return e;
		})
		set_list(list.filter(e => e));
	}, [element_style])


	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{tag}</h1>
				<span>{name}</span>
			</div>
			<Dimensions {...element_style} edit_style = {edit_style}/>
			<Color {...element_style} type = {"background-color"} edit_style = {edit_style}/>
			{element_style?.border && <Border border_data={element_style?.border} edit_style={edit_style}/>}
			<AddStyleMenu attributes={list} edit_style={edit_style}/>
		</div>
	)
}

export default ContainerEditor