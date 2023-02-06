

export default class extends Element {
	constructor (type, parent, position, attributes) {
		super(parent, position, attributes);
		this.id = require("randomstring").generate();
		this.child = `New ${this.type}`;
		this.type = type;
	}

	setChild (child) {
		this.child = child
	}

	render () {
		switch (this.type) {
			case "h1":
				return <h1 {...this.data}>{this.child}</h1>
				break;
			case "p":
				return <p {...this.data}>{this.child}</p>
			case "h2":
				return <h2 {...this.data}>{this.child}</h2>
				break;
			case "h3":
				return <h3 {...this.data}>{this.child}</h3>
				break;
			case "h4":
				return <h4 {...this.data}>{this.child}</h4>
				break;
			case "h5":
				return <h5 {...this.data}>{this.child}</h5>
				break;
			case "h6":
				return <h6 {...this.data}>{this.child}</h6>
				break;
			case "a":
				return <a {...this.data}>{this.child}</a>
				break;
			default:
				return <span {...this.data}>{this.child}</span>
				break;;
		}
	}
}