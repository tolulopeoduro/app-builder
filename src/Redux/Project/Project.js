
import { createSlice } from "@reduxjs/toolkit"
import { create_component } from "../../utils";

const baseComponent = {
	is_component : true,
	location : "src/App",
	name : "App",
	component_name : "App",
	children : [],
	innerHTML : "",
	wrapper_element : 'div',
	attributes : {className : "styles.App"},
	style : `* {
		font-family: Inter, sans-serif;
		margin : 0; padding : 0;
	}
	
	.App {
		height: 100vh;
		width: 100vw;
	}`,
	inlineStyle : ``
}

const base = create_component(baseComponent)

const initialState = JSON.parse(localStorage.getItem("project")) || {
	elements : {
		"App" : base
	},
	element_menu : false,
	activeComponent : {...base}
}
const project =  createSlice({
	name : "project",
	initialState,
	reducers : {
		updateText : (state, action) => {
			let temp = {...state}
			let [value , target] = action.payload;

			let t2 = {...temp[target], children : value}
			temp[target] = t2;
			return temp;
		},
		setActiveComponent : (state, action) => {
			return {...state, activeComponent : action.payload}
		},
		setElements : (state, action) => {
			return {...state, elements : { ...state.elements, ...action.payload}}
		},
		set_element_menu : (state, action) => {
			return {...state, element_menu : action.payload}
		}
	}
})

export default project.reducer;

export const {setProject, updateText, setActiveComponent, setElements, set_element_menu} = project.actions