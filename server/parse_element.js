import { add_classes } from "./utils";

export default (project, id) => {
  let data = project[id];
  let str = "";

  str = str.concat(
    `<${data?.type} ${add_classes(data.attributes)}>\n\t${data.children}\n</${
      data?.type
    }>`
  );
  return str;
};
