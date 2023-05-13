import classes from "./PropItem.module.scss"

export default () => {
  return (
	<div className={classes.PropItem}>
		<span>
			name 
		</span>
		<span className={classes.cancel}>x</span>
	</div>
  )
}