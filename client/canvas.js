var canvas  = document.getElementById("myCanvas")
canvas.width = document.body.clientWidth // document.width/height is obsolete
canvas.height = document.body.clientHeight

var context = canvas.getContext("2d")

context.fillStyle = 'rgb(200, 0, 0)'

// create a socket listener for load, then render the HTML canvas with map content
socket.on('load', players => { // load the current game state to client through their specific socket
    for (id in players) { // for each SocketIO id in the players array
        var player = players[id]
    }
    // signal other sockets to draw new players
})

socket.on('state', players => {
    // Clears the canvas for redrawing
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (id in players) {
        var player = players[id]
        context.fillRect(player.x, player.y, 20, 20);
    }
})
