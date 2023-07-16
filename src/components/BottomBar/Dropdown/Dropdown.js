import React, { Fragment, useEffect, useState } from 'react'
import styles from "./Dropdown.module.scss"
import ClickAwayListener from 'react-click-away-listener';
import {motion, AnimatePresence} from "framer-motion"
import { act } from 'react-dom/test-utils';
import { useDispatch } from 'react-redux';
import { update_modals } from '../../../Redux/Reducers/modals';

const Dropdown = (props) => {
	
	const {width, height, options, handle_change, value, style, id} = props;

	const [active, set_active] = useState(false);
	const [position , set_position] = useState({})
	const dispatch = useDispatch();

	const activate = () => {
		dispatch(update_modals({
			dropdown : {
				height : height,
				options : options,
				value : value,
				style: style,
				id : id,
				box : document.getElementById(id)?.getBoundingClientRect()
			}
		}))
	}

	useEffect(() => {
		window.addEventListener("message", (e) => {
			if (e.origin !== window.location.origin) return;
			if (!e.data) return;
			if (e.data.att !== id) return;
			handle_change(e.data.option);
			setTimeout(() => dispatch(update_modals({dropdown : null})), 0)
		})
		return () => {			
			window.removeEventListener("message", (e) => {
				if (e.origin !== window.location.origin) return;
				if (!e.data) return;
				if (e.data.att !== id) return;
				handle_change(e.data.option);
				setTimeout(() => dispatch(update_modals({dropdown : null})), 0)
			})
		}
	}, [])

	return (
		<Fragment>
			<div top id = {id} style={{height: height}} className = {styles.box}>
				<div style={{height : height, ...style}} className = {styles.dropdown} onClick={() => activate()}>
					<div style={{fontFamily : id  === "font-family" && value}} className = {styles.value}>
						{value}
					</div>
					<div className = {styles.button}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="m7 10l5 5l5-5z"/></svg>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Dropdown