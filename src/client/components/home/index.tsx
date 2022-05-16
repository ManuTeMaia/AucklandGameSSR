import React from 'react'
import styles from '../../styles/base.scss'
import { Link } from 'react-router-dom'
import HomePageWrap from 'components/HomePageWrap'

type MenuItems = {
	url: string
	name: string
	access: 'public' | 'private'
}

const menuItems: MenuItems[] = [
	{ url: 'game', name: 'Start Game', access: 'private' },
	{ url: 'sign-in', name: 'Sign In', access: 'public' },
	{ url: 'profile', name: 'Profile', access: 'private' },
	{ url: 'results', name: 'High-Scores', access: 'public' },
	{ url: 'forum', name: 'Forum', access: 'private' }
]

export const Home = () => {
	//const {isAuth} = useAuth();
	return (
		<HomePageWrap>
			<ul>
				{menuItems
					//.filter((item) => isAuth ? item.url !== 'sign-in' : item)
					.map(item => {
						return (
							<li key={item.url} className={styles.menuItem}>
								<Link to={item.url}>{item.name}</Link>
							</li>
						)
					})}
			</ul>
		</HomePageWrap>
	)
}
