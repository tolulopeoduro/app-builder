import { createSlice } from "@reduxjs/toolkit";

const baseComponent = {
	is_component : true,
	location : "src/App",
	name : "App",
	component_name : "App",
	children : [],
	innerHTML : "",
	text : "Hello",
	tag : 'div',
	parent : null,
	attributes : {
		className : "App", "data-builder_id" : "App",
		css : {
			height: '100vh',
			width: '100vw',
			"background-color": {hex: "#000", alpha: 0.5},
			border: {
				size : "1px",
				style: "solid",
				color: {hex: "#fff", alpha: 1},
			}
		}
	},
	style : {},
}


const element_reducer = createSlice({
	name : "elements",
	initialState : {
		"App" : baseComponent
	},
	reducers : {
		update_elements : (state, action) => {
			return action.payload
		}
	}
})

export default element_reducer.reducer;

export const {update_elements} = element_reducer.actions