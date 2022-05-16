type MenuItems = {
	url: string
	name: string
	access: 'public' | 'private'
}

export const menuItems: MenuItems[] = [
	{ url: 'game', name: 'Start Game', access: 'private' },
	{ url: 'sign-in', name: 'Sign In', access: 'public' },
	{ url: 'profile', name: 'Profile', access: 'private' },
	{ url: 'scores', name: 'High-Scores', access: 'public' },
	{ url: 'forum', name: 'Forum', access: 'private' }
]
