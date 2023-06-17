import React, { useEffect, useState } from 'react'
import styles from "./Color_picker.module.scss"
import { HexAlphaColorPicker, HexColorPicker, RgbaColorPicker } from 'react-colorful'
import ClickAwayListener from 'react-click-away-listener';
import hex2rgb from 'hex2rgb';
import hex2rgba from 'hex2rgba';
import { hex_to_rgb_object, hex_to_rgbobject } from '../../../utils';
import rgb2hex from 'rgb2hex';
import { debounce } from 'lodash';

const Color_picker = (props) => {

	const {parent_type, initial_value} = props;

	const [color, set_color] = useState(null);

	useEffect(() => {
		set_color(initial_value);
	}, [initial_value])

	const handle_change = debounce((value) => {
		const {r,g,b,a} = value;
		props.handle_change({value : rgb2hex(`rgb(${r}, ${g}, ${b})`).hex , alpha : a})
	}, 100)

	return (
		<ClickAwayListener onClickAway={props.close_modal}>
			<div className={styles.container} 
			style={{
				position: "absolute",
				left: `${-220}px`,
			}}>
				<RgbaColorPicker color={hex_to_rgb_object(color)} onChange={(e) => handle_change(e)}/>
			</div>
		</ClickAwayListener>
	)
}

export default Color_picker