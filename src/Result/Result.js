import React, { Component, Fragment, Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import RenderElement from '../element/RenderElement'

export default () => {

	const {project} = useSelector(s => s);

	// useEffect(() => {
	// 	setProject(localStorage.getItem("project"))
	// }, [])

	return (
		<Fragment>	
			<div style={{height : "90vh", width : "90vw",overflow : "scroll", border : "1px solid black"}}>
				{
					project && 
					<RenderElement {...project["body"]}/>
				}
			</div>
		</Fragment>
	)
}


