import styles from "./BottomBar.module.scss";
import CSSEdit from "../CSSEdit/CSSEdit"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainTab from "../MainTab/MainTab";
import {io} from "socket.io-client"		
import { setActiveComponent } from "../../Redux/Project/Project";
import { setActiveElement } from "../../Redux/ActiveElement";

const socket = io.connect("http://localhost:3007")

export default () => {

	const [active, set_active] = useState(true)
	const [tab, set_tab] = useState("MAIN")
	const {project, project : {activeComponent, elements,}, activeElement} = useSelector(s => s)
	const dispatch = useDispatch();

	const [name, set_name] = useState("")

	useEffect(() => {
		socket.emit("send_project", project)
	}, [project])

	useEffect(() => {
		socket.on("send_selection", (data) => {	
			dispatch(setActiveElement(elements[data || activeElement]))
		})
	}, [socket, elements])

	useEffect(() => {
		const active_com = elements[activeElement?.component_name]
		dispatch(setActiveComponent(active_com));
		set_name(active_com?.name)
	}, [activeElement, elements])

	return (
		<div className={styles.container}>
			<div className={styles.bar}>
				<div className={styles.left}>
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
	)
}