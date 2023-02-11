import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setElement} from "../Redux/ActiveElement"
import { addElement, clearClicks } from "../Redux/clicks";
import { getContainer } from "../Redux/elementContainer";

const RenderElement = (props) => {
	let {children, attributes, type, id} = props;
	const dispatch = useDispatch()
	const {project, activeElement, clicks} = useSelector(s => s)
	attributes = {...attributes, onClick : (e) =>{
		e.preventDefault()
		dispatch(addElement(id));
	}}

	useEffect(() => {
		if (type !== "div") {
			document.getElementsByClassName(id)[0].innerHTML = children;
		}
	}, [project])
	
	switch (type) {
		case "div" : {
			return (
				<div {...attributes}>
					{children?.map(child => <RenderElement {...project[child]}/>)}
				</div>
			)
		}
		break;
		case "h1":
			return <h1 {...attributes}>{children}</h1>
			break;
		case "p":
			return <p {...attributes}>{children}</p>
		case "h2":
			return <h2 {...attributes}>{children}</h2>
			break;
		case "h3":
			return <h3 {...attributes}>{children}</h3>
			break;
		case "h4":
			return <h4 {...attributes}>{children}</h4>
			break;
		case "h5":
			return <h5 {...attributes}>{children}</h5>
			break;
		case "h6":
			return <h6 {...attributes}>{children}</h6>
			break;
		case "a":
			return <a {...attributes}>{children}</a>
			break;
		default:
			return <span {...attributes}>{children}</span>
			break;
	}
}

export default RenderElement