import { createSlice } from "@reduxjs/toolkit";

const undo_redo = createSlice({
	name : "undo_redo",
	initialState : {active: false},
	reducers : {
		toggle_undo : (state, action) => {
			return {active : action.payload};
		}
	}
})

export default undo_redo.reducer;

export const {toggle_undo} = undo_redo.actions