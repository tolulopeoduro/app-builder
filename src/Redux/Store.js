import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import elements_reducer from "./Reducers/elements_reducer";
import persistStore from "redux-persist/es/persistStore";
import active_element_reducer from "./Reducers/active_element_reducer";

const reducers = combineReducers({
	elements : elements_reducer,
	active_element : active_element_reducer
})


const persistConfig = {
	key : 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, reducers) 

export const store =  configureStore({
	reducer : persistedReducer,
	devTools: process.env.REACT_APP_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

export const persistor = persistStore(store)
