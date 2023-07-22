import React from 'react'
import styles from "./BottomBar.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import ContainerEditor from '../ContainerEditor/ContainerEditor'
import { update_modals } from '../../Redux/Reducers/modals'
import {motion} from "framer-motion";
import { delete_element, redo, undo } from '../../utils'

const BottomBar = (props) => {

	const {active_element, modals } = useSelector(s => s);
	const dispatch = useDispatch();

	const toggle_element_list=() => {
		dispatch(
			update_modals(
				{new_element : modals?.new_element ? false : true}
			)
		)
	}

	return (
		<motion.div initial={{top : window.innerHeight + 10}} animate={{opacity:1, top: "47%"}} exit={{ top : window.innerHeight + 10}} className = {styles.bottom_bar_container}>
			<div className={styles.left}>
				<div className = {styles.body}>
					<ContainerEditor/>
				</div>
				<div className={styles.footer}>
					<div className={styles.actions}>
						<div title="undo" className={styles.option_button} onClick={() => undo()}>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="white" d="M12 5H7V2L1 6l6 4V7h5c2.2 0 4 1.8 4 4s-1.8 4-4 4H7v2h5c3.3 0 6-2.7 6-6s-2.7-6-6-6z" class="st0"/></svg>
						</div>
						<div title='redo' className={styles.option_button} onClick={() => redo()}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="white" d="M14.78 6.28a.749.749 0 0 0 0-1.06l-3.5-3.5a.749.749 0 1 0-1.06 1.06L12.439 5H5.251l-.001.007L5.251 5a.8.8 0 0 0-.171.019A4.501 4.501 0 0 0 5.5 14h1.704a.75.75 0 0 0 0-1.5H5.5a3 3 0 1 1 0-6h6.939L10.22 8.72a.749.749 0 1 0 1.06 1.06l3.5-3.5Z"/></svg>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.right}>
					<div className={styles.actions}>
						<div onClick={toggle_element_list} className={styles.option_button}>
							<svg style={modals?.new_element ? {transform: "rotate(45deg)"} : {}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path fill="white" d="M18 12.998h-5v5a1 1 0 0
								 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"/>
							</svg>
						</div>
						<div onClick={() => delete_element(active_element)} className={styles.option_button}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path fill="white" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17
							 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"/>
						</svg>
						</div>
					</div>
					<div onClick={() => props.hide_editor()} className = {styles.option_button}>
						<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="white" d="M831.872 340.864L512 652.672L192.128 340.864a30.592 30.592 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.592 30.592 0 0 0-42.752 0z"/></svg>
					</div>
				</div>
			</motion.div>
	)
}

export default BottomBar