const express = require('express')
const app = express()
const PORT = 5000;

app.post('/register', (req, res) => {
  res.status(200).json({ message: 'register' })
})


app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})