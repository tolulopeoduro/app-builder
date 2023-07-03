import { Fragment, useEffect, useState } from "react";
import styles from "./ElementDescriptionBox.module.scss"
import PathDisplay from "../PathDisplay/PathDisplay"
import { useDispatch, useSelector } from "react-redux";
import { update } from "lodash";
import { update_modals } from "../../Redux/Reducers/modals";
import { AnimatePresence, motion } from "framer-motion";

const ElementDescriptionBox = (props) => {

	const {box, data, cursor} = props;
	const {css : {background}, css} = data?.attributes;
	const dispatch = useDispatch();
	let {x, y} = cursor

	const {elements} = useSelector(s => s);

	useEffect(() => {
		const myTimeout = setTimeout(() => {
			dispatch(update_modals({peek : false}))
		}, 3000);
		return () => clearTimeout(myTimeout)
	}, [])

	return (
		<Fragment>
			<AnimatePresence>
				<motion.div 
				initial ={{opacity: 0}} animate={{opacity: 1}} exit={{opacity : 0}}
				className={styles.container} style={{top : `${y+120 > window.innerHeight? y - 120 : y+10}px`, left : `${x+320 > window.innerWidth ? x - 320 : x+10}px`}}>
					<div className={styles.header}>
						<div className={styles.name}>
							<span>
								{data?.tag}
							</span>
							{data?.name}
						</div>
						<div className={styles.dimension}>
							{box.width} x
							{box.height}
						</div>
					</div>
					<div className={styles.details_force_design}>
						Path to element: <PathDisplay element = {data} elements = {elements}/>
					</div>
					<div className={styles.details}>
						builder-id: {data?.name}
					</div>
					<div className={styles.details}>
						background-color : 
						{background?.type?.value === "solid" && `rgba(${background?.colors[0]?.hex}, alpha : ${background?.colors[0].alpha})`}
						{background?.type.value === "gradient" && "gradient"}
						{!background?.type.value && " none"}
					</div>
					<div className={styles.details}>
						display: {css.display ? css.display?.value : "auto"}
					</div>
				</motion.div>
				<motion.div className={styles.box}
				style={{height : box.height, width: box.width, top: box.top, left : box.left	}}>

				</motion.div>
			</AnimatePresence>
		</Fragment>
	)
}

export default ElementDescriptionBox