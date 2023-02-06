import logo from './logo.svg';
import './App.css';
import { Fragment, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Control from './Pages/Control/Control';
import Result from './Result/Result';
import { Provider, useDispatch } from 'react-redux';
import Store from './Redux/Store';
import { setElement } from './Redux/ActiveElement';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import newElement from './element/newElement';

export default () => {
  return (
      <Provider store={Store}>
        <Fragment>
            <RouterProvider
              router = {
                createBrowserRouter([
                  {
                    path : "/control",
                    element : <Control/>
                  },
                  {
                    path : "/",
                    element : <Result/>
                  },
                ])
              }/>
        </Fragment>
      </Provider>
  )
}