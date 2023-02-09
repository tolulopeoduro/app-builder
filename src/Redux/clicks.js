import { createSlice } from "@reduxjs/toolkit"

const clicks = createSlice({
	name : "clicks",
	initialState: [],
	reducers : {
		addElement : (state, action) => {
			let l = [...state]
			l.push(action.payload)
			return l;
		},
		clearClicks : () => []
	}

})

export default clicks.reducer;

export const {addElement, clearClicks} = clicks.actions;