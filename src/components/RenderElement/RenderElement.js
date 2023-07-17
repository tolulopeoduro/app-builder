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
	const {elements} = useSelector(s => s)
	const element_data = elements[props.id]

	useEffect(() => {
		if (element_data?.type === "text") {
			document.getElementById(element_data?.name).innerHTML = element_data?.innerHTML;
		}
	}, [element_data])
	
	switch (element_data?.tag) {
		case "div" : {
			return (
				<Div {...element_data?.attributes}>
					{element_data.children && element_data?.children?.map((child, index) => child &&  <RenderElement key= {index} 	id ={child} />)}
				</Div>
			)
		}
		break;
		case "h2":
			return <H2  {...element_data?.attributes}></H2>
			break;
		case "h1":
				return <H1 {...element_data?.attributes}></H1>
				break;
		case "p":
			return <P {...element_data?.attributes}></P>
			break;
		default:
			return <SPAN 	{...element_data?.attributes}></SPAN>
			break;
	}
}

export default RenderElement