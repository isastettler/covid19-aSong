import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from '@react-three/drei'

function VirusBody () {
  
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="red" />
    </mesh>
  )
}

export default function FunctionVirus () {
  return(
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <VirusBody />
    </Canvas>
  )}

//     componentDidMount() {
//         // === THREE.JS CODE START ===
//         let scene = new THREE.Scene();

//         let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
//         camera.position.z = 5;
//       //make ball ---> one day will be virus
//         let geometry = new THREE.SphereGeometry( 1, 50, 50 );
//         let material = new THREE.MeshLambertMaterial({ color: 0xD71E09});
//         let mesh = new THREE.Mesh( geometry, material );
//         scene.add( mesh );

//         //make light so that we can see color
//         let light = new THREE.PointLight(0xff0000, 1, 1000 );
//         light.position.set(1, 1, 5);
//         scene.add(light)

//         const listener = new THREE.AudioListener();
//         camera.add( listener );

//         const sound = new THREE.Audio( listener );
//         const audioLoader = new THREE.AudioLoader();
//         audioLoader.load('covid_19.wav', function( buffer ) {
//           sound.setBuffer( buffer );
//           sound.setLoop(true);
//           sound.setVolume( 0.5 );
//         });

//         let renderer = new THREE.WebGLRenderer( { antialias: true } );
//         renderer.setClearColor("#FBA69D")
//         renderer.setSize( window.innerWidth, window.innerHeight );
//         // document.body.appendChild( renderer.domElement );
//         this.mount.appendChild( renderer.domElement );

//         window.addEventListener('resize', () => {
//           renderer.setSize( window.innerWidth, window.innerHeight );
//           camera.aspect = window.innerWidth/window.innerHeight;

//           camera.updateProjectionMatrix();
//         })

//         const raycaster = new THREE.Raycaster();
//         const mouse = new THREE.Vector2();

//         let play = false;

//         function onClick (event) {
//           event.preventDefault();

//           mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// 	        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//           raycaster.setFromCamera( mouse, camera );
//           console.log(scene.children)
//           //this part in unfortuantely not working :( try to find a way to add a eventListener to ball
//           let intersects = raycaster.intersectObjects(scene.children)
//           console.log(intersects)
//           for(let i = 0; i < intersects.length; i++){
//             play = play ? false : true
//             play ? sound.play() : sound.pause();
//           }
            
//         }
          
//         window.addEventListener('click', onClick);

//         let up = true;

//         function animate () {
//           requestAnimationFrame( animate );

//           if (up) {
//             mesh.translateOnAxis(new THREE.Vector3(0, 1, 0).normalize(), 0.008)
//             if (mesh.position.y > -0.8) {
//                up = false
//             }
//          }
//          if (!up) {
//             mesh.translateOnAxis(new THREE.Vector3(0, 1, 0).normalize(),  -0.008)
//             if (mesh.position.y < -1) {
//                 up = true
//             }
//          }
      
//           renderer.render( scene, camera );
//         };
//         animate();
//       }
       
//     // === THREE.JS EXAMPLE CODE END ===

//     render() {
//       return (
//         <div ref={ref => (this.mount = ref)} />
//       )
//   }
// }