
import { createSlice } from "@reduxjs/toolkit"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import newElement from "../../element/newElement";

const initialState = JSON.parse(localStorage.getItem("project")) || {
	"body" :  newElement("div",null, 0, {class : "app"}, [], "body"),
}
const project =  createSlice({
	name : "project",
	initialState,
	reducers : {
		setProject : (state , action) => {
			return action.payload;
		}
	}
})

export default project.reducer;

export const {setProject} = project.actions