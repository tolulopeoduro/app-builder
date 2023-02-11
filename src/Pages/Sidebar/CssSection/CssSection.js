import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProject } from '../../../Redux/Project/Project';
import styles from "./CssSection.module.scss"

export default () => {

	const {project, activeElement} = useSelector(s => s);
	const dispatch = useDispatch()
	const [initialContent, setInitialContent] = useState("")
	const [content, set_content] = useState("")

	const handleChange = () => {
		set_content(document.getElementById("edit").textContent);
	}

	useEffect(() => {
		setInitialContent(project[activeElement]?.attributes?.css)
	}, [project, activeElement])

	const update = () => {
		const c = document.getElementById("edit").textContent
		let temp = {...project}
		temp[activeElement] = {...temp[activeElement], attributes : {...temp[activeElement].attributes, css : c}}
		dispatch(setProject(temp))
	}

	return (
		<div className={styles.container}>
			<div className={styles.inputContainer}>
				<p contentEditable onKeyDown={(e) => handleChange(e)} id="edit">{initialContent}</p>
				<div>
					<button onClick={() => update()}>Update</button>		
				</div>
			</div>
		</div>
)
}