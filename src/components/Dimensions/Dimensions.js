import React from 'react'
import styles from "./Dimensions.module.scss"

const Dimensions = (props) => {

	const {edit_style, height, width} = props

	return (
		<div className={styles.dimensions}>
			<div tabIndex={0} className={styles.height}>
				<p>H</p>
				<input type = "text" value={height} 
				onChange={(e) => edit_style({height : e.target.value	})}/>
			</div>
			<div tabIndex={0} className={styles.height}>
				<p>W</p>
				<input type = "text" value={width} 
				onChange={(e) => edit_style({width : e.target.value}) }/>
			</div>
		</div>
	)
}

export default Dimensions