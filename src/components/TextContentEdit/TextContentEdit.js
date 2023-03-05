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
	}, [activeElement])

	const update_content = () => {
		let new_elements = {...elements};
		let updated_element = {...activeElement};
		updated_element.innerHTML=val;
		new_elements[activeElement?.name] = updated_element;
		dispatch(setElements(new_elements))
	}
	
	const handleKeyUp = (e) => {
		set_val(e.target.innerHTML)
	}

	return (
		<Fragment>
			<div contentEditable onKeyUp={(e) => handleKeyUp(e)} className={styles.container}>
				{init_val}
			</div>
			<div className={styles.button}>
				<button onClick={() => update_content()}>UPDATE</button>
			</div>
		</Fragment>
			
	)
}