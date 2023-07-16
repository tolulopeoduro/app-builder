import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { obj_to_css } from "../../utils";
import default_styles from "../../default_styles.json"

const process_css = (tag, css) => {
	return obj_to_css({...default_styles?.[tag], ...css})
}

const H1 =  styled.h1`${props => process_css("h1", props.css)}`
const H2 =  styled.h2`${props => process_css("h2", props.css)}`
const P =  styled.p`${props => process_css("p", props.css)}`
const SPAN =  styled.span`${props => process_css("span", props.css)}`
const Div = styled.div`${props => process_css("div", props.css)}`


const RenderElement = (props) => {
	let {children, tag, name, innerHTML, type} = props;

	const {elements} = useSelector(s => s)

	const attributes = {...props.attributes, id : name}

	useEffect(() => {
		if (type === "text") {
			document.getElementById(name).innerHTML = innerHTML;
		}
	}, [props])

	switch (tag) {
		case "div" : {
			return (
				<Div {...attributes}>
					{children?.map((child, index) => <RenderElement key= {index} {...elements[child]}/>)}
				</Div>
			)
		}
		break;
		case "h2":
			return <H2  {...attributes}></H2>
			break;
		case "h1":
				return <H1 {...attributes}></H1>
				break;
		case "p":
			return <P {...attributes}></P>
			break;
		default:
			return <SPAN 	{...attributes}></SPAN>
			break;
	}
}

export default RenderElement