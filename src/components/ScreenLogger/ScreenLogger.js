import React from 'react'
import { useEffect } from 'react'

const ScreenLogger = () => {

	useEffect(() => {
		window.addEventListener('storage', function(e) {
			if (e.storageArea === sessionStorage && e.key === 'Data') {
				// Something on another page changed the stored value.
			}
		});
		return(() => {
			window.removeEventListener('storage', function(e) {
				document.
				if (e.storageArea === sessionStorage && e.key === 'Data') {
					// Something on another page changed the stored value.
				}
			});
		})
	}, [])

	return (
		<div>

		</div>
	)
}

export default ScreenLogger