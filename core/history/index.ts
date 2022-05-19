import { createBrowserHistory, createMemoryHistory } from 'history'
import { useLayoutEffect, useState } from 'react'

const history = IS_SERVER ? createMemoryHistory({ initialEntries: ['/'] }) : createBrowserHistory()

export const useInitHistory = () => {
	const [stateHistory, setState] = useState({
		action: history.action,
		location: history.location
	})

	useLayoutEffect(() => history.listen(setState), [history])
	return {
		stateHistory
	}
}

export default history
