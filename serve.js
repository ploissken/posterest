console.log(`metajornal's 🖤 still beats`)

const port = process.env.PORT || 3000
const express = require('express')
const app = express()

app.use(express.static('build'))

app.listen(
  port,
  () => console.log(`Post eletronic rest served @ ${port}`)
)
