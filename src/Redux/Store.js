import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import elements_reducer from "./Reducers/elements_reducer";
import modals from "./Reducers/modals";
import persistStore from "redux-persist/es/persistStore";
import active_element from "./Reducers/active_element";
import active_element_dimensions from "./Reducers/active_element_dimensions";
import colors_reducer from "./Reducers/colors_reducer";
import viewed_element from "./Reducers/viewed_element";
import undo_redo from "./Reducers/undo_redo"

const reducers = combineReducers({
	elements : elements_reducer,
	modals : modals,
	active_element : active_element,
	active_element_dimension : active_element_dimensions,
	colors: colors_reducer,
	viewed_element: viewed_element,
	undo_redo : undo_redo
})


const persistConfig = {
	key : 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, reducers) 

export const store =  configureStore({
	reducer : persistedReducer,
	devTools: process.env.REACT_APP_ENV !== 'production'
})

export const persistor = persistStore(store)
