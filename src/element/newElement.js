export default (type, parent, position, attributes, children, id) => {
	return {
		id : id || require("randomstring").generate(),
		parent,
		position,
		type,
		attributes : attributes ? {...attributes, className : this?.className + " " + id} : {class : id} ,
		children : type === "div" ? (children || []) : "hello"
	}
}