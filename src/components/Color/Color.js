import React, { Fragment, useEffect, useState } from 'react'
import styles from "./Color.module.scss"
import rgb2hex from 'rgb2hex';
import hexRgb from 'hex-rgb';
import { HexAlphaColorPicker } from 'react-colorful';
import Color_picker from './Color_picker/Color_picker';
import ClickAwayListener from 'react-click-away-listener';

const Color = (props) => {

	const [color, set_color] = useState();
	const [show_color_picker, toggle_color_picker] = useState(false);
	const {initial_value, get_value} = props;

	const handle_color_change = (key, v) => {
		let c = {...color, ...{[key] : v}}
		let {hex, alpha} = c;
		set_color(c);
			if (hex.match(/^#[A-F0-9]/i) && (hex.length === 7 || hex.length === 4) ) {
				get_value(c)
			}
	}

	useEffect(() => {
		set_color(initial_value);
	}, [initial_value])

	return (
		<div>
			<div id={props.type} className={styles.background}>
				<div  className={styles.color_display} style={{backgroundColor: "white"}}
				onClick={() => toggle_color_picker(true)}>
					<div style={{height:"100%", width:"50%", backgroundColor:`${initial_value?.hex}`}}>
					</div>
					<div style={{height:"100%", width:"50%", backgroundColor:initial_value?.hex, opacity: initial_value?.alpha}}>
					</div>
				</div>
				<span className={styles.color_input} >
					<input type='text' onChange={(e) => handle_color_change("hex", e?.target.value)} 
					value = {color?.hex}/>
					<input type="text" value={color?.alpha} onChange={(e) => handle_color_change("alpha", e?.target.value)}/>
				</span>
				<span className={styles.color_alpha}>
				</span>
				{
					show_color_picker &&
						<Color_picker handle_change={(val) => get_value(val)} initial_value={color}  attribute={props.type}
						close_modal={() => toggle_color_picker(false)}/>
				}
			</div>
		</div>
	)
}

export default Color