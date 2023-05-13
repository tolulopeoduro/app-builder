import PropItem from "../PropItem/PropItem"
import classes from "./PropsLIst.module.scss"

export default () => {
	return (
		<div className={classes.container}>
			<span>PROPS</span>
			<div className={classes.box}>
				<PropItem/>
				<div className={classes.new}>+</div>
			</div>
		</div>
	)
}