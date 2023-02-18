import parse_element from "./parse_element";
import { add_classes } from "./utils";
const { exec } = require("child_process");

export default (project, id) => {
	let data = project[id];
	console.log("\n\n\n")
	let str = ""
	let ar = [];
	str += "export default (props) => {"
	ar.push("\n}");
	
	
	// add html
	
	str+=`
	return (
		<${data.type} ${add_classes(data.attributes)}>\n
		`
		data.children.forEach(child => {
			str = str.concat(parse_element(project, child), "\n")
		})		
		ar.push("\n)")
		ar.push("\n</div>")

		// component closing div and brackets

		for (let a = ar.length-1; a > -1; a--) {
			str = str.concat(ar[a]);
		}
  
	str+= "\n\n"

	exec(`echo "${str}" > ./server/tstfile.js; yarn prettier --write ./server/tstfile.js;`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		return;
	});
}