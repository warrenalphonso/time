/** server.js */ 


const path = require('path') 
const express = require('express') 
const app = express() 

// Use local port if Heroku isn't found 
const port = process.env.PORT || 4000 

// Why do we have to do this? 
const http = require('http') 
const server = http.createServer(app) 

// Listens for new sockets on server
const io = require('socket.io')(server)

// Serves static files from public directory 
//app.use(express.static(path.join(__dirname, 'public')))

// If GET '/running' works, server is ready
app.get('/running', (req, res) => {
    res.status(200).send({
        message: 'Server is up.'
    })
}) 

// Shows game.html
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'frontend/game.html'))
}) 

server.listen(port, err => {
    if (err) throw err 
    console.log(`Server started on port ${port}.`)
})




// Runs when someone connects to server 
io.on('connection', socket => {
    console.log('New socket connected.') 

    // Creates new player 
    
    // Player moved 
    socket.on('movement', (dx, dy) => {
        console.log('Someone moved.')
    })

    // Player disconnects - weird functionality if closes browser 
    socket.on('disconnect', () => {
        console.log('Someone disconnected.')
    })
})
