import { createSlice } from "@reduxjs/toolkit";


const elementContainer = createSlice({
	name : "elementContainer",
	initialState : null,
	reducers : {
		getContainer : (state, action) => {
			return action.payload;
		}
	}
})

export default elementContainer.reducer;

export const {getContainer} = elementContainer.actions