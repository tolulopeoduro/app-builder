import React, { Component, Fragment, Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderElement from '../element/RenderElement'
import { getContainer } from '../Redux/elementContainer';
import { debounce } from 'lodash';

export default () => {

	const {project, activeElement} = useSelector(s => s);
	const dispatch = useDispatch()

	// useEffect(() => {
	// 	setProject(localStorage.getItem("project"))
	// }, [])
	let myTimeout = null;
	const handle = () => {
		handleEnd()
	}
	
	const handleEnd = useMemo(
		() => debounce(() =>  {
			if (!activeElement || activeElement === "body") return;
			const c = document.getElementsByClassName(activeElement)[0]?.getBoundingClientRect()
			let temp = (JSON.parse(JSON.stringify(c)))
			dispatch(getContainer(temp));
		}, 150), []
	)

	return (
		<Fragment>	
			<div style={{height : "100vh", width : "100vw",overflow : "scroll"}} onScroll={(e) => handle()}>
				{
					project && 
					<RenderElement {...project["body"]}/>
				}
			</div>
		</Fragment>
	)
}


