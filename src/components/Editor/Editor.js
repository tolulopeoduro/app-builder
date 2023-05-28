import React, { useEffect } from 'react'
import styles from "./Editor.module.scss"
import { useSelector } from 'react-redux'
import BottomBar from '../BottomBar/BottomBar';
import NewElementSelect from '../NewElementSelect/NewElementSelect';

const Editor = () => {

	const {elements} = useSelector(s => s);
	useEffect(() => {
		document.getElementById('result').contentWindow.location.reload();
	}, [elements])
	useEffect(() => {
		console.log(document.querySelectorAll('[data-builder_id]'))
		// document.querySelectorAll("[data-builder_id]").map((el) => {
		// 	console.log(el);
		// 	el.addEventListener('click', () => {

		// 	})
		// })
	}, [elements])

	return (
		<div className={styles.Editor}>
			<div style={{height : "95%", width : "95%"}} className={styles.frame}>
				<iframe id="result" src={`${process.env.PUBLIC_URL}/frame`}/>
			</div>
			{
				true &&
				<NewElementSelect/>
			}
			<BottomBar/>
		</div>
	)
}

export default Editor