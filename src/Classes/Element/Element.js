import Render from "../../Pages/Render/Render";

export default class Element {
	constructor (type, parent , position, attributes, children, id) {
		this.id = id || require("randomstring").generate()
		this.parent = parent;
		this.position = position;
		this.attributes = attributes || {};
		this.type = type;
		this.children = (children || [])
	}

	setParent(new_parent) {
		this.parent = new_parent
	}

	addChild (id) {
		this.children.push(id);
	}

	render() {
		switch (this.type) {
			case "div" : {
				return (
					<div {...this.attributes}>
						{this.children.map(child =>{
							console.log(child``)
							return (
								<Render component={child}/>
							)	
						})}
					</div>
				)
			}
			case "h1":
				return <h1 {...this.data}>{this.children}</h1>
				break;
			case "p":
				return <p {...this.data}>{this.children}</p>
			case "h2":
				return <h2 {...this.data}>{this.children}</h2>
				break;
			case "h3":
				return <h3 {...this.data}>{this.children}</h3>
				break;
			case "h4":
				return <h4 {...this.data}>{this.children}</h4>
				break;
			case "h5":
				return <h5 {...this.data}>{this.children}</h5>
				break;
			case "h6":
				return <h6 {...this.data}>{this.children}</h6>
				break;
			case "a":
				return <a {...this.data}>{this.children}</a>
				break;
			default:
				return <span {...this.data}>{this.children}</span>
				break;
		}
	}
}