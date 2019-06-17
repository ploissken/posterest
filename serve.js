const express = require('express')

const app = express()
app.use(express.static('build'))

const port = process.env.PORT
app.listen(port, () => console.log(`Post eletronic rest served @ ${port}`))
