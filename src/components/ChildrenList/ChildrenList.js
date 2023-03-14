import { useDispatch, useSelector } from "react-redux";
import { set_element_menu } from "../../Redux/Project/Project";
import ChildrenItem from "../ChildrenItem/ChildrenItem";
import styles from "./ChildrenList.module.scss"

export default () => {
	const {project : {elements, activeComponent, element_menu}} = useSelector(s => s);
	const dispatch = useDispatch();
	return (
		<div className={styles.container}>
			<div>
				<ChildrenItem element ={activeComponent?.name}/>
				<button id="element_menu_button" className={element_menu ? styles.active : styles.inactive} onClick={()=> dispatch(element_menu ? set_element_menu(false) : set_element_menu(true))}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"/></svg>
				</button>
			</div>
		</div>
	)
}