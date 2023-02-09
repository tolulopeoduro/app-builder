import { faEllipsisH, faParagraph, faPlus, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import newElement from '../../element/newElement'
import { setElement } from '../../Redux/ActiveElement'
import { setProject } from '../../Redux/Project/Project'
import styles from "./Sidebar.module.scss"

const Sidebar = () => {

	const {data, isEmpty} = useSelector(s => s.project)
	const [list, setList] = useState(false)
	const dispatch = useDispatch();

	const showEls = () => {
		setList(list ? false : true)
	}

	useEffect(() => {
		dispatch(setElement("body"))
	}, [])

	
	const {project, activeElement} = useSelector(s => s)
	
	const create_el = (el) => {
		const id = require("randomstring").generate();
		let temp = {...project}
		const newParent = temp[activeElement]?.type === "div" ? activeElement : temp[activeElement]?.parent;
		temp[id] = newElement(el, newParent, temp[newParent].children.length, {className : id}, null, id)

		const newChildren = [...temp[newParent].children, id]

		temp[newParent] = {...temp[newParent], children : newChildren}
		dispatch(setProject(temp))
	}

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
	</div>
  )
}

export default Sidebar