import { Router } from 'react-router-dom'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { loadableReady } from '@loadable/component'
import { App } from '@shared/app'
import { Provider, TypedUseSelectorHook, useSelector } from 'react-redux'
import createSagaMiddleware from '@redux-saga/core'
import configureStore from 'core/store'
import { rootSaga } from 'core/Saga'
import { useInitHistory } from 'core/history'

const sagaMiddleWare = createSagaMiddleware()

const store = configureStore(sagaMiddleWare)
sagaMiddleWare.run(rootSaga)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

loadableReady(() => {
	const container = document.getElementById('root') as HTMLElement
	const { stateHistory } = useInitHistory()

	const AppContainer = (
		<Provider store={store}>
			<Router
				location={stateHistory.location}
				navigator={history}
				navigationType={stateHistory.action}
			>
				<App />
			</Router>
		</Provider>
	)

	if (IS_SPA) createRoot(container).render(AppContainer)
	else hydrateRoot(container, AppContainer)
})
