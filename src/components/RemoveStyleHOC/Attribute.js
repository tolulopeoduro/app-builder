import React, { Fragment } from 'react'
import styles from "./Attribute.module.scss"

const Attribute = (props) => {
	const {child, handle_delete, exists, type} = props;

	return (
		<Fragment>
			{
				exists &&
				<div className={styles.container}>
					{child}
					<svg onClick={() => handle_delete(type)}  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path fill="#000" stroke="white" strokeLinecap="round" strokeLinejoin="round" 
						strokeWidth="1.5" d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"/>
					</svg>
				</div>
			}
		</Fragment>
	)
}

export default Attribute