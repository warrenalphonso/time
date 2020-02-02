/** server.js */ 


const path = require('path') 
const express = require('express') 
const app = express() 

// Use local port if Heroku isn't found 
const port = process.env.PORT || 4000 

// From https://socket.io/get-started/chat/ 
const http = require('http') 
const server = http.createServer(app) 

// Listens for new sockets on server
const io = require('socket.io')(server)

// Serves static files from public directory 
app.use(express.static(path.join(__dirname, 'client')))

// If GET '/running' works, server is ready
app.get('/running', (req, res) => {
    res.status(200).send({
        message: 'Server is up.'
    })
}) 

// Shows game.html
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'client/game.html'))
}) 

server.listen(port, err => {
    if (err) throw err 
    console.log(`Server started on port ${port}.`)
})



var players = {}

// Runs when someone connects to server 
io.on('connection', socket => {
    console.log('New socket connected.') 

    // Creates new player, emited in socket.js 
    socket.on('newPlayer', name => {
        console.log(name) 
        const startCoords = [1, 1] 
        // Store player in dictionary of players 
        players[socket.id] = {
            name: name, 
            x: startCoords[0], 
            y: startCoords[1]
        }
        // Tell all sockets to reload 
        io.sockets.emit('load', players)

        var numPlayersOnline = Object.keys(players).length
        console.log(`Players online: ${numPlayersOnline}.`)

        var newColor;
        if (numPlayersOnline == 1) {
            newColor = 'red'
        } else {
            newColor = 'blue'
        }
    }) 

    // When someone moves 
    socket.on('movement', (dx, dy) => {
        console.log('Someone moved.')
        players[socket.id].x += dx 
        players[socket.id].y += dy 
    })
    
    // Player disconnects - weird functionality if closes browser 
    socket.on('disconnect', () => {
        console.log('Someone disconnected.')
    })
})

// Check game state 30 times a second and send to sockets 
setInterval(() => {
    io.sockets.emit('state', players)
}, 1000 / 30) 
