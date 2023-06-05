import { createSlice } from "@reduxjs/toolkit";
import { create } from "lodash";

const active_element = createSlice({
	name: "active_comp",
	initialState: null,
	reducers: {
		set_active_element: (state, action) => action.payload
	}
})

export default active_element.reducer;

export const {set_active_element} = active_element.actions;