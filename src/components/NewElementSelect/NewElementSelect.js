import React from 'react'
import styles from "./NewElementSelect.module.scss";

const NewElementSelect = () => {
	return (
		<div className={styles.container}>
			<h1>
				New Element
			</h1>
			<div className={styles.options}>
				<div>
					container
				</div>
				<div>
					Text
				</div>
				<div>
					Button
				</div>
			</div>
		</div>
	)
}

export default NewElementSelect