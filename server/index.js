const express = require("express");
const app = express(); // create express app
const fs = require('fs');
import parse_component from "./parse_component";

const project = 
{
  "body": {
    "id": "body",
    "parent": null,
    "position": 0,
    "type": "div",
    "attributes": {
      "class": "app",
      "style": {
        "overFlow": "auto"
      }
    },
    "children": [
      "Ru6fPHTtaQVmtxTrAmJo5JPtAm57Fp0Z",
      "ixTvGhtCK7W4vtjBZNcEIoHhfYiyhr4j"
    ]
  },
  "Ru6fPHTtaQVmtxTrAmJo5JPtAm57Fp0Z": {
    "id": "Ru6fPHTtaQVmtxTrAmJo5JPtAm57Fp0Z",
    "parent": "body",
    "position": 0,
    "type": "p",
    "attributes": {
      "className": "Ru6fPHTtaQVmtxTrAmJo5JPtAm57Fp0Z",
      "css": ""
    },
    "children": "hello"
  },
  "ixTvGhtCK7W4vtjBZNcEIoHhfYiyhr4j": {
    "id": "ixTvGhtCK7W4vtjBZNcEIoHhfYiyhr4j",
    "parent": "body",
    "position": 1,
    "type": "h1",
    "attributes": {
      "className": "ixTvGhtCK7W4vtjBZNcEIoHhfYiyhr4j",
      "css": "color:red;background:green;text-decoration:underline;"
    },
    "children": "hello"
  }
}



app.get("/", (req, res) => {


  res.send("hlo");
});

// start express server on port 5000
app.listen(5000, () => {

  let ress = "";
  parse_component(project, "body")
  console.log(ress);
});