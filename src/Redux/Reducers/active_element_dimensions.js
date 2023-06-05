import { createSlice } from "@reduxjs/toolkit";

const active_element_dimension = createSlice({
	name: "active_element_dimension",
	initialState: null,
	reducers: {
		update_dimensions: (state, action) => {
			return action.payload;
		}
	}
})

export default active_element_dimension.reducer;

export const {update_dimensions} = active_element_dimension.actions;