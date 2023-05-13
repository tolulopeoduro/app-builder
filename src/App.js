import './App.css';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Store from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import SidebarLeft from './components/SidebarLeft/SidebarLeft';
import CSSEdit from './components/CSSEdit/CSSEdit';
import BottomBar from './components/BottomBar/BottomBar';
import { Fragment, useEffect } from 'react';
import { setActiveComponent } from './Redux/Project/Project';
import { setActiveElement } from './Redux/ActiveElement';
import Backdrop from './components/Backdrop/Backdrop';
import ComponentModal from './components/ComponentModal/ComponentModal';

export default () => {
	const {project : {elementContainer}, activeElement, project : {modal}} = useSelector(s => s)
	return (
		<Fragment>
			<div className='app'>
				{
					modal === "new_component" && 
					<Backdrop child = {<ComponentModal/>}/>
				}
				{(activeElement && activeElement != "body") &&
					<div id="selection-box" style={elementContainer ? {...elementContainer, top: elementContainer.top, left: elementContainer.left -5} : {}}></div>
				}
				<iframe id='view' src="http://localhost:3006" style={{width : "100%", height : "100%"}}></iframe>
				<BottomBar/>
			</div>
		</Fragment>

	)
}