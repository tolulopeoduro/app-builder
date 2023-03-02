import styles from "./SidebarLeft.module.scss"
import {io} from "socket.io-client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {debounce} from "lodash"
import { setActiveElement } from "../../Redux/ActiveElement"
import { setActiveComponent } from "../../Redux/Project/Project"

const socket = io.connect("http://localhost:3007")

export default () => {
	const dispatch = useDispatch();

	const {project, project : {components, activeComponent}, activeElement} = useSelector(s => s)

	useEffect(() => {
		socket.emit("send_project", project)
	}, [project])

	useEffect(() => {
		socket.on("send_selection", (data) => {
			dispatch(setActiveElement(data))
		})
	}, [socket])

	useEffect(() => {
		let d = components[activeElement]
		const active_com = components[d?.component_name]
		dispatch(setActiveComponent(active_com));
		setName(active_com?.name)
	}, [activeElement])

	const [name, setName] = useState("")

	return (
		<div className={styles.container}>
			<div className={styles.component_button}>
				<div>
					<span>{activeComponent?.name}</span>
					{/* <div>
						<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6h-2Z"/></svg>
						</span>
					</div> */}
				</div>
			</div>
			<input className={styles.default_input} disabled={activeComponent?.component_name === "App"} value={name} type="text" placeholder="ComponentName"/>
			<div className={styles.elements}>
				
			</div>
			<div className={styles.cssSection}>
			</div>	
		</div>
	)
}