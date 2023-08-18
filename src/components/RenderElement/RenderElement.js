import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { obj_to_css } from "../../utils";
import default_styles from "../../default_styles.json"
import { set_active_element } from "../../Redux/Reducers/active_element";

const process_css = (tag, css) => {
	return obj_to_css({...default_styles?.[tag], ...css})
}

const H1 =  styled.h1`${props => process_css("h1", props.css)}`
const H2 =  styled.h2`${props => process_css("h2", props.css)}`
const P =  styled.p`${props => process_css("p", props.css)}`
const SPAN =  styled.span`${props => process_css("span", props.css)}`
const Div = styled.div`${props => process_css("div", props.css)}`


const RenderElement = (props) => {
	const {elements} = useSelector(s => s)
	const [element_data, update_data] = useState({})
	const dispatch = useDispatch()

	useEffect(() => {
		update_data(elements[props?.id])
	}, [elements])



	useEffect(() => {
		if (element_data?.type === "text") {
			let el = document.getElementById(element_data?.name);
			if (el) el.innerHTML = element_data?.innerHTML;
		}
	}, [element_data])

	const el_att = {
		...element_data?.attributes,
		onClick : (e) => {
			const id = element_data?.name;
			let rect = document.querySelector	(`[data-builder_id='${id}']`).getBoundingClientRect();
			window.top.postMessage({message_type : "active_element", message : id}, `${window.location.origin}/editor`);	
			window.top.postMessage({message_type : "active_element_dimension", message : rect}, `${window.location.origin}/editor`);	
			dispatch(set_active_element(id));
			e.stopPropagation();
		}
	}
	
	switch (element_data?.tag) {
		case "div" : {
			return (
				<Div {...el_att}>
					{element_data.children && element_data?.children?.map((child, index) => child &&  <RenderElement key= {index} 	id ={child} />)}
				</Div>
			)
		}
		break;
		case "h2":
			return <H2  {...el_att}></H2>
			break;
		case "h1":
				return <H1 {...el_att}></H1>
				break;
		case "p":
			return <P {...el_att}></P>
			break;
		default:
			return <SPAN 	{...el_att}></SPAN>
			break;
	}
}

export default RenderElement