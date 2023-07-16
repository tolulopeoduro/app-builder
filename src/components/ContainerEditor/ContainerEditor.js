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

const ContainerEditor = () => {

	const {active_element, elements, modals} = useSelector(s => s);
	const {name, tag, attributes} = active_element;
	const [element_style, set_element_style] = useState(null);
	const dispatch = (useDispatch());

	const flex_attributes = ["flex-direction", "justify-content", "flex-wrap", "align-items", "align-content"]

	useEffect(() => {
		set_element_style(elements[active_element?.name]?.attributes?.css);
	}, [active_element, elements])

	const edit_style = (data, replace) => {
		const new_style = 
		replace ? data :
		{
			...elements[active_element?.name]?.attributes?.css,
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
					edit_style({[key] : css_attributes_data.flex_settings[key]});
			})
		}
	}, [element_style])

	const change_value = (key, val) => {
		const new_elements = {...elements};
		new_elements[active_element?.name] = {...elements[active_element?.name], [key] : val}
		dispatch(update_elements(new_elements));
	}



	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{tag}</h1>
				<span className={styles.path_container}>
					<PathDisplay elements={elements} element = {active_element}/>
				</span>
			</div>
			<div style={modals.dropdown ? {overflow : "hidden"} : {}} id ="container_editor_body" className={styles.body}>
				{
					tag !== "div" &&
					<TextEditBox active_element={active_element} change_value = {change_value} element = {elements?.[active_element?.name]}/>
				}
					<Attribute order = {1} exists edit_style={edit_style} type="dimensions"
					child= {(<Dimensions {...element_style} edit_style = {edit_style}/>)}/>
					<Attribute order = {element_array.indexOf("background")} exists = {element_style?.background} handle_delete = {remove_attribute} type="background"
					child={(<BackgroundColor edit_style={edit_style} background={element_style?.background}/>)}/>
					<Attribute order = {element_array.indexOf("border")} exists = {element_style?.border} type="border" handle_delete={remove_attribute} 
					child={(<Border border_data={element_style?.border} edit_style={edit_style}/>)}/>
					<Attribute order = {element_array.indexOf("display")} exists = {element_style?.display} type="display"
					handle_delete={remove_attribute}
					child={(<Display edit_style={edit_style} data={element_style?.display} /> )} /> 
					{
						(element_style?.display?.value === "flex" || element_style?.display?.value === "inline-flex") &&
						<FlexLayoutEditor order={element_array.indexOf("display")} edit_style={edit_style} element_style={element_style}/>
					}
					<Attribute order = {element_array.indexOf("color")} exists = {element_style?.color} edit_style={edit_style} type="color" handle_delete={remove_attribute}
					child={(<Color type="Color" initial_value={element_style?.color} get_value={(v) => edit_style({"color" : v})}/>)}/>
					<Attribute order = {element_array.indexOf("font-family")} exists = {element_style?.["font-family"]} type = "font-family" handle_delete={remove_attribute}
					child = {(
						<div style={{padding: "0.5rem 0 0 0.5rem"}}>
							<Dropdown id = {`font-family`}  value={element_style?.["font-family"]}
							options={[...font_list].filter(e => e)}
							handle_change={(v) => edit_style({["font-family"] : v})}/>
						</div>
					)}/>
			</div>
			<AddStyleMenu order={element_array.length-2} attributes={list} edit_style={edit_style}/>
		</div>
	)
}

export default ContainerEditor;