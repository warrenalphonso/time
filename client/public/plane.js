var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

var renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

var geometry = new THREE.BoxGeometry()
var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } )
var cube = new THREE.Mesh( geometry, material )
scene.add( cube )

var planeGeo = new THREE.PlaneGeometry( 5, 5)
var planeMat = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} )
var plane = new THREE.Mesh( planeGeo, planeMat );
 plane.rotateX(22 / 14)
scene.add( plane )

camera.position.z = 5
camera.position.x = 0

camera.lookAt( new THREE.Vector3(0, 0, 0))

function animate() {
	requestAnimationFrame( animate )

	cube.rotation.x += 0.01
	cube.rotation.y -= 0.05
	renderer.render( scene, camera )
}

animate()
