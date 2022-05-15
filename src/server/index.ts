import express from 'express'
import { hot } from './middleware'
import { router } from './router'

export const app = express()
app.use(hot())
app.use(router)

app.listen(4000, () => {
	console.log('Application is started on localhost:4000')
})
