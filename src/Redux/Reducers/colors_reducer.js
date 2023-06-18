import { createSlice } from "@reduxjs/toolkit";

const colors = createSlice({
	name: "colors",
	initialState : [],
	reducers : {
		update_pallete : (state, action) => {
			return action.payload;
		}
	}
})

export default colors.reducer;

export const {update_pallete} = colors.actions