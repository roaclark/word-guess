const express = require('express')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const port = process.env.PORT || 3000

app.use('/', express.static(path.join(__dirname, '../../client/dist')))

app.get('/api', (req, res) => {
  res.send('Hello from the server!')
})

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}!`) // eslint-disable-line no-console
})
const io = socketio(server, { path: '/api/events' })

io.on('connection', (socket) => {
  socket.on('join room', ({ username, room }) => {
    console.log(`user ${username} joined ${room}`)
    socket.join(room, () => {
      socket.to(room).emit('user joined', { username })
    })
  })
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
})
