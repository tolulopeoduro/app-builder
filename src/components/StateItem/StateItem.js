import classes from "./StateItem.module.scss";

export default () => {
	return (
		<div className={classes.container}>
			<div className={classes.data}>
				<span className={classes.input} contentEditable>
					Name
				</span>
				<span className={classes.input} contentEditable>
					value
				</span>
			</div>
			<div className={classes.options}>
					<svg className={classes.delete_state} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path fill="currentColor" 
						d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 
						2H6v12h12V8zm-4.586 6l1.768 1.768l-1.414 1.414L12 15.414l-1.768 1.768l-1.414-1.414L10.586 
						14l-1.768-1.768l1.414-1.414L12 12.586l1.768-1.768l1.414 1.414L13.414 14zM9 4v2h6V4H9z"/>
					</svg>
			</div>
		</div>
	)
}