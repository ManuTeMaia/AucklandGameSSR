import { NextFunction, Request, Response } from 'express'
import { ChunkExtractor } from '@loadable/server'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { getApp, getHtml, getStats } from './render.util'
import createSagaMiddleware from '@redux-saga/core'
import configureStore from '../../../../core/store'
import { rootSaga } from '../../../../core/Saga'
import { Provider } from 'react-redux'

const sagaMiddleWare = createSagaMiddleware()

const store = configureStore(sagaMiddleWare)
sagaMiddleWare.run(rootSaga)
const preloadedState = store.getState()

export const render = (req: Request, res: Response, next: NextFunction) => {
	const chunkExtractor = new ChunkExtractor(getStats(res))
	const { App } = getApp(res)

	res.renderApp = () => {
		const location = req.url
		const jsx = chunkExtractor.collectChunks(
			<Provider store={store}>
				<StaticRouter location={location}>
					<App />
				</StaticRouter>
			</Provider>
		)
		const reactHtml = renderToString(jsx)

		res.status(200).send(getHtml(reactHtml, chunkExtractor, preloadedState))
	}

	next()
}
