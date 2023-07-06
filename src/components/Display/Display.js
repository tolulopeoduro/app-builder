import React from 'react'
import Dropdown from '../BottomBar/Dropdown/Dropdown'
import styles from "./Display.module.scss"

const Display = (props) => {

	const {data, edit_style} = props;

	return (
		<div>
			<div className={styles.body}>
				<Dropdown value={data?.value} options={data?.available_options} 
				handle_change={(e) => edit_style({"display" : {...data, value : e}})}/>
			</div>
		</div>
	)
}

export default Display