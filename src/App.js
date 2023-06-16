import React, { useEffect } from 'react'
import styles from "./App.module.scss";
import { Router, RouterProvider, redirect } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Editor from './components/Editor/Editor';
import Frame from './components/Frame/Frame';

const App = () => {

  return (
				<div className={styles.App} >
					<RouterProvider router={createBrowserRouter([
						{
							path: "/",
							element: <Editor/>
						},
						{
							path: "/frame",
							element: <Frame/>
						}
					])}
					/>
				</div>
  )
}

export default App