import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const H1 =  styled.h1`${props => props?.css}`
const H2 =  styled.h2`${props => props?.css}`
const P =  styled.p`${props => props?.css}`
const SPAN =  styled.span`${props => props?.css}`
const Div = styled.div`${props => props.css? props.css : "height : 2rem; width : 4rem"}`

const RenderElement = (props) => {
	let {children, attributes, id, text, tag} = props;
	const dispatch = useDispatch()
	const {elements} = useSelector(s => s)
	attributes = {...attributes, onClick : (e) =>{
		e.preventDefault();
		e.stopPropagation();
	}}

	console.log("hey", props )

	useEffect(() => {
		if (tag !== "div") {
			document.querySelector("[data-builder_id]").innerHTML = text;
		}
	}, [elements])
	
	switch (tag) {
		case "div" : {
			return (
				<Div {...attributes}>
					{children?.map(child => <RenderElement {...elements[child]}/>)}
				</Div>
			)
		}
		break;
		case "h1":
			return <H1  {...attributes}></H1>
			break;
		case "p":
			return <P {...attributes}>jj</P>
			break;
		default:
			return <SPAN {...attributes}></SPAN>
			break;
	}
}

export default RenderElement