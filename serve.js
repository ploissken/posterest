console.log(`metajornal's 🖤 still beats`)

const port = process.env.PORT || 3000
const path = require('path')
const express = require('express')
const app = express()

app.use(express.static('build'))

app.get('/*', function (req, res) {
 res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(
  port,
  () => console.log(`Post eletronic rest served @ ${port}`)
)
