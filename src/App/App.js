import React, { useEffect } from 'react'
import styles from "./App.module.scss";

const App = () => {

	useEffect(() => {
		console.log("khjkjh")
		console.log(process.env.NODE_ENV)
	},[])

  return (
				<div className={styles.App} >
					<p>Hello</p>
				</div>
  )
}

export default App