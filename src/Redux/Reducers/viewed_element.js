import { createSlice } from "@reduxjs/toolkit";

const viewed_element = createSlice({
	name: "viewed_element",
	initialState: null,
	reducers: {
		view_element: (state, action) => {
			return action.payload;
		}
	}
})

export default viewed_element.reducer;

export const {view_element} = viewed_element.actions;