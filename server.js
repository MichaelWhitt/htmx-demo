const express = require('express')
const app = express()
const port = 3000

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse JSON requests
app.use(express.json());

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
    res.sendFile(__dirname+`/public/slides/intro.html`);
  } else {
    console.log('here')
    num += v
    res.sendFile(__dirname+`/public/slides/${num}.html`);
  } 
 });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});