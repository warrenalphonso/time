var canvas = document.getElementById("myCanvas")
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
    console.log(players)
    for (id in players) {
        var player = players[id]
        context.fillRect(player.x,player.y,player.x+20,player.y+20);
    }
})
