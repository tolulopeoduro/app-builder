import React, { useEffect } from 'react'
import styles from "./App.module.scss";
import { Router, RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Editor from './components/Editor/Editor';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store,  persistor } from './Redux/Store';
import RenderElement from './components/RenderElement/RenderElement';
import BottomBar from './components/BottomBar/BottomBar';
import { PersistGate } from 'redux-persist/integration/react';
import { set_active_element } from './Redux/Reducers/active_element_reducer';

const App = () => {

	const {elements} = useSelector(s => s);
	const dispatch = useDispatch();

	console.log(elements["App"])

	useEffect(() => {
		let all_el = document.querySelectorAll("[data-builder_id]");
		all_el.forEach(element => {
			element.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				dispatch(set_active_element(elements[element?.dataset?.builder_id]))
			})
		});
	}, [])

  return (
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
							element: (
									<RenderElement {...elements["App"]}/>
							) 
						}
					])}
					/>
				</div>
  )
}

export default App