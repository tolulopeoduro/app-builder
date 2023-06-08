import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {persistor, store} from './Redux/Store';
import { PersistGate } from 'redux-persist/lib/integration/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		// <PersistGate persistor={persistor}>
			<Provider store={store}>
				<App/>
			</Provider>
		// </PersistGate>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
