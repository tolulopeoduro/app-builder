import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';

export default (props) => {

	const {project} = useSelector(s => s);

	const {component} = props
  	return project[component].render();
}