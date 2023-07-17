import React from 'react'
import Dropdown from '../BottomBar/Dropdown/Dropdown'
import styles from "./Display.module.scss"
import FlexLayoutEditor from '../FlexLayoutEditor/FlexLayoutEditor';

const Display = (props) => {

	const {data, edit_style, element_style, element_data} = props;

	return (
		<div>
			<div className={styles.body}>
				<Dropdown id ="display" value={data?.value} options={data?.available_options} 
				handle_change={(e) => edit_style(element_data?.name, {"display" : {...data, value : e}})}/>
			</div>
			{
				(data?.value === "flex" || data?.value === "inline-flex") &&
				<FlexLayoutEditor element_data={element_data} edit_style={edit_style} element_style={element_style}/>
			}
		</div>
	)
}

export default Display