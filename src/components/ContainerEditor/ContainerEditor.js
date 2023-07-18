import { useDispatch, useSelector } from 'react-redux';
import styles from "./ContainerEditor.module.scss"
import { Fragment, useEffect, useState } from 'react';
import { edit_element, font_list } from '../../utils';
import Dimensions from '../Dimensions/Dimensions';
import Color from '../Color/Color';
import AddStyleMenu from '../AddStyleMenu/AddStyleMenu';
import Attribute from '../RemoveStyleHOC/Attribute';
import Border from "../Border/Border"
import css_attributes_data from "../../attributes_data.json"
import Display from '../Display/Display';
import PathDisplay from '../PathDisplay/PathDisplay';
import FlexLayoutEditor from '../FlexLayoutEditor/FlexLayoutEditor';
import Dropdown from '../BottomBar/Dropdown/Dropdown';
import BackgroundColor from '../BackgroundColor/BackgroundColor';
import { update_elements } from '../../Redux/Reducers/elements_reducer';
import TextEditBox from '../TextEditBox/TextEditBox';
import MarginEditor from '../MarginEditor/MarginEditor';

const ContainerEditor = () => {

	const {modals, elements, active_element} = useSelector(s => s);
	const dispatch = (useDispatch());
	// const [element_data, set_element_data] = useState();
	// const [element_style, set_element_style] = useState();

	useEffect(() => {
		// set_element_data(elements[active_element])
		// set_element_style(elements[active_element]?.attributes.css)
	}, [elements[active_element]])


	const element_data = elements[active_element]
	const element_style = elements[active_element]?.attributes?.css;

	const edit_style = (id, data, replace) => {
		let new_style = element_style
		if (!replace) {
			new_style = {...element_style, ...data}
		} else {
			new_style = data;
		}
		const new_element = {...elements[id]}
		const attributes = new_element.attributes
		new_element.attributes = {
			...attributes,
			css : new_style
		}

		let new_elements = {...elements}
		new_elements[id] = new_element;
		dispatch(update_elements(new_elements))
	}

	const remove_attribute = (attribute) => {
		let st = {...element_style};
		delete st[attribute]
		edit_style(active_element, st, true)
	}

	const [list, set_list] = useState([])
	const [element_array, set_element_array] = useState([])

	useEffect(() => {
		if (!element_style) return
		const v = Object.keys(element_style)
		v && set_element_array(v);
	}, [element_style])

	useEffect(() => {
		if (!element_style) return;
		const list = Object.keys(css_attributes_data).map(e => {
			let a = e !== "flex_settings"
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

	useEffect(() => {
		if (element_style?.display?.value === "flex") {
			Object.keys(css_attributes_data?.flex_settings)
			.forEach(key => {
				if (!element_style[key])
					edit_style(element_data?.name, {[key] : css_attributes_data.flex_settings[key]});
			})
		}
	}, [element_style])

	const change_value = (id ,key, val) => {
		const new_element = {...elements[id]}
		new_element[key] = val
		let new_elements = {...elements}
		new_elements[id] = new_element;
		dispatch(update_elements(new_elements))
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{element_data?.tag}</h1>
				<span className={styles.path_container}>
					<PathDisplay elements={elements} element = {element_data}/>
				</span>
			</div>
			<div style={modals.dropdown ? {overflow : "hidden"} : {}} id ="container_editor_body" className={styles.body}>
				{
					element_data?.tag !== "div" && (
						<Fragment>
							<TextEditBox element_style={element_style} edit_style={edit_style}
							change_value = {change_value} element_data = {element_data}/>
						</Fragment>
					)
				}
					<Attribute order = {1} exists edit_style={edit_style} type="dimensions"
					child= {(<Dimensions element_data={element_data} {...element_style} edit_style = {edit_style}/>)}/>
					<Attribute order = {element_array.indexOf("background")} exists = {element_style?.background} handle_delete = {remove_attribute} type="background"
					child={(<BackgroundColor element_data={element_data} edit_style={edit_style} background={element_style?.background}/>)}/>
					<Attribute order = {element_array.indexOf("border")} exists = {element_style?.border} type="border" handle_delete={remove_attribute} 
					child={(<Border border_data={element_style?.border} element_data={element_data} edit_style={edit_style}/>)}/>
					<Attribute order = {element_array.indexOf("display")} exists = {element_style?.display} type="display"
					handle_delete={remove_attribute}
					child={(<Display edit_style={edit_style} data={element_style?.display}  element_data={element_data}
					element_style = {element_style}  /> )} /> 
					
					<Attribute order = {element_array.indexOf("color")} exists = {element_style?.color} type="color" handle_delete={remove_attribute}
					child={(<Color type="Color" initial_value={element_style?.color} element_data={element_data} get_value={(v) => edit_style(element_data?.name, {"color" : v})}/>)}/>
					<Attribute order = {element_array.indexOf("font-family")} exists = {element_style?.["font-family"]} type = "font-family" handle_delete={remove_attribute}
					child = {(
						<div style={{padding: "0.5rem 0 0 0.5rem"}}>
							<Dropdown id = {`font-family`}  value={element_style?.["font-family"]}
							options={[...font_list].filter(e => e)}
							handle_change={(v) => edit_style(element_data?.name, {["font-family"] : v})}/>
						</div>
					)}/>
					<Attribute order = {element_array.indexOf("margin")} exists = {element_style.margin != null} type = 'margin' handle_delete = {remove_attribute}
					child = {(
						<MarginEditor data={element_style["margin"]} edit_style={edit_style} active_element = {active_element} attribute ="margin" />	
					)}/>
					<Attribute order = {element_array.indexOf("padding")} exists = {element_style.padding != null} type = 'padding' handle_delete = {remove_attribute}
					child = {(
						<MarginEditor data={element_style["padding"]} edit_style={edit_style} active_element = {active_element} attribute ="padding" />	
					)}/>
			</div>
			<AddStyleMenu  element_data={element_data} order={element_array?.length} attributes={list} edit_style={edit_style}/>
		</div>
	)
}

export default ContainerEditor;