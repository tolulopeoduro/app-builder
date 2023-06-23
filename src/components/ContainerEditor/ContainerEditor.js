import { useSelector } from 'react-redux';
import styles from "./ContainerEditor.module.scss"
import { Fragment, useEffect, useState } from 'react';
import { edit_element } from '../../utils';
import Dimensions from '../Dimensions/Dimensions';
import Color from '../Color/Color';
import AddStyleMenu from '../AddStyleMenu/AddStyleMenu';
import Attribute from '../RemoveStyleHOC/Attribute';
import Border from "../Border/Border"
import css_attributes_data from "../../attributes_data.json"
import Display from '../Display/Display';

const ContainerEditor = () => {

	const {active_element} = useSelector(s => s);
	const {name, tag, attributes} = active_element;
	const [element_style, set_element_style] = useState(null);

	useEffect(() => {
		set_element_style(active_element?.attributes?.css);
	}, [active_element])

	const edit_style = (data, replace) => {
		const new_style = 
		replace ? data :
		{
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

	const remove_attribute = (attribute) => {
		let st = {...element_style};
		delete st[attribute];
		edit_style(st, true)
	}

	const [list, set_list] = useState([])

	useEffect(() => {
		if (!element_style) return;
		const list = Object.keys(css_attributes_data).map(e => {
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
				<Attribute exists = {element_style?.["background-color"]} handle_delete = {remove_attribute} type="background-color"
				child={(
					<div>
						<h2 className={styles.sub_header}>
							BACKGROUND
						</h2>
						<Color type="background-color" initial_value={element_style?.["background-color"]} 
						get_value={(color) => edit_style({"background-color" : color})}/>
					</div>
				)}/>
				<Attribute exists = {element_style?.border} type="border" handle_delete={remove_attribute} 
				child={(<Border border_data={element_style?.border} edit_style={edit_style}/>)}/>
				<Attribute exists = {element_style?.display} 
				child={(<Display edit_style={edit_style} data={element_style?.display} /> )} /> 
			<AddStyleMenu attributes={list} edit_style={edit_style}/>
		</div>
	)
}

export default ContainerEditor