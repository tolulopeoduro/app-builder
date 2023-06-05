import React from 'react'
import styles from "./BottomBar.module.scss"
import TextEditor from './TextEditor/TextEditor'
import { useDispatch, useSelector } from 'react-redux'
import ContainerEditor from '../ContainerEditor/ContainerEditor'
import { update_modals } from '../../Redux/Reducers/modals'

const BottomBar = () => {

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
		<div className = {styles.bottom_bar_container}>
			<div className={styles.left}>
				<div className = {styles.body}>
					{
						active_element.tag !== "div" ? 
						<TextEditor/> :
						<ContainerEditor/>
					}
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
						<div className={styles.option_button}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path fill="white" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17
							 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"/>
						</svg>
						</div>
					</div>
					<div className = {styles.option_button}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14">
							<path fill="none" stroke="white" stroke-linecap="round" 
							stroke-linejoin="round" 
							d="m13.5 13.5l-5-5m4 0h-4v4M.5.5l5 5m-4 0h4v-4"/>
						</svg>
					</div>
				</div>
			</div>
	)
}

export default BottomBar