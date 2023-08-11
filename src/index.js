import {createRoot} from "react-dom/client"
import App from "./App/App"
import { Provider } from "react-redux"
import { store } from "./Redux/Store"

console.log(process.env.NODE_ENV)

createRoot(document.body).render(
	<Provider store={store}>
		<App/>
	</Provider>
)

