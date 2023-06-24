import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_active_element } from '../../Redux/Reducers/active_element';

const PathDisplay = (props) => {
	const {element, elements} = props;
	const dispatch = useDispatch();

	const select = () => dispatch(set_active_element(elements[element.name]))

	return (
		<Fragment>
			{
				elements[element?.parent] &&
				<Fragment>
					<PathDisplay elements = {elements} element={elements[element?.parent]}/>
					<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" 
					viewBox="0 0 24 24"><path fill="currentColor" d="M10 17V7l5 5l-5 5Z"/></svg>
				</Fragment>
			}
			{
				element.is_component ? 
				<span onClick={() => select()}>{element.component_name}</span> :
				<span onClick={() => select()}>{element?.tag}</span>
			}
		</Fragment>
	)
}

export default PathDisplay