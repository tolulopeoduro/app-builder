import React, { useEffect } from 'react'
import styles from "./Editor.module.scss"
import { useSelector } from 'react-redux'

const Editor = () => {

	const st = useSelector(s => s);
	useEffect(() => {
		console.log(st);
	})

	return (
		<div className={styles.Editor}>
			<div style={{height : "95%", width : "95%"}} className={styles.frame}>
				<iframe src={`${process.env.PUBLIC_URL}/frame`}/>
			</div>
		</div>
	)
}

export default Editor