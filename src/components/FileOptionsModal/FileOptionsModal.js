import { Icon } from "@iconify/react"
import styles from "./FileOptionsModal.module.scss"
import {export_app} from '../../utils'
import ClickAwayListener from "react-click-away-listener"
import { update_modals } from "../../Redux/Reducers/modals"
import { useDispatch } from "react-redux"

export default () => {

	const dispatch = useDispatch();

	const close_modal = () => dispatch(update_modals({file_options : false}))

	return (
		<div className={styles.backdrop}>
			<ClickAwayListener onClickAway={() => close_modal()}>
				<div className={styles.fileOptionsModal}>
					<div className={styles.project_name}>
						<span>
							My Project
							<Icon icon="uil:edit" />
						</span>
						<Icon icon="mdi:cancel-bold" onClick={() => close_modal()}   />
					</div>
					<div className={styles.options}>
						<button onClick={() => export_app()} className={styles.button}>
							<Icon icon="clarity:export-line" />
							<span>Export</span>
						</button>
						<button className={styles.button}>
							Export
						</button>
						<button className={styles.button}>
							Export
						</button>
					</div>
				</div>
			</ClickAwayListener>
		</div>
	)
}