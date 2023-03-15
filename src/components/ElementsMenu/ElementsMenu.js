import ElementButton from "../ElementButton/ElementButton";
import { useEffect, useState } from "react"
import styles from "./ElementsMenu.module.scss"
import ClickAwayListener from "react-click-away-listener";
import { useDispatch, useSelector } from "react-redux";
import { set_element_menu } from "../../Redux/Project/Project";


export default () => {

	const {project : {elements, element_menu}} = useSelector(s => s);

	const dispatch = useDispatch();

	const [pos, set_pos] = useState([0, 0]);

	useEffect(() => {
		let a = document.getElementById("element_menu_button").getBoundingClientRect()
		let b = document.getElementById("element_menu").getBoundingClientRect()
		set_pos([a.bottom - b.height,a.left+30])
	}, [])


	return (
		<ClickAwayListener onClickAway={() => dispatch(set_element_menu(false))}>
			<div id="element_menu" className={styles.container} style={{top :element_menu ? pos[0] : 5000, left : pos[1]}}>
				<span>
					ADD ELEMENT
				</span>
				<div className={styles.list}>
				{["p", "div", "h1", "h2", "h3", "span", "button"].map((el, index) => <ElementButton name ={el}/>)}
				</div>
			</div>
		</ClickAwayListener>
	)
}