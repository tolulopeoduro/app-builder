import { createSlice } from "@reduxjs/toolkit"


const initialState = null

const activeElement = createSlice({
	name : "activeSlice",
	initialState,
	reducers : {
		setActiveElement : (state, action) => {
			return action.payload;
		}
	}
})

export default activeElement.reducer;

export const {setActiveElement} = activeElement.actions;