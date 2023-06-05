import React, { useEffect, useState } from 'react'
import styles from "./Active_Element_Box.module.scss"
import { useSelector } from 'react-redux';

const Active_Element_Box = () => {
	const {active_element_dimension} = useSelector(s => s);
	const [frame_dimension, set_frame_dimension] = useState(null)
	const {top, left, height, width} = active_element_dimension;

	const measure_box  = () => {
		const frame = document.querySelector("#result")
		?.getBoundingClientRect();
		
		const box = {
			...active_element_dimension,
			top: active_element_dimension?.top + frame?.top,
			left: active_element_dimension?.left + frame?.left,
			right: active_element_dimension?.right + frame?.right,
			bottom: active_element_dimension?.bottom + frame?.bottom,
		};

		return box;
	};


	return (
		<div className={styles.container} style={{top: measure_box()?.top, left: measure_box()?.left, height: height, width: width}}>
			<div style={{top: -5, left: -5}}></div>
			<div style={{left: width-8, top: -5}}></div>
			<div style={{top: height-7, left: -5}}></div>
			<div style={{left: width-8, top:	height-7}}></div>
		</div>
	)
}

export default Active_Element_Box