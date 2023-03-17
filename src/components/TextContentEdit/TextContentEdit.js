import { debounce } from "lodash";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setElements } from "../../Redux/Project/Project";
import styles from "./TextContentEdit.module.scss"

export default () => {

	const {activeElement, project : {elements}} = useSelector(s => s);
	const [init_val, set_init_val] = useState("")
	const [val, set_val] = useState("")
	const dispatch = useDispatch();
	

	useEffect(() => {
		set_init_val(activeElement?.innerHTML);
		set_val(activeElement?.innerHTML)
		document.getElementsByClassName(styles.input)[0].innerHTML = activeElement?.innerHTML;
	}, [activeElement])

	const update_content = () => {

		const reg1 = /<div><br><\/div>/g
		const reg2 = /<div>/g
		const reg3 = /s<\/div>/g
		
		let new_elements = {...elements};
		let updated_element = {...activeElement};
		updated_element.innerHTML= val.replace(reg1, "<br/>").replace(reg2, "<br/>").replace("</div>", "").replace(/<br>/g, "</br>").split("</div>").join("")
		updated_element.text_content= document.getElementById("text_content_edit").textContent;
		new_elements[activeElement?.name] = updated_element;
		dispatch(setElements(new_elements))
	}
	
	const handleKeyUp = (e) => {
		set_val(e.target.innerHTML)	
	}

	return (
		<div className={styles.container}>	
				<div contentEditable onKeyUp={(e) => handleKeyUp(e)} id ="text_content_edit" className={styles.input}></div>
				<div>
					<button className={styles.update_button} onClick={() => update_content()}>UPDATE</button>
				</div>
		</div>	
	)
}