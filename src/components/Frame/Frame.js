import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderElement from '../RenderElement/RenderElement';
import { set_active_element } from '../../Redux/Reducers/active_element';
import { update_elements } from '../../Redux/Reducers/elements_reducer';
import { debounce } from 'lodash';

const Frame = () => {
	
	const state = useSelector(s => s);
	const {elements, active_element} = useSelector(s => s);
	const dispatch = useDispatch();

	useEffect(() => {
		let rect = document.querySelector	(`[data-builder_id='${active_element}']`)?.getBoundingClientRect();
		window.top.postMessage({message_type : "active_element_dimension", message : rect}, `${window.location.origin}/editor`);	
	}, [elements, active_element, elements[active_element]])
	
	useEffect(() => {
		document.getElementById("App")?.querySelectorAll("*").forEach(el => {
			if (!el.dataset.builder_id)	el.remove();
		})
		
	}, [elements])
	
	
	useEffect(() => {
		window.onmessage = e => {
			if (e.origin !== window.location.origin) return;
			const {message_type, message} = e.data;
			if (message_type === "elements") {
				dispatch(update_elements(message))
			}
			if (message_type === "active_element") {
				dispatch(set_active_element(message))
			}
		}
		
	}, [])
	
	const [els, setels] = useState([]);

	useEffect(() => {
		setels(elements)
	}, [elements])
	
	useEffect(() => {
		let all_el = document.querySelectorAll("[data-builder_id]");
		all_el.forEach(el => {
			el.addEventListener("contextmenu", e => {
				e.preventDefault();
				const id = e.target?.dataset?.builder_id;
				let element = elements[el?.dataset?.builder_id];
				let rect = document.querySelector	(`[data-builder_id='${id}']`).getBoundingClientRect();
				let c = {box : rect, data : element, cursor : {x : e.clientX, y : e?.clientY}};
				window.top.postMessage({message_type : "view_element", message : c}, `${window.location.origin}/editor`);	
				e.stopPropagation();
			})
			
		})
	}, [els])

	
	return elements["App"] && <RenderElement id = "App"/>
}

export default Frame