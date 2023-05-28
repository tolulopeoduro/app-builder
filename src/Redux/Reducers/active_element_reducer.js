import { createSlice } from "@reduxjs/toolkit";

const active_element_reducer = createSlice({
	name : "elements",
	initialState : null,
	reducers : {
		set_active_element : (state, action) => {
			return action.payload
		}
	}
})

export default active_element_reducer.reducer;

export const {set_active_element} = active_element_reducer.actions