import { Fragment } from "react"
import { useSelector } from "react-redux"
import TextContentEdit from "../TextContentEdit/TextContentEdit"
import styles from "./MainTab.module.scss"

export default () => {

	const {project, project : {elements, activeComponent}, activeElement} = useSelector(s => s)

	return (
		<div className={styles.container}>
			<div className={styles.area}>
				{activeElement?.wrapper_element !== "div" && (
					<Fragment>
						<span>TEXT CONTENT</span>
						<TextContentEdit/>
					</Fragment>
				)}
			</div>
		</div>
	)
}