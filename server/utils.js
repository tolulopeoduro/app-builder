exports.add_classes = (data) => {
	let s = "";
	if (data.class || data.className) {
		s = s.concat(`className = {style.${data.class || data.className}} `)
	}
	if (data.id) {
		s = s.concat(`id = "${data.id}" `)
	}
	return s;
}