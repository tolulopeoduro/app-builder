
import { createSlice } from "@reduxjs/toolkit"
import { create_component } from "../../utils";

const baseComponent = {
	location : "src/App",
	name : "App",
	children : [],
	wrapper_element : 'div',
	attributes : {},
	style : ``,
	inlineStyle : ``
}


const initialState = JSON.parse(localStorage.getItem("project")) || {
	components : {
		"App" : create_component(baseComponent)
	}
}
const project =  createSlice({
	name : "project",
	initialState,
	reducers : {
		setProject : (state , action) => {
			return action.payload;
		},
		updateText : (state, action) => {
			let temp = {...state}
			let [value , target] = action.payload;
			console.log(target, temp[target])

			let t2 = {...temp[target], children : value}
			temp[target] = t2;
			return temp;
		}
	}
})

export default project.reducer;

export const {setProject, updateText} = project.actions