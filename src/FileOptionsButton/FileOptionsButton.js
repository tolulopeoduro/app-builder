import { Icon } from "@iconify/react"
import styles from "./FileOptions.module.scss"
import { useDispatch } from "react-redux"
import { update_modals } from "../Redux/Reducers/modals";

export default () => {

	const dispatch = useDispatch();
	
	return (
		<div className = {styles.fileOptions}>
			<div onClick={() => dispatch(update_modals({file_options : true}))} className={styles.button}>
				<Icon icon="mdi:file-settings-cog-outline" />
			</div>
		</div>
	)
} 