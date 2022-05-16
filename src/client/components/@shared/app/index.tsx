import { Suspense } from 'react'
import loadable from '@loadable/component'
import { Routes, Route } from 'react-router-dom'
import { Loader } from '@shared/loader'

const HomePage = loadable(() => import('pages/home'))
const AboutPage = loadable(() => import('pages/about'))

export const App = () => (
	<Suspense fallback={<Loader />}>
		<Routes>
			<Route index element={<HomePage />} />
			<Route path='/game' element={<AboutPage />} />
			<Route path='/sign-in' element={<HomePage />} />
			<Route path='/sign-up' element={<HomePage />} />
			<Route path='/profile' element={<HomePage />} />
			<Route path='/results' element={<HomePage />} />
			<Route path='/forum' element={<HomePage />} />
			<Route path='/settings' element={<HomePage />} />
			<Route path='*' element={<HomePage />} />
		</Routes>
	</Suspense>
)
