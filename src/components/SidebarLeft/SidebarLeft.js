import styles from "./SidebarLeft.module.scss"

export default () => {
	return (
		<div className={styles.container}>
			<div className={styles.component_button}>
				<div>
					<span>NEW COMPONENT</span>
					<div>
						<span>+</span>
					</div>
				</div>
			</div>
			<input className={styles.default_input} type="text" placeholder="ComponentName"/>
			<div className={styles.cssSection}>
			</div>	
		</div>
	)
}