import './App.css';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Redux/Store';

export default () => {
  return (
          // <PersistGate persistor={persistStore(Store)}>
      <Provider store={Store}>
        <div className='app'>
              </div>
      </Provider>
          // </PersistGate>
  )
}