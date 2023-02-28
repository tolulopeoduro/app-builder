import './App.css';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import SidebarLeft from './components/SidebarLeft/SidebarLeft';

export default () => {
return (
	// <PersistGate persistor={persistStore(Store)}>
		<Provider store={Store}>
			<div className='app'>
				<SidebarLeft/>
				<iframe src="http://localhost:3006" style={{width : "100%", height : "100%"}}>
				</iframe>
			</div>
		</Provider>
	// </PersistGate>
)
}