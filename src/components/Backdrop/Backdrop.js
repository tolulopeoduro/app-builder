import classes from "./Backdrop.module.scss"

export default (props) => 
<div className={classes.container}>
	{props.child}
</div>