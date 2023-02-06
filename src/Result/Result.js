import React, { Component, Fragment, Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Div from '../Classes/Div/Div'
import Text from '../Classes/Text/Text'
import RenderElement from '../element/RenderElement'

export default () => {

	const [project, setProject] = useState();

	useEffect(() => {
		setProject(JSON.parse(localStorage.getItem("project")))
	}, [])

	useEffect(() => {
		console.log("project loaded", project)
	}, [project])

	return (
		<Fragment>
			<Suspense fallback={"hello"}>
				{
					project && 
					<RenderElement {...project["body"]}/>
				}
			</Suspense>
		</Fragment>
	)
}


