const express = require('express')
const app = express()
const port = 3000

// Serve static files from the 'public' directory
app.use(express.static('public'))

// Parse JSON requests
app.use(express.json())

// Handle DELETE request at '/delete' endpoint
app.delete('/delete', (req, res) => {
    res.status(200).send()
})

app.get('/season', (req, res) => {
  console.log(res)
  res.status(200).send()
})

app.get('/poll', (req, res) => {
  res.status(200).send('<div hx-trigger="every 1s" hx-get="/pollEvery"></div>')
})

app.get('/pollEvery', (req, res) => {
  res.status(200).send(
    `<div>${Math.ceil(Math.random() * 100)}</div>`
  )
})

app.get('/name', (req, res) => {
  res.status(200).send(
    "<div style='color: cyan'>Michael</div>"
  )
})

app.delete('/name', (req, res) => {
  res.status(200).send()
})

app.get('/loader', (req, res) => {
  setTimeout(() => {
    res.status(200).send('<div id="indicator">Loaded!</div>')
  }, 3000)
})

app.get('/kiba', (req, res) => {
  res.status(200).send(
    `<img id='kibaContent' src='/assets/kiba.jpg' width="420px" height="550px" style="border-radius: 10px; box-shadow: 0px 0px 12px 5px rgba(10,10,10,50)" />`
  )
})

const contentStack = ['intro.html', '1.html', '2.html', '3.html', '4.html', '5.html', '6.html', '7.html', '8.html', '9.html', '10.html']
let currentIndex = 0

app.get('/get_content', (req, res) => {
  const direction = req.query.direction
  
  if (direction === 'previous') {
    currentIndex = Math.max(0, currentIndex - 1)
  } else if (direction === 'next') {
    currentIndex = Math.min(contentStack.length - 1, currentIndex + 1)
  }
  res.sendFile(__dirname+`/public/slides/${currentIndex ? currentIndex : 'intro'}.html`)
})

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})