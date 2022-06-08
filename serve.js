console.log(`metajornal's 🖤 still beats`)

const port = process.env.PORT || 3000
const path = require('path')
const express = require('express')
const app = express()

app.use(express.static('dist'))

// app.get('*', function (req, res) {
//   console.log(path.join(__dirname, 'dist', 'index.html'))
//   res.set({
//     'Access-Control-Allow-Origin': '*'
//   })
//  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
// })

app.listen(
  port,
  () => console.log(`Post eletronic rest served @ ${port}`)
)
