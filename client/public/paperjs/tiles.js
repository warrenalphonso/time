/** PaperScript hasn't upgraded to ES6 yet, but we are using an acornjs CDN in game.html
 *  so we can use arrow functions, const, etc. 
 */

const tileSize = 25

// I don't think this is going to work for a map that's much bigger than screen
var copy = []

socket.on('load', (blocks, players) => {
	for (var y = 0; y < blocks.length; y++) {
		copy[y] = []
		for (var x = 0; x < blocks[y].length; x++) {
			var block = new Path.Rectangle(tileSize * x, tileSize * y, tileSize, tileSize)
			copy[y][x] = block
			if (blocks[y][x] === 1) {
				block.fillColor = 'red'
			} else {
				block.fillColor = 'white'
			}
		}
	}

	for (id in players) {
		var player = players[id]
		// var block = new Path.Rectangle(tileSize * player.x, tileSize * player.y, tileSize, tileSize)
		var block = copy[player.y][player.x]
		block.fillColor = 'black'
	}
})

socket.on('update', (player, replaceBlock) => {
	var block = copy[replaceBlock.y][replaceBlock.x]
	// var block = new Path.Rectangle(tileSize * replaceBlock.x, tileSize * replaceBlock.y, tileSize, tileSize) 
	if (replaceBlock.block === 1) {
		block.fillColor = 'red'
	} else {
		block.fillColor = 'white'
	}

	var playerBlock = copy[player.y][player.x]
	// var playerBlock = new Path.Rectangle(tileSize * player.x, tileSize * player.y, tileSize, tileSize) 
	playerBlock.fillColor = 'black'
})

socket.on('removePlayer', (replaceBlock) => {
	var block = copy[replaceBlock.y][replaceBlock.x]
	// var block = new Path.Rectangle(tileSize * replaceBlock.x, tileSize * replaceBlock.y, tileSize, tileSize) 
	if (replaceBlock.block === 1) {
		block.fillColor = 'red'
	} else {
		block.fillColor = 'white'
	}
})