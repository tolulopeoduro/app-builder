import React, { Fragment, useEffect, useState } from 'react'
import styles from "./Color.module.scss"
import rgb2hex from 'rgb2hex';
import hexRgb from 'hex-rgb';

const Color = (props) => {

	const [color, set_color] = useState();
	const background = props[props?.type];
	const {edit_style} = props;

	const handle_color_change = (key, v) => {
		let c = {...color, ...{[key] : v}}
		let {value, alpha} = c;
		set_color(c);
			if (value.match(/^#[A-F0-9]/i) && (value.length === 7 || value.length === 4) ) {
				edit_style({'background-color' : c});
			}
	}

	useEffect(() => {
		set_color(background);
	}, [background])

	return (
		<Fragment>
			<h2 className={styles.sub_header}>
				BACKGROUND
			</h2>
			<div className={styles.background}>
				<div className={styles.color_display} style={{backgroundColor: "white"}}>
					<div style={{height:"100%", width:"50%", backgroundColor:`${background?.value}`}}>
					</div>
					<div style={{height:"100%", width:"50%", backgroundColor:background?.value, opacity: background?.alpha}}>
					</div>
				</div>
				<span className={styles.color_input} >
					<input type='text' onChange={(e) => handle_color_change("value", e?.target.value)} 
					value = {color?.value}/>
					<input type="text" value={color?.alpha} onChange={(e) => handle_color_change("alpha", e?.target.value)}/>
				</span>
				<span className={styles.color_alpha}>
				</span>
			</div>
		</Fragment>
	)
}

export default Color