import React, { Fragment, useEffect, useState } from 'react'
import styles from "./PathDisplay.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { set_active_element } from '../../Redux/Reducers/active_element';
import ClickAwayListener from 'react-click-away-listener';
import Frame from '../Frame/Frame';
import { trimEnd } from 'lodash';
import { trim_text_content } from '../../utils';
import { AnimatePresence, motion } from 'framer-motion';

const PathDisplay = (props) => {
	const {element, elements} = props;
	const dispatch = useDispatch();
	const [show_dropdown, toggle_dropdown] = useState(false);

	const select = () => dispatch(set_active_element(elements[element.name]));
	const rightclick = (e) => {
		e.preventDefault();
		toggle_dropdown(true)
	}
	const {parent} = element;
	const sibling = parent?.children

	useEffect(() => {
		console.log(sibling)
	}, [])

	const select_sibling = (el) => {
		dispatch(set_active_element(el));
		toggle_dropdown(false);
	}

	return (
		<Fragment>
			{
				elements[element?.parent] &&
				<Fragment>
					<PathDisplay elements = {elements} element={elements[element?.parent]}/>
					<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" 
					viewBox="0 0 24 24"><path fill="currentColor" d="M10 17V7l5 5l-5 5Z"/></svg>
				</Fragment>
			}
			{
				element.is_component ? 
				<span onClick={() => select()}>{element.component_name}</span> :
				<span onContextMenu={e => rightclick(e)} onClick={() => select()}>{element?.tag}</span>
			}
			<AnimatePresence>
				{
					show_dropdown &&
					<ClickAwayListener onClickAway={(() => toggle_dropdown(false))}>
						<div style={{marginTop : "1rem", marginLeft: "0.5rem"}}>
							<motion.div initial={{height: 0, opacity: 0, width : 0}} animate={{opacity: 1, height: "auto", width: "auto"}} exit={{height : 0, opacity : 0, width: "auto"}} className="basic_dropdown" style={{height : `${sibling?.length}rem`}}>
								<div>
									{
										elements[parent]
										?.children.map(child => {
											const el = elements[child];
											return (
												<div onClick={() => select_sibling(el)}>
													<span className='dropdown_main_text'>
														{el?.tag?.toUpperCase()}
													</span>
													<span className='dropdown_small_text'>{trim_text_content(el?.name)}</span>
												</div>
											)
										})
									}
								</div>
							</motion.div>
						</div>
					</ClickAwayListener>
				}
			</AnimatePresence>
		</Fragment>
	)
}

export default PathDisplay