import styles from "./BottomBar.module.scss";
import CSSEdit from "../CSSEdit/CSSEdit"
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainTab from "../MainTab/MainTab";
import {io} from "socket.io-client"		
import { setActiveComponent, set_dimension } from "../../Redux/Project/Project";
import { setActiveElement } from "../../Redux/ActiveElement";
import ElementsMenu from "../ElementsMenu/ElementsMenu";
import * as $ from "jquery"
import { click } from "@testing-library/user-event/dist/click";

const socket = io.connect("http://localhost:3007")

export default () => {

	const [active, set_active] = useState(true)
	const [tab, set_tab] = useState("MAIN")
	const {project, project : {activeComponent, elements, element_menu}, activeElement} = useSelector(s => s)
	const dispatch = useDispatch();

	const [name, set_name] = useState("")

	useEffect(() => {
		dispatch(setActiveComponent(elements["App"]));
	}, [])

	useEffect(() => {
		socket.emit("get_selection_dimension", activeElement?.name)
	}, [activeElement])


	useEffect(() => {
		socket.emit("send_project", project)
	}, [project.elements])

	useEffect(() => {
		socket.on("send_selection", (data) => {	
			dispatch(setActiveElement(elements[data || activeElement]))
		})

		socket.on("send_selection_dimension", (data) => {
			dispatch(set_dimension(data))
		})

	}, [socket, elements])


	useEffect(() => {
		const active_com = elements[activeElement?.component_name]
		dispatch(setActiveComponent(active_com));
		set_name(active_com?.name)
	}, [activeElement])

	useEffect(() => {
		if (!activeElement) return;
		let {name, parent, wrapper_element} = activeElement;
		console.log(name, parent, wrapper_element)
	}, [activeElement])

	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.bar}>
					<div className={styles.left}>
						<img src="/component.svg"/>
						<span>{activeComponent?.name}</span>
						<div className={styles.tabs}>
							<span onClick={() => set_tab("MAIN")} className={tab==="MAIN" && styles.active}>MAIN</span>
							<span onClick={() => set_tab("CSS")} className={tab==="CSS" && styles.active}>CSS</span>
						</div>
					</div>
					<div onClick={() => set_active(active ? false : true)} className={styles.toggle}>
						<svg className={active ? styles.active : styles.inactive} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7 14l5-5l5 5z"/></svg>
					</div>
				</div>
				<div className={styles.body}>
					{tab === "MAIN" && <MainTab/>}
					{tab === "CSS" && <CSSEdit/>}
				</div>
			</div>
			{element_menu && <ElementsMenu/>}
		</Fragment>
	)
}