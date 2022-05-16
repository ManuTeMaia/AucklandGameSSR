import { BrowserRouter } from 'react-router-dom'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { loadableReady } from '@loadable/component'
import { App } from '@shared/app'
import { useEffect } from 'react'
import { fetchUser } from 'pages/Auth/actions'
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import createSagaMiddleware from '@redux-saga/core'
import configureStore from './core/store'
import { rootSaga } from './core/Saga'

const sagaMiddleWare = createSagaMiddleware()

const store = configureStore(sagaMiddleWare)
sagaMiddleWare.run(rootSaga)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then(registration => {
				console.log('SW registered: ', registration)
			})
			.catch(registrationError => {
				console.log('SW registration failed: ', registrationError)
			})
	})
}

const dispatch = useAppDispatch()
//const { stateHistory } = useInitHistory();

useEffect(() => {
	dispatch(fetchUser())
}, [])

loadableReady(() => {
	const container = document.getElementById('root') as HTMLElement
	const AppContainer = (
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	)

	if (IS_SPA) createRoot(container).render(AppContainer)
	else hydrateRoot(container, AppContainer)
})
