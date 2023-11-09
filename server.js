const express = require('express')
const app = express()
const port = 3000

// Serve static files from the 'public' directory
app.use(express.static('public'))

// Parse JSON requests
app.use(express.json())

// Handle DELETE request at '/delete' endpoint
app.delete('/delete', (req, res) => {
    // Perform deletion logic here (remove element from the DOM)

    // For example, you can send a success response back to the client
    res.status(200).send()
})

// app.get('/slides/1', (req, res) => {
//   res.status(200).send('/slides/1')
// })

let num = 0
app.get("/slides", (req, res) => {
  const v = Number(req.query.v)
  console.log(num, v)
  if (num <= 1 && v === -1) {
    num = 0
    res.sendFile(__dirname+`/public/slides/intro.html`)
  } else {
    console.log('here')
    num += v
    res.sendFile(__dirname+`/public/slides/${num}.html`)
  } 
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