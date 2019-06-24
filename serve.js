const express = require('express')

const app = express()
app.use(express.static('build'))

const port = process.env.PORT
app.listen(port, () => console.log(`Post eletronic rest served @ ${port}`))

app.get('*', function (req, res) {
  let path = require('path')
  console.log('redirecionando o c')
  res.sendFile(path.join(__dirname, '/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
