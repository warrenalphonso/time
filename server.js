/*
 * Server functionality
 */

const path = require('path') 
const express = require('express') 
const app = express() 

// Use local port if Heroku isn't found 
const port = process.env.PORT || 4000 

// From https://socket.io/get-started/chat/ 
const http = require('http') 
const server = http.createServer(app) 

server.listen(port, err => {
    if (err) throw err 
    console.log(`Server started on port ${port}.`)
})

// Listens for new sockets on server
const io = require('socket.io')(server)

// Setting up views directory for Pug 
app.set('views', './client')
app.set('view engine', 'pug')

// Only serves public directory 
app.use('/public', express.static(path.join(__dirname, 'client/public')))
//app.use(express.static(path.join(__dirname, 'client')))

// Support JSON-encoded and URL-encoded bodies 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// If GET '/running' works, server is ready - used to check if Heroku dyno is awake
app.get('/running', (req, res) => {
    res.status(200).send({
        message: 'Server is up.'
    })
}) 

/* 
 * Login functionality. Flow: 
 * 1. Client makes POST request to '/' with username 
 * 2. Server checks for errors in input 
 *      a. if error, redirects back to GET '/login' with params specifying errors
 * 3. Server checks if any players are online 
 *      a. if client is first, redirect GET '/login' with params specifying seed prompt
 *      b. if client isn't first, load in existing world 
 */

app.get('/', (req, res) => {
    var msg = req.query.msg

    var error
    var login = `
        <!-- Form POSTS to /name -->
        <form action="/name" method="post">
            <!-- The for field associates label with input with corresponding id -->
            <label for="name">Name:</label> 
            <input type="text" id="name" name="name" value="Joe Blow">
            <br />
            <button type="submit">Submit</button>
        </form>
    `
    var seed

    if (msg == encodeURIComponent('full')) {
        error = "GAME FULL: 4 Players Currently Online"
    } else if (msg == encodeURIComponent('invalid')) {
        error = "INVALID NAME: Empty Name Provided"
    } else if (msg == encodeURIComponent('seed')) {
        // Don't ask for login
        login = null
        seed = `
            <!-- Form POSTS to /seed -->
            <p>You get to choose a seed</p>
            <form action="/seed" method="post">
                <label for="seed">Seed:</label>
                <input type="text" id="seed" name="seed" value="Breaks with empty string">
                <br />
                <button type="submit">Submit</button>
            </form>
        `
    } else if (msg == encodeURIComponent('game')) {
        res.sendFile(path.join(__dirname, 'client/game.html'))
        return
    }


    res.render('index', { error, login, seed })
}) 

// Things we have to validate everytime user does something. Return nothing if no error 
const continuousValidate = () => {
    // Check if already 4 players online 
    if (Object.keys(players).length >= 4) {
        return encodeURIComponent('full')
    }
}

// We have to separate POSTs request because otherwise we were determining which 
// request it was by checking boolean value of req.body.name or req.body.seed but 
// that returns false if user inputted an empty string
app.post('/name', (req, res) => {
    const name = req.body.name 
    var msg = continuousValidate()

    // Check for problems with given name 
    if (!msg && name.length == 0) {
        msg = encodeURIComponent('invalid')
    } 

    // Check if user needs to input seed 
    if (!msg && Object.keys(players).length == 0) {
        msg = encodeURIComponent('seed')
    }

    // If nothing wrong, take to game 
    if (!msg) {
        msg = encodeURIComponent('game') 
    }

    res.redirect('/?msg=' + msg)
})

app.post('/seed', (req, res) => {
    const seed = req.body.seed 
    var msg 

    // Check again to make sure a world isn't created 
    
    // Create world with seed and make it default world for everyone else 

    if (!msg) {
        msg = encodeURIComponent('game')
    }

    res.redirect('/?msg=' + msg)
})

/*
 * Game functionality through socket listener
 */

var players = {}
const base_movespeed = 4

// Called when someone connects to server 
io.on('connection', socket => {
    console.log('New socket connected.') 

    // Creates new player, emitted in socket.js 
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
    socket.on('movement', movement => {
        if (movement.up) {
            players[socket.id].y -= base_movespeed
        } 
        if (movement.down) {
            players[socket.id].y += base_movespeed
        }
        if (movement.left) {
            players[socket.id].x -= base_movespeed
        }
        if (movement.right) {
            players[socket.id].x += base_movespeed
        }
    })
    
    // Player disconnects - weird functionality if closes browser 
    socket.on('disconnect', () => {
        console.log('Someone disconnected.')
        delete players[socket.id]
    })
})

// Check game state 30 times a second and send to sockets 
setInterval(() => {
    io.sockets.emit('state', players)
}, 1000 / 60) 
