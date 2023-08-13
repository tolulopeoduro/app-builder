import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	new_element: false,
	main_menu: false,
	editor: true
}

const modals = createSlice({
	name: "modals",
	initialState: initialState,
	reducers: {
		update_modals: (state, action) => {
			return {...state, ...action.payload};
		}
	}
})

export default modals.reducer;
export const {update_modals} = modals.actions;