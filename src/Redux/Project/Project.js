
import { createSlice } from "@reduxjs/toolkit"
import { create_component } from "../../utils";

const baseComponent = {
	location : "src/App",
	name : "App",
	component_name : "App",
	children : [],
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


const initialState = JSON.parse(localStorage.getItem("project")) || {
	components : {
		"App" : create_component(baseComponent)
	},
	activeComponent : null
}
const project =  createSlice({
	name : "project",
	initialState,
	reducers : {
		setProject : (state , action) => {
			return {...state, components: action.payload};
		},
		updateText : (state, action) => {
			let temp = {...state}
			let [value , target] = action.payload;
			console.log(target, temp[target])

			let t2 = {...temp[target], children : value}
			temp[target] = t2;
			return temp;
		},
		setActiveComponent : (state, action) => {
			return {...state, activeComponent : action.payload}
		}
	}
})

export default project.reducer;

export const {setProject, updateText, setActiveComponent} = project.actions