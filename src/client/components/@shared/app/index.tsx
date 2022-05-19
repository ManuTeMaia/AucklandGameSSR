import { Suspense, useEffect } from 'react'
import loadable from '@loadable/component'
import { Routes, Route } from 'react-router-dom'
import { Loader } from '@shared/loader'
import { useDispatch } from 'react-redux'
import { fetchUser } from 'pages/Auth/actions'

export const useAppDispatch = () => useDispatch()

const MainPage = loadable(() => import('pages/Main'))
const SighInPage = loadable(() => import('pages/Auth/SignIn'))
const SighUpPage = loadable(() => import('pages/Auth/SignUp'))
const ProfilePage = loadable(() => import('pages/Profile'))
const ScoresPage = loadable(() => import('pages/Scores'))
const ForumPage = loadable(() => import('pages/Forum/ForumMain'))
const Error404 = loadable(() => import('pages/Errors/404'))

export const App = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchUser())
	})

	return (
		<Suspense fallback={<Loader />}>
			<Routes>
				<Route index element={<MainPage />} />
				<Route path='/game' element={<MainPage />} />
				<Route path='/sign-in' element={<SighInPage />} />
				<Route path='/sign-up' element={<SighUpPage />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route path='/settings' element={<MainPage />} />
				<Route path='/scores' element={<ScoresPage />} />
				<Route path='/forum' element={<ForumPage />} />
				<Route path='*' element={<Error404 />} />
			</Routes>
		</Suspense>
	)
}
