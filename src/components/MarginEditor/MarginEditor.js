import React, { useEffect, useState } from 'react'
import styles from "./MarginEditor.module.scss"

const MarginEditor = (props) => {
	const {data, edit_style, active_element, attribute} = props;
	useEffect(() => {
		if (!data) return;
		if (data.set_for_all_sides) {
			edit_style(active_element, {[attribute] :{ ...data, value : `${data.value.split(" ")[0]}`}})
		} else {
			edit_style(active_element, {[attribute] :{ ...data, value : `${data.value} ${data.value} ${data.value} ${data.value}`}})
		}
	}, [data?.set_for_all_sides])

	const handle_side = (index, value) => {
		if (!data) return;
		const str = data?.value.split(" ");
		str[index] = value;
		edit_style(active_element, {[attribute] :{ ...data, value : str.join(" ")}})
	}

	return (
		<div className={styles.margin}>
			<div className={styles.toggle}>
				Same value for all sides
				<input type='checkbox' checked={data?.set_for_all_sides} 
				onChange={() => edit_style(active_element, {[attribute] : {...data, set_for_all_sides : data?.set_for_all_sides ? false : true}})}/>
			</div>
			{
				data?.set_for_all_sides ?
				<input placeholder={attribute} type="text" className={styles.main_input} value = {data?.value} 
				onChange={(e) => edit_style(active_element, {[attribute] :{ ...data, value : e.target.value}})}/> :
				<div className={styles.edit_sides}> 
					{
						["top", "right", "bottom", "left"].map((side, index) => {
							return (
								<span>
									{attribute}-{side}
									<input placeholder={attribute} type="text" className={styles.main_input} 
									value = {data?.value?.split(" ")[index]} 
									onChange={(e) => handle_side(index, e.target.value)}/>
								</span>
							)
						})
					}
				</div>
			}
		</div>
	)
}

export default MarginEditor