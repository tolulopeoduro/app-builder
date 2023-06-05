import { useSelector } from 'react-redux';
import styles from "./ContainerEditor.module.scss"
import Dropdown from '../BottomBar/Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { update_elements } from '../../Redux/Reducers/elements_reducer';
import { edit_element } from '../../utils';

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
		edit_element(element);
	}

	useEffect(() => {
		console.log(attributes?.css);
	}, [attributes])	

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{tag}</h1>
				<span>{name}</span>
			</div>
			<div className={styles.dimensions}>
				<div tabIndex={0} className={styles.height}>
					<p>H</p>
					<input type = "text" value={element_style?.height} 
					onChange={(e) => edit_style({height : e.target.value	})}/>
				</div>
				<div tabIndex={0} className={styles.height}>
					<p>W</p>
					<input type = "text" value={100}/>
				</div>
			</div>
			<h2 className={styles.sub_header}>
				BACKGROUND
			</h2>
			<div className={styles.background}>
				<div className={styles.color_display} style={{backgroundColor: "#000000"}}>
				</div>
				<span className={styles.color_input} >
					#
					<input type='text' value="000000"/>
					<input type="number" value={100}/>
				</span>
				<span className={styles.color_alpha}>

				</span>
			</div>
			<h2 className={styles.sub_header}>
				BORDER
			</h2>
			<div className={styles.border}>
				<div className={styles.color_display} style={{backgroundColor: "#000000"}}>
				</div>
				<span className={styles.color_input} >
					#
					<input type='text' value="000000"/>
					<input type="number" value={1}/>
				</span>
				<Dropdown options ={["dotted"]}/>
			</div>
		</div>
	)
}

export default ContainerEditor