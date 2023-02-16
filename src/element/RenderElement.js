import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {setElement} from "../Redux/ActiveElement"
import { addElement, clearClicks } from "../Redux/clicks";
import { getContainer } from "../Redux/elementContainer";

const H1 =  styled.h1`${props => props?.css}`
const H2 =  styled.h2`${props => props?.css}`
const P =  styled.p`${props => props?.css}`
const SPAN =  styled.span`${props => props?.css}`
const Div = styled.div`${props => props.css? props.css : "height : 2rem; width : 4rem"}`

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
				<Div {...attributes}>
					{children?.map(child => <RenderElement {...project[child]}/>)}
				</Div>
			)
		}
		break;
		case "h1":
			return <H1  {...attributes}></H1>
			break;
		case "p":
			return <P {...attributes}></P>
		case "h2":
			return <H2 {...attributes}>{children}</H2>
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
			return <SPAN {...attributes}>{children}</SPAN>
			break;
	}
}

export default RenderElement