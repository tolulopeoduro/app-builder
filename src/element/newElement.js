export default (type, parent, position, attributes, children, id) => {
	return {
		id : id || require("randomstring").generate(),
		parent,
		position,
		type,
		attributes,
		children : type === "div" ? (children || []) : "hello"
	}
}