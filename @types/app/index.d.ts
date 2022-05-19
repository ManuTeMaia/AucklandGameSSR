type Collection<K extends string | number, V> = Record<K, V>

interface Window {
	IS_SERVER: boolean
	IS_DEV: boolean
	__PRELOADED_STATE__: unknown
}

declare namespace Express {
	interface Response {
		renderApp(): void
	}
}
