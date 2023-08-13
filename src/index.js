import {createRoot} from "react-dom/client"
import App from "./components/App/App"
import { Provider } from "react-redux"
import { store } from "./Redux/Store"
import "./index.scss"	

createRoot(document.body).render(
	<Provider store={store}>
		<App/>
	</Provider>
)

