import { faEllipsisH, faParagraph, faPlus, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import newElement from '../../element/newElement'
import { setElement } from '../../Redux/ActiveElement'
import { setProject } from '../../Redux/Project/Project'
import CssSection from './CssSection/CssSection'
import Events from './Events/Events'
import styles from "./Sidebar.module.scss"
import TextContentEdit from './TextContentEdit/TextContentEdit'

const Sidebar = () => {

	const {data, isEmpty} = useSelector(s => s.project)
	const [list, setList] = useState(false)
	const {project, activeElement} = useSelector(s => s)
	const dispatch = useDispatch();

	const showEls = () => {
		setList(list ? false : true)
	}

	useEffect(() => {
		if (activeElement && activeElement != "body") {
			setList(true);
		}
	}, [activeElement])

	
	
	const create_el = (el) => {
		const id = require("randomstring").generate();
		let temp = {...project}
		const newParent = temp[activeElement]?.type === "div" ? activeElement : temp[activeElement]?.parent;
		temp[id] = newElement(el, newParent, temp[newParent].children.length, {className : id, css : "color : red"}, null, id)

		const newChildren = [...temp[newParent].children, id]

		temp[newParent] = {...temp[newParent], children : newChildren}
		dispatch(setProject(temp))
	}

	const [selectedMenu, setSelectedMenu] = useState("text-content")

  return (
	<div className={styles.container}>
		<div className={styles.button} onClick={() => showEls()}>
			<div className={list ? styles.active : styles.inactive}>
				<FontAwesomeIcon icon = {faPlus} />
			</div>
		</div>
		<div className={classNames(styles.elementList, list ? styles.active : styles.inactive)}>
			<div>
				{
					"p span h1 h2 div".split(" ").map (el => <div key={el} onClick={() => create_el(el)}>{`<${el}>`}</div>)
				}
			</div>
		</div>
		<div className={classNames(styles.elementOptions, (list && (activeElement && activeElement != "body")) ? styles.active : styles.inactive)}>
			<div className={styles.navigation}>
				<button className={selectedMenu === "text-content" && styles.active} onClick={() => setSelectedMenu("text-content")}>TEXTCONTENT</button>
				<button className={selectedMenu === "css" && styles.active} onClick={() => setSelectedMenu("css")} >CSS</button>
				<button className={selectedMenu === "events" && styles.active} onClick={() => setSelectedMenu("events")}>EVENTS</button>
			</div>
			{selectedMenu==="text-content" && <TextContentEdit/>}
			{selectedMenu==="css" && <CssSection/>}
			{selectedMenu==="events" && <Events/>}
		</div>
	</div>
  )
}

export default Sidebar