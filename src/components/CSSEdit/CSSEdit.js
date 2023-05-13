import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { dracula } from "@uiw/codemirror-themes-all";
import ReactCodeMirror from "@uiw/react-codemirror";
import { basicSetup } from "codemirror";
import { debounce } from "lodash";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setElements } from "../../Redux/Project/Project";
import styles from "./CSSEdit.module.scss"

const code = 'const a = 0;';

export default () => {

	const {activeElement, project : {elements, activeComponent}} = useSelector(s => s);
	const [init_val, set_init_val] = useState("")
	const [val, set_val] = useState("")
	const dispatch = useDispatch();

	

	useEffect(() => {
		set_init_val(activeComponent?.style);
		set_val(activeComponent?.style)
		// document.getElementsByClassName(styles.container)[0].textContent = activeComponent?.style;
	}, [activeComponent])

	const update_content = () => {
		let new_elements = {...elements};
		let updated_element = {...activeComponent};
		updated_element.style= val
		new_elements[activeComponent?.name] = updated_element;
		console.log(elements)
		console.log(new_elements)
		dispatch(setElements(new_elements))	
	}
	
	const handleKeyUp = (e) => {
		set_val(e.target.textContent)
	}

	

	return (
		<Fragment>
			<div className={styles.container}>
				<ReactCodeMirror
				lang={css}
				height="100%"
				width={"100%"}
				theme={dracula}
				extensions = {[basicSetup, css()]}
				value ={val}
				onChange={(e) => set_val(e)}
				/>
			</div>
			<div className={styles.button}>		
				<button onClick={() => update_content()}>UPDATE</button>
			</div>
		</Fragment>	
	)
}