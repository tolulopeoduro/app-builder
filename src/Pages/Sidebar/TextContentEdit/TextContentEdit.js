import { debounce } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
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
			handleEnd(e)
		}, 0)
	}

	const handleEnd = useMemo(
		(e) => debounce((e) =>  {
			// if (!activeElement || activeElement === "body") return;
			// const c = document.getElementsByClassName(activeElement)[0]?.getBoundingClientRect()
			// let temp = (JSON.parse(JSON.stringify(c)))
			const p = e.target.innerHTML;
			const reg1 = /<div><br><\/div>/g
			const reg2 = /<div>/g
			const reg3 = /s<\/div>/g
			const p2 = p.replace(reg1, "<br>").replace(reg2, "<br>").replace("</div>", "").split("</div>").join("")
			let temp = {...project};
			temp[activeElement] = {...temp[activeElement], children : p2}
			dispatch(setProject(temp))
		}, 150), []
	)

	useEffect(() => {
		document.getElementById("edit").innerHTML=project[activeElement].children
	}, [activeElement])

	return (
		<div className={styles.container}>
			<div className={styles.inputContainer}>
				<p contentEditable onKeyDown={(e) => handleChange(e)} id="edit">{initialContent}</p>
			</div>
		</div>
	)
}