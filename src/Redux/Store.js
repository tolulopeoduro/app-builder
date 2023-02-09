import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import ActiveElement from "./ActiveElement";
import clicks from "./clicks";
import elementContainer from "./elementContainer";
import projectSlice from "./Project/Project";

const reducers = combineReducers({
	project : projectSlice,
	activeElement : ActiveElement,
	clicks : clicks,
	elementContainer : elementContainer
})


const persistConfig = {
	key : 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, reducers) 

export default configureStore({
	reducer : persistedReducer,
	devTools: process.env.REACT_APP_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})
