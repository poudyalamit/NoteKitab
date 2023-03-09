const connectmongo = require('./db');
const express = require('express')

connectmongo();
const app = express()
const port = 5000
app.use(express.json());
//available routes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))
app.listen(port, () => {
  console.log(`NoteKitab Backend listening on port http://localhost:${port}`)
})