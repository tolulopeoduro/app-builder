import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getContainer } from '../../../Redux/elementContainer';
import { setProject } from '../../../Redux/Project/Project';
import styles from "./CssSection.module.scss"
import setEnd from './setEnd';

export default () => {

	const {project, activeElement} = useSelector(s => s);
	const dispatch = useDispatch()
	const [initialContent, setInitialContent] = useState("hello : hi;")
	const [content, set_content] = useState([{css_attr : "color", css_value : "red"}])
	const [newEntry, setNewEntry] = useState(null)
	const [editor, setEditor] = useState({prev : 0, current : 0})

	useEffect(() => {
		const s =  project[activeElement]?.attributes?.css
		let ar = s.split(";").map((item) => {
			const [css_attr, css_value] = item.split(":")
			return (css_attr || css_value) && {css_attr , css_value}
		})
		ar = ar.filter((e) => {
			return e !== undefined
		})
		set_content(ar)
	}, [project, activeElement])

	const update = () => {
		const c = document.getElementById("cssLines").textContent
		let temp = {...project}
		temp[activeElement] = {...temp[activeElement], attributes : {...temp[activeElement].attributes, css : c}}
		dispatch(setProject(temp))
		handleEnd();
	}

	const handleEnd = useMemo(
		() => debounce(() =>  {
			if (!activeElement || activeElement === "body") return;
			const c = document.getElementsByClassName(activeElement)[0]?.getBoundingClientRect()
			let temp = (JSON.parse(JSON.stringify(c)))
			dispatch(getContainer(temp));
		}, 150), []
	)

	const keyDown = (e) => {
		let id = parseInt(e.target.parentElement.id)
		if (e.code === "Enter") {
			e.preventDefault();

			if (e.target.className === styles.css_attr) {
				document.getElementsByClassName(styles.css_value)[id].focus();
				setEnd(document.getElementsByClassName(styles.css_value)[id]);
				return;
			}
			document.getElementsByClassName(e.target.className)[0].blur();
			if (id < content.length - 1) {
				document.getElementsByClassName(styles.css_attr)[id+1].focus();
			} else {
				let temp = [...content]
				temp.splice(id+1, 0, {css_attr : "", css_value : ""})
				set_content(temp)
			}
			setEditor({prev : editor.current, current: id+1})
		}
		
		if (e.code === "Backspace") {
			if (e.target.className === styles.css_attr) {
				if (e.target.textContent.length === 0 ) {
					let temp = [...content];
					temp.splice(id, 1)
					set_content(temp);
					setEditor({prev : editor.current, current: id-1})
				}
			} 
			
			if (e.target.className === styles.css_value) {
				if (window.getSelection().getRangeAt(0).startOffset === 0) {
					e.preventDefault();
					document.getElementsByClassName(styles.css_attr)[id].focus();
					setEnd(document.getElementsByClassName(styles.css_attr)[id]);
				}
			}
		}


		setTimeout(() => {
		}, 0)
	}

	useEffect(() => {
		const {prev , current} = editor;
		document.getElementsByClassName(styles.css_attr)[current].focus();
	}, [editor])


	const addEntry = () => {
		set_content([...content, {css_attr : "", css_value : ""}])
		setTimeout(() => document.getElementsByClassName(styles.css_attr)[content.length].focus(), 0)
	}

	return (
		<div className={styles.container}>
			<div className={styles.inputContainer}>
				<div className={styles.cssLines} id="cssLines">
					{
						content.map((item, key) => {
							return true &&
								<div className={styles.cssLine} id ={key} key={key}>
									<span className={styles.css_attr} onKeyDown={(e) => keyDown(e)} contentEditable>{item.css_attr}</span>
									<span className={styles.css_colon}>:</span>
									<span onKeyDown={(e) => keyDown(e)} contentEditable className={styles.css_value}>{item.css_value}</span>
									<span className={styles.css_semicolon}>;</span>
								</div>
						})
					}
				</div>
				<div className={styles.update}>
					<div onClick={() => addEntry()}>+</div>
					<button onClick={() => update()}>Update</button>		
				</div>
			</div>
		</div>
)
}	