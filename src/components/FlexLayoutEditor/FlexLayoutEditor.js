import React, { Fragment, useEffect, useState } from 'react';
import styles from "./FlexLayoutEditor.module.scss";
import { AnimatePresence, motion } from 'framer-motion';
import Dropdown from '../BottomBar/Dropdown/Dropdown';
import win from 'global';

const FlexLayoutEditor = (props) => {

	const {edit_style, element_style, element_data} = props;

	return (
		<AnimatePresence>
			{
				true && 
				<Fragment>
					{
						["flex-direction", "flex-wrap", "justify-content", "align-items", "align-content"]
						.map((att, index) => {
							return(
								<motion.span key={index} style={{order : props.order}} className={styles.style_input}>
									<span>{att} :</span>
									<Dropdown id={`flex_${att}`} height="1.5rem" handle_change={(option) => edit_style(element_data?.name, {[att] :{...element_style?.[att], value: option}})} value={element_style?.[att]?.value}
									options = {element_style?.[att]?.available_options} />
								</motion.span>
							)
						})
					}
				</Fragment>
			}
		</AnimatePresence>
	)
}

export default FlexLayoutEditor