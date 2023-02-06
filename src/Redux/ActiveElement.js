import { createSlice } from "@reduxjs/toolkit"


const initialState = null

const activeElement = createSlice({
	name : "activeSlice",
	initialState,
	reducers : {
		setElement : (state, action) => {
			return action.payload;
		}
	}
})

export default activeElement.reducer;

export const {setElement} = activeElement.actions;