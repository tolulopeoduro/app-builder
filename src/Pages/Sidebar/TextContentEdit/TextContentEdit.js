import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProject } from '../../../Redux/Project/Project'
import styles from './TextContentEdit.module.scss'

export default () => {

	const [content, setContent] = useState("hello")
	const [initialContent, setInitialContent] = useState("hello")
	const dispatch = useDispatch();

	const {project, activeElement} = useSelector(s => s);

	const handleChange = (e) => {
		setTimeout(() => {
			const p = e.target.innerHTML;
			const reg1 = /<div><br><\/div>/g
			const reg2 = /<div>/g
			const reg3 = /s<\/div>/g
			const p2 = p.replace(reg1, "<br>").replace(reg2, "<br>").replace("</div>", "").split("</div>").join("")
			let temp = {...project};
			console.log(p2)
			temp[activeElement] = {...temp[activeElement], children : p2}
			dispatch(setProject(temp))
		}, 0)
	}
	useEffect(() => {
		document.getElementById("edit").innerHTML=project[activeElement].children
	}, [activeElement])

	return (
		<div className={styles.container}>
			<div className={styles.headerContainer}>
				<span>TEXT CONTENT:</span>
			</div>
			<div className={styles.inputContainer}>
				<p contentEditable onKeyDown={(e) => handleChange(e)} id="edit">{initialContent}</p>
				<div>
					<button onClick={() => console.log("hello")}>Update</button>		
				</div>
			</div>
		</div>
	)
}