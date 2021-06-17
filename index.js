/* eslint-env node */
const express = require('express')

const app = express()
const port = process.env.PORT || 8001

process.title = 'trumpbot_website'

app.use(express.static(__dirname + '/app'))

app.all('*', (req, res) => {
	res.sendStatus(401)
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
