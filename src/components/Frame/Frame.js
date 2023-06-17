import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderElement from '../RenderElement/RenderElement';
import { set_active_element } from '../../Redux/Reducers/active_element';
import { update_elements } from '../../Redux/Reducers/elements_reducer';

const Frame = () => {
	
	const state = useSelector(s => s);
	const {elements, active_element} = useSelector(s => s);
	const dispatch = useDispatch();

	useEffect(() => {
		let rect = document.querySelector	(`[data-builder_id='${active_element?.name}']`)?.getBoundingClientRect();
		window.top.postMessage({message_type : "active_element_dimension", message : rect}, "http://localhost:3000/editor");	
	}, [elements])

	useEffect(() => {
		window.onmessage = e => {
			if (e.origin !== "http://localhost:3000") return;
			const {message_type, message} = e.data;
			if (message_type === "elements") {
				dispatch(update_elements(message))
			}
		}
	}, [])
	
	useEffect(() => {
		let all_el = document.querySelectorAll("[data-builder_id]");
		all_el.forEach(el => {
			el.addEventListener("click", (e) => {
				const id = el?.dataset?.builder_id;
				let element = elements[el?.dataset?.builder_id];
				let rect = document.querySelector	(`[data-builder_id='${id}']`).getBoundingClientRect();
				window.top.postMessage({message_type : "active_element", message : element}, "http://localhost:3000/editor");	
				window.top.postMessage({message_type : "active_element_dimension", message : rect}, "http://localhost:3000/editor");	

				dispatch(set_active_element(element));
				e.stopPropagation();
			})
		})
	}, [elements])

	return <RenderElement {...elements["App"]}/>
}

export default Frame