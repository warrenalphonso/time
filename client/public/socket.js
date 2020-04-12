// Instantiate new socket when page is loaded 
var socket = io() 

// socket.emit sends event to all other sockets 
socket.emit('newPlayer', 'Warren')

/*
 * MOVEMENT
 * The following functions create Fetch API requests to PATCH player movement. 
 * Compatible with WASD or arrow keys. 
 */ 


var socket = io() 
socket.emit('newPlayer', 'Warren', 'EECS')

/** 
 * MOVEMENT. The following functions create Fetch API requests to PATCH player movement. 
 * Compatible with WASD or arrow keys.  
 **/

document.addEventListener('keydown', e => {
    const code = e.code
    if (code === 'KeyA' || code === 'ArrowLeft') {
        console.log('left')
        socket.emit('movement', -1, 0)
    } else if (code === 'KeyD' || code === 'ArrowRight') {
        console.log('right')
        socket.emit('movement', 1, 0)
    } else if (code === 'KeyW' || code === 'ArrowUp') {
        console.log('up')
        socket.emit('movement', 0, -1)
    } else if (code === 'KeyS' || code === 'ArrowDown') {
        console.log('down')
        socket.emit('movement', 0, 1)
    } else if (code === 'KeyE') {
        console.log('E is for use')
    } else if (code === 'KeyT') {
        console.log('T is for talk')
    } else if (code === 'Space') {
        console.log('Space is for attack')
    }
})
