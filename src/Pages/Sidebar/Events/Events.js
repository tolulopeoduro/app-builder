import React, { useEffect } from 'react'
import styles from "./Events.module.scss"



export default () => {

	useEffect(() => {
		eval("console.log('hello---')")
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<select>
					<option>click</option>
					<option>click</option>
					<option>click</option>
					<option>click</option>
				</select>
				<div contentEditable className={styles.block}>
					
				</div>
			</div>
		</div>	
	)
}