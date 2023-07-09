import React from 'react'
import styles from "./BottomBar.module.scss"
import TextEditor from './TextEditor/TextEditor'
import { useDispatch, useSelector } from 'react-redux'
import ContainerEditor from '../ContainerEditor/ContainerEditor'
import { update_modals } from '../../Redux/Reducers/modals'
import { set_active_element } from '../../Redux/Reducers/active_element'
import {AnimatePresence, motion} from "framer-motion";
import { delete_element } from '../../utils'

const BottomBar = (props) => {

	const {active_element, modals : {new_element}} = useSelector(s => s);
	const dispatch = useDispatch();

	const toggle_element_list=() => {
		dispatch(
			update_modals(
				{new_element : new_element ? false : true}
			)
		)
	}

	return (
		<motion.div initial={{top : window.innerHeight + 10}} animate={{opacity:1, top: "50%"}} exit={{ top : window.innerHeight + 10}} className = {styles.bottom_bar_container}>
			<div className={styles.left}>
				<div className = {styles.body}>
					<ContainerEditor/>
				</div>
				<div className = {styles.footer}>
				</div>
			</div>
			<div className={styles.right}>
					<div className={styles.actions}>
						<div onClick={toggle_element_list} className={styles.option_button}>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path fill="white" d="M18 12.998h-5v5a1 1 0 0
								 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"/>
							</svg>
						</div>
						<div onClick={() => delete_element(active_element?.name)} className={styles.option_button}>
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