import React from 'react'
import styles from "./App.module.scss";
import { Router, RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Editor from './components/Editor/Editor';
import { Provider } from 'react-redux';
import Store from './Redux/Store';

const App = () => {
  return (
		<Provider store = {Store}>
			<div className={styles.App} >
				<RouterProvider router={createBrowserRouter([
					{
						path: "/editor",
						element: <Editor/>
					},
					{
						path: "/",
						element : <p>Home</p>
					},
					{
						path: "/frame",
						element: <div><p>Fram</p></div>
					}
				])}
				/>
			</div>
		</Provider>
  )
}

export default App