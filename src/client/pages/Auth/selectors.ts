import { SelectorResponse } from 'client/../../../../core/store/selectors'
import { UserState } from './types'
import { useAppSelector } from 'src/client'

export const userSelector: SelectorResponse<UserState> = ({ user }) => user

export const useUserInfo: () => UserState = () => useAppSelector(userSelector)

export const useAuth = () => {
	const { status, data } = useUserInfo()
	return {
		isAuth: status === 'success' && !!data,
		isLoaded: status !== 'default'
	}
}
