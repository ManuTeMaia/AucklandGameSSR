import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { SagaMiddleware } from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './rootReducer'

export default function configureStore(saga: SagaMiddleware) {
	const middleWares = [saga]

	const middlewareEnhancer = applyMiddleware(...middleWares)

	const enhancers = [middlewareEnhancer]
	const composedEnhancers = composeWithDevTools(...enhancers)

	const PreloadedState = IS_SERVER ? window.__PRELOADED_STATE__ : undefined

	return createStore(rootReducer, PreloadedState, composedEnhancers)
}
