import React, { Fragment, useState } from 'react';
import styles from "./FlexLayoutEditor.module.scss";
import { AnimatePresence, motion } from 'framer-motion';
import Dropdown from '../BottomBar/Dropdown/Dropdown';

const FlexLayoutEditor = (props) => {

	const {heading, flex_layout_editor, style_input} = styles;

	const [show_editor, toggle_editor] = useState(false)
	const {edit_style, element_style} = props;

	return (
		<Fragment>
			<div className={heading} onClick={() => toggle_editor(show_editor? false : true)}>
				<span className='sub_header'>Edit flex layout</span>
				<svg className={show_editor && "flip"} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24"><path fill="white" d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"/></svg>
			</div>
			<div className={flex_layout_editor}>
				<AnimatePresence>
					{
						show_editor && 
						<motion.div initial={{height: 0, opacity: 0}} animate={{height: "auto", opacity: 1}} exit={{height: 0, opacity: 0}} className={styles.flex_toolbox}>
							{
								["flex-direction", "flex-wrap", "justify-content", "align-items", "align-content"]
								.map(att => {
									return(
										<motion.div className={style_input}>
											<span>{att}</span>
											<Dropdown height="1.1rem" handle_change={(option) => edit_style({[att] :{...element_style?.[att], value: option}})} value={element_style?.[att]?.value}
											options = {element_style?.[att]?.available_options} />
										</motion.div>
									)
								})
							}
						</motion.div>
					}
				</AnimatePresence>
			</div>
		</Fragment>
	)
}

export default FlexLayoutEditor