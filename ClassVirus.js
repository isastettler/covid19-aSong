import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class ClassVirus extends Component {
	componentDidMount() {
		//define scene hight and width
		let HEIGHT = window.innerHeight;
		let WIDTH = window.innerWidth;
		//create the renderer
		let renderer = new THREE.WebGLRenderer({
			//this makes the scene background transperent
			alpha: true,
			//this I have to figure out...less good perfomant if this is set to true!
			antialias: true,
		});
		//set size of scene..here it willl take uo entire screen
		renderer.setSize(WIDTH, HEIGHT);
		//allow shadows
		renderer.shadowMap.enabled = true;
		this.mount.appendChild(renderer.domElement);
		//handle resize of screen
		window.addEventListener("resize", handleWindowResize);

		let fieldOfView, aspectRatio, nearPlane, farPlane;

		//create scene
		let scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0xfba69d, 100, 950);
		//set up camera
		aspectRatio = WIDTH / HEIGHT;
		fieldOfView = 60;
		nearPlane = 0.1;
		farPlane = 1000;
		let camera = new THREE.PerspectiveCamera(
			fieldOfView,
			aspectRatio,
			nearPlane,
			farPlane
		);
		//set position of camera
		// camera.position.x = 0;
		// camera.position.y = 200;
		camera.position.z = 8;

		function handleWindowResize() {
			HEIGHT = window.innerHeight;
			WIDTH = window.innerWidth;
			renderer.setSize(WIDTH, HEIGHT);
			camera.aspect = WIDTH / HEIGHT;
			camera.updateProjectionMatrix();
		}
		// craet lights
		let hemispereLight = new THREE.HemisphereLight(0xfba69d, 0xaaaaaa, 0.9);
		let shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

		shadowLight.position.set(150, 350, 350);
		shadowLight.castShadow = true;

		//define the visible aera of the projected shadow
		shadowLight.shadow.camera.left = -400;
		shadowLight.shadow.camera.right = 400;
		shadowLight.shadow.camera.top = 400;
		shadowLight.shadow.camera.bottom = -400;
		shadowLight.shadow.camera.near = 1;
		shadowLight.shadow.camera.far = 1000;

		//define resolution of shadow the higher --> the more expensive
		shadowLight.shadow.mapSize.width = 2048;
		shadowLight.shadow.mapSize.height = 2048;

		//mount lights to scene
		scene.add(hemispereLight);
		scene.add(shadowLight);

		//add Objects
		let t;
		function createBody() {
			//create a container to hold all elements of the object
			this.mesh = new THREE.Object3D();

			//define the body shape of the virus
			let bodyGeom = new THREE.SphereGeometry(1, 50, 50);
			//create material
			let bodyMat = new THREE.MeshLambertMaterial({ color: 0xd71e09 });
			let virusBody = new THREE.Mesh(bodyGeom, bodyMat);

			virusBody.castShadow = true;
			virusBody.receiveShadow = true;
			this.mesh.add(virusBody);

			//let's try to make more than one T thingy
			// let allTs = []
			// for(let i = 0; i < 5; i++){
			//     allTs[i] = new createT();

			//     allTs[i].mesh.rotation.y = .5;
			//     let rx=Math.random() * Math.PI * 2;
			//     let ry=Math.random() * Math.PI;
			//     allTs[i].mesh.position.setFromSphericalCoords(1 + .2, rx,-ry);
			//     allTs[i].mesh.lookAt(virusBody.position);

			//     this.mesh.add(allTs[i].mesh)

			// }

			// bring the T thinhys in
			let t1 = new createT();
			t1.mesh.position.x = 1;
			this.mesh.add(t1.mesh);

			let t2 = new createT();
			t2.mesh.position.x = -1;
			t2.mesh.rotation.y = Math.PI;
			this.mesh.add(t2.mesh);

			let t3 = new createT();
			t3.mesh.position.y = 1;
			t3.mesh.rotation.z = Math.PI /2;
			this.mesh.add(t3.mesh);

			let t4 = new createT();
			t4.mesh.position.y = -1;
			t4.mesh.rotation.z = Math.PI * 1.5;
			this.mesh.add(t4.mesh);

			let t5 = new createT();
			t5.mesh.position.z = 1;
			t5.mesh.rotation.y = Math.PI * 1.5;
			this.mesh.add(t5.mesh);

			let t6 = new createT();
			t6.mesh.position.z = -1;
			t6.mesh.rotation.y = Math.PI /2;
			this.mesh.add(t6.mesh);

			// let t7 = new createT();
			// t7.mesh.position.z = -1;
			// t7.mesh.position.y = .5;
			// t7.mesh.position.x = .5;
			// t7.mesh.rotation.y = Math.PI /2;
			// t7.mesh.rotation.z = Math.PI * .25;
			// this.mesh.add(t7.mesh);

			// let t8 = new createT();
			// t8.mesh.position.z = 1;
			// t8.mesh.position.y = .5;
			// t8.mesh.position.x = .5;
			// t8.mesh.rotation.y = Math.PI * 1.5;
			// t8.mesh.rotation.z = Math.PI *.24;
			// this.mesh.add(t8.mesh);
		}

		function createT() {
			this.mesh = new THREE.Object3D();

			//define the stems of the T thingys
			let stemGeom = new THREE.CylinderGeometry(0.2, 0.2, 1, 2);
			let stemMat = new THREE.MeshLambertMaterial({ color: 0xd71e09 });
			let stem = new THREE.Mesh(stemGeom, stemMat);
			stem.position.y = 0.1;
			stem.rotation.x = 1;
			stem.rotation.z = 1.6;
			stem.castShadow = true;
			stem.receiveShadow = true;
			this.mesh.add(stem);

			//define the top of the T thingy
			let topGeom = new THREE.BoxGeometry(1, 0.2, 0.2, 1, 1);
			let topMat = new THREE.MeshLambertMaterial({ color: 0xd71e09 });
			let top = new THREE.Mesh(topGeom, topMat);
			top.position.y = 0.15;
			top.position.x = 0.6;
			top.rotation.x = 45;
			top.rotation.y = 1.6;
			top.castShadow = true;
			top.receiveShadow = true;
			this.mesh.add(top);
		}

		//bring virus to liiiifffeeeee!
		let virus;

		function createVirus() {
			virus = new createBody();
			virus.mesh.position.y = 2;
			virus.mesh.rotation.y = Math.PI;
			scene.add(virus.mesh);
		}
		//add the track
		const listener = new THREE.AudioListener();
		camera.add(listener);

		const sound = new THREE.Audio(listener);
		const audioLoader = new THREE.AudioLoader();
		audioLoader.load("covid_19.wav", function (buffer) {
			sound.setBuffer(buffer);
			sound.setLoop(true);
			sound.setVolume(0.5);
		});
		//add eventListener to start music on click
		const raycaster = new THREE.Raycaster();
		const mouse = new THREE.Vector2();

		let play = false;

		function onClick(event) {
			event.preventDefault();

			mouse.x = (event.clientX / WIDTH) * 2 - 1;
			mouse.y = -(event.clientY / HEIGHT) * 2 + 1;

			raycaster.setFromCamera(mouse, camera);
			console.log(scene.children);
			// this part in unfortuantely not working :( try to find a way to add a eventListener to ball
			// let intersects = raycaster.intersectObjects(scene.children);
			// console.log(intersects);
			// for (let i = 0; i < intersects.length; i++) {
				play = play ? false : true;
				play ? sound.play() : sound.pause();
			// }
		}

		window.addEventListener("click", onClick);

		const controls = new OrbitControls( camera, renderer.domElement );

		function loop() {
			virus.mesh.rotation.z += 0.005;
			virus.mesh.rotation.y += 0.005;

			renderer.render(scene, camera);
			requestAnimationFrame(loop);
		}
		//     createFloor();
		// //add audio
		//     creatSound();

		createVirus();
 		renderer.render(scene, camera);
		loop()
		console.log("I ruuunnnn!!!");
	} 

	render() {
		return (
			<div ref={(ref) => (this.mount = ref)} />
		);
	}
}

// //make more than one virus body
// let nViruses = 3+Math.floor(Math.random()*3);
// for(let i = 0; i < nViruses; i++){
//     //create the bodys
//     let viruses = new THREE.Mesh(bodyGeom, bodyMat);

//     //set random positions of the viruses
//     viruses.position.x = i*15;
//     viruses.position.y = Math.random()*10;
//     viruses.position.z = Math.random()*10;

//     //make size random
//     let size = .1 + Math.random()*.9;
//     viruses.scale.set(size, size * 50, size * 50);

//     //let the viruses have and recieve shadow
//     viruses.castShadow = true;
//     viruses.receiveShadow = true;
//     //add viruses to the container object
//     this.mesh.add(viruses)

// }
