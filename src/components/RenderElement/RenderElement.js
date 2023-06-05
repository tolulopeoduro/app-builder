import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { set_active_element } from "../../Redux/Reducers/active_element";

const obj_to_css = (object) => {
	let str = ""
	Object.keys(object).map(key => {
		str += (`${key}: ${object[key]};\n`)
	})
	return str;
}


const H1 =  styled.h1`${props => props?.css}`
const H2 =  styled.h2`${props => props?.css}`
const P =  styled.p`${props => props?.css}`
const SPAN =  styled.span`${props => props?.css}`
const Div = styled.div`${props => `height : 3rem; width : 100%; ${obj_to_css(props.css)}`}`


const RenderElement = (props) => {
	let {children, id, text, tag, name} = props;

	const {elements} = useSelector(s => s)

	const attributes = {...props.attributes, id : name}

	switch (tag) {
		case "div" : {
			return (
				<Div {...attributes}>
					{children?.map(child => <RenderElement key={elements[child]?.name} {...elements[child]}/>)}
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