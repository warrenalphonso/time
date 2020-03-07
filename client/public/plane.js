var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

var renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
// default THREE.PCFShadowMap

renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 )

var geometry = new THREE.BoxGeometry( 30, 30, 30)
var material = new THREE.MeshBasicMaterial( { color: 0xaaaaff } )
var cube = new THREE.Mesh( geometry, material )
cube.castShadow = true
cube.receiveShadow = false // default
scene.add( cube )

var checkeredFloor = new THREE.TextureLoader().load( '/public/checkerboard.jpg' )
checkeredFloor.wrapS = checkeredFloor.wrapT = THREE.RepeatWrapping
checkeredFloor.repeat.set( 10, 10 )
var floorMaterial = new THREE.MeshBasicMaterial( { map: checkeredFloor, side: THREE.DoubleSide } )

var planeGeo = new THREE.PlaneGeometry( 2000, 2000, 10, 10 )
var planeMat = new THREE.MeshBasicMaterial( {color: 0x228b22, side: THREE.DoubleSide} )
var plane = new THREE.Mesh( planeGeo, floorMaterial );
 plane.rotateX( 22 / 14 )
plane.receiveShadow = true
scene.add( plane )

camera.position.z = 50
camera.position.x = 50
camera.position.y = 60
camera.lookAt( new THREE.Vector3( 0, 0, 0 ))

// ThreeJS Aces helper for test / debug
var axesHelper = new THREE.AxesHelper( 5 )
// x is RED, y is GREEN, Z is BLUE

scene.add( axesHelper )

cube.position.y = 20


var sun = new THREE.PointLight( 0xffffdd, 1, 0)
sun.position.set( 0, 10, 0 )
sun.castShadow = true
scene.add( sun )

// Set up shadow properties for the light
sun.shadow.mapSize.width = 512
sun.shadow.mapSize.height = 512
sun.shadow.camera.near = 0.5
sun.shadow.camera.far = 500

// Clone a cube to test motion inputs
var redMat = new THREE.MeshBasicMaterial( { color: 0xff0000 } )
var moveCube = new THREE.Mesh( geometry, redMat )
scene.add( moveCube )
moveCube.position.y = 15


function animate() {
	requestAnimationFrame( animate )
	cube.rotation.x += 0.01
	cube.rotation.y -= 0.05

	renderer.render( scene, camera )
}

animate()
