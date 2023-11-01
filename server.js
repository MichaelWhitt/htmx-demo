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

app.get('/partial1', (req, res) => {
  console.log(req, res)
  res.status(200).send('very cool')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});