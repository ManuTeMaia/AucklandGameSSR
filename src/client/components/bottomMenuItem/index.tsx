import React, { FC } from 'react'
import styles from 'styles/base.scss'
import { Link, useLocation } from 'react-router-dom'

interface BottomMenuItemType {
	icon: string
	title: string
	url: string
	handler?: () => void
}
const isHidden = (url: string): string => {
	const location = useLocation()
	if (location.pathname === url) {
		return `${styles.bottomMenuItem} ${styles.hidden}`
	} else {
		return `${styles.bottomMenuItem}`
	}
}

const BottomMenuItem: FC<BottomMenuItemType> = ({ icon, title, url, handler }) => {
	return (
		<Link
			to={url}
			className={isHidden(url)}
			onClick={event => {
				if (handler) {
					event.preventDefault()
					handler()
				}
			}}
		>
			<i className={icon} />
			<span>{title}</span>
		</Link>
	)
}

export default BottomMenuItem
