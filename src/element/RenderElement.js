import { useEffect } from "react";
import { useSelector } from "react-redux";

const RenderElement = (props) => {
	let {data, children, attributes, type} = props;
	const {project} = useSelector(s => s)
	data = {...data, onClick : () => console.log(data)}

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
			return <h1 {...data}>{children}</h1>
			break;
		case "p":
			return <p {...data}>{children}</p>
		case "h2":
			return <h2 {...data}>{children}</h2>
			break;
		case "h3":
			return <h3 {...data}>{children}</h3>
			break;
		case "h4":
			return <h4 {...data}>{children}</h4>
			break;
		case "h5":
			return <h5 {...data}>{children}</h5>
			break;
		case "h6":
			return <h6 {...data}>{children}</h6>
			break;
		case "a":
			return <a {...data}>{children}</a>
			break;
		default:
			return <span {...data}>{children}</span>
			break;
	}
}

export default RenderElement