import React, { useEffect } from 'react'
import styles from "./App.module.scss";
import { Router, RouterProvider, redirect } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Frame from '../Frame/Frame';
import Editor from '../Editor/Editor';

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