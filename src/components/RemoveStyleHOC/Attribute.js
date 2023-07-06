import React, { Fragment, useState } from 'react'
import styles from "./Attribute.module.scss"
import {motion, AnimatePresence} from "framer-motion"

const Attribute = (props) => {
	const {child, handle_delete, exists, type} = props;
	const [minimize, toggle_minimize] = useState(false);

	return (
		<Fragment>
			{
				exists &&
				<Fragment>
					<h2 className={styles.sub_header}>
						{type}
						<span>
							<svg onClick={() => toggle_minimize(minimize ? false : true)} className={minimize ? styles.minimized : styles.open} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><g transform="rotate(180 16 16)">
								<path  fill="white" d="m16 6.594l-.719.687l-12.5 12.5L4.22 21.22L16 9.437L27.781 21.22l1.438-1.438l-12.5-12.5z"/></g>
							</svg>
							<svg className={styles.delete} onClick={() => handle_delete(type)}  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path fill="#000" stroke="white" strokeLinecap="round" strokeLinejoin="round" 
								strokeWidth="1.5" d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"/>
							</svg>
						</span>
					</h2>
					<AnimatePresence>
						{
							!minimize &&
							<motion.div initial={{height: 0, opacity: 0}} animate={{height: "auto", opacity: 1}} exit={{height : 0, opacity: 0}} className={styles.container}>
								{child}
								
							</motion.div>
						}
					</AnimatePresence>
				</Fragment>
			}
		</Fragment>
	)
}

export default Attribute