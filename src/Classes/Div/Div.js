import Render from "../../Pages/Render/Render";
import Element from "../Element/Element";

const randomstring = require("randomstring")

export default class extends Element {
	constructor (children, data, id, parent, attributes, position) {
		this.id = id || randomstring.generate()
		this.children = children|| [];
	}

	render() {
		return (
			<div {...this.attributes}>
				{this.children.map(child =>	<Render component={child}/>)}
			</div>
		)
	}
}