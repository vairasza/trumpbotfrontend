const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 8001

process.title = 'trumpbot_website'

app.use(express.static(__dirname))

app.all('*', (req, res) => {
	res.sendStatus(401)
})

app.listen(port, () => {
	console.log(`🚀 Server listening at http://localhost:${port} 🚀`)
})
