import { Router, static as staticRoute } from 'express'

export function staticRoutes(router: Router) {
	router.use(staticRoute('dist'))
}
