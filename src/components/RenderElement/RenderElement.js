import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { set_active_element } from "../../Redux/Reducers/active_element";
import hexRgb from "hex-rgb";
import { obj_to_css } from "../../utils";



const H1 =  styled.h1`${props => props?.css}`
const H2 =  styled.h2`${props => props?.css}`
const P =  styled.p`${props => props?.css}`
const SPAN =  styled.span`${props => props?.css}`
const Div = styled.div`${props => obj_to_css(props.css)}`


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
			return <P {...attributes}></P>
			break;
		default:
			return <SPAN {...attributes}></SPAN>
			break;
	}
}

export default RenderElement