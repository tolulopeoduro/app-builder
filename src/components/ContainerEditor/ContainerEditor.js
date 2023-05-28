import { useSelector } from 'react-redux';
import styles from "./ContainerEditor.module.scss"
import Dropdown from '../BottomBar/Dropdown/Dropdown';

const ContainerEditor = () => {

	const {elements, active_element} = useSelector(s => s);

	return (
		<div className={styles.container}>
			<h1>
				Div
			</h1>
			<div className={styles.dimensions}>
				<div tabIndex={0} className={styles.height}>
					<p>H</p>
					<input type = "number" value={100}/>
				</div>
				<div tabIndex={0} className={styles.height}>
					<p>W</p>
					<input type = "number" value={100}/>
				</div>
			</div>
			<h2 className={styles.sub_header}>
				BACKGROUND
			</h2>
			<div className={styles.background}>
				<div className={styles.color_display} style={{backgroundColor: "#000000"}}>
				</div>
				<span className={styles.color_input} >
					#
					<input type='text' value="000000"/>
					<input type="number" value={100}/>
				</span>
				<span className={styles.color_alpha}>

				</span>
			</div>
			<h2 className={styles.sub_header}>
				BORDER
			</h2>
			<div className={styles.border}>
				<div className={styles.color_display} style={{backgroundColor: "#000000"}}>
				</div>
				<span className={styles.color_input} >
					#
					<input type='text' value="000000"/>
					<input type="number" value={1}/>
				</span>
				<Dropdown options ={["dotted"]}/>
			</div>
		</div>
	)
}

export default ContainerEditor