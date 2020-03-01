// Instantiate new socket when page is loaded 
var socket = io() 

// socket.emit sends event to all other sockets 
socket.emit('newPlayer', 'Warren')

/*
 * MOVEMENT
 * The following functions create Fetch API requests to PATCH player movement. 
 * Compatible with WASD or arrow keys. 
 */ 

var movement = {
    up: false, 
    down: false, 
    left: false, 
    right: false
}

document.addEventListener('keydown', e => {
    const code = e.code
    if (code === 'KeyW' || code === 'ArrowUp') {
        console.log('up')
        movement.up = true
    } else if (code === 'KeyS' || code === 'ArrowDown') {
        console.log('down')
        movement.down = true
    } else if (code === 'KeyA' || code === 'ArrowLeft') {
        console.log('left')
        movement.left = true
    } else if (code === 'KeyD' || code === 'ArrowRight') {
        console.log('right')
        movement.right = true
    } 
    socket.emit('movement', movement)
})

// Wait maybe not necessary since keydown is basically keypress
document.addEventListener('keyup', e => {
    const code = e.code
    if (code === 'KeyW' || code === 'ArrowUp') {
        console.log('up')
        movement.up = false
    } else if (code === 'KeyS' || code === 'ArrowDown') {
        console.log('down')
        movement.down = false
    } else if (code === 'KeyA' || code === 'ArrowLeft') {
        console.log('left')
        movement.left = false
    } else if (code === 'KeyD' || code === 'ArrowRight') {
        console.log('right')
        movement.right = false
    } 
})
