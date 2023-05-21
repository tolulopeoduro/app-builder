import { createSlice } from "@reduxjs/toolkit";

const baseComponent = {
	is_component : true,
	location : "src/App",
	name : "App",
	component_name : "App",
	children : [],
	innerHTML : "",
	text : "Hello",
	tag : 'p',
	attributes : {className : "styles.App", "data-builder_id" : "App"},
	style : {"color" : "#000"},
	css : ""
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