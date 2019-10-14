import React, { Component } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import './App.css';
import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import styles from './App.module.css';
import FadeText from './Components/FadeText/FadeText';
OBJLoader(THREE);
const lights = [];
var model;

export class App extends Component {

	state = {
		phoneLoaded: false,
	}

	componentDidMount() {
		this.sceneSetup();
    	this.addCustomSceneObjects();
		this.startAnimationLoop();
		document.addEventListener('scroll', this.trackScrolling);
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.trackScrolling);
	}
	
	sceneSetup = () => {
		const width = this.main.clientWidth;
		const height = this.main.clientHeight;
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(
			60, // fov = field of view
			width / height, // aspect ratio
			0.1, // near plane 
			1000 // far plane
		);
		this.camera.position.z = 1.5;

		this.renderer = new THREE.WebGLRenderer({antialias:true, aplha:true});
		this.renderer.setSize( width, height );
		this.main.appendChild( this.renderer.domElement );

		const textureLoader = new THREE.TextureLoader();
		const sceneBackground = textureLoader.load('./img/scene-bg.jpg');
		this.scene.background = sceneBackground;

		this.composer = new EffectComposer( this.renderer );
		var renderPass = new RenderPass( this.scene, this.camera );
		this.composer.addPass( renderPass );
	}

	addCustomSceneObjects = () => {
		this.addPhoneObject();
		this.addLights();

		// var planeTexture = new THREE.TextureLoader().load( './img/plane-bg.png' );
		// var planeMaterial = new THREE.MeshBasicMaterial( { map: planeTexture, side:THREE.DoubleSide, transparent:true, opacity: .05 } );
		
		// const planeGeometry = new THREE.PlaneGeometry(2, 2, 2);
		// var plane = new THREE.Mesh( planeGeometry, planeMaterial );
		// plane.position.set(-1, 0, -2);
		// this.scene.add( plane );

	}

	startAnimationLoop = () => {
		if(this.state.phoneLoaded){
			model.rotation.x += 0.01;
			model.rotation.y += 0.01;
		}


		this.composer.render();
		requestAnimationFrame(this.startAnimationLoop);
	}

	addLights = () => {
		lights[ 0 ] = new THREE.PointLight( 'white', 10, 0);
		lights[ 1 ] = new THREE.PointLight( 0xffffff, 2, 0);
		lights[ 2 ] = new THREE.PointLight( 0xffffff, 10, 0);

		lights[ 0 ].position.set(0, 200, 0);
		lights[ 1 ].position.set(100, 200, 100);
		lights[ 2 ].position.set(-100, -200, -100);

		this.scene.add( lights[ 0 ] );
		this.scene.add( lights[ 1 ] );
		this.scene.add( lights[ 2 ] );
	}

	addPhoneObject = () => {
		const phoneMaterial = new THREE.MeshPhongMaterial({
			color: '#343f50',
			emissive: '#000',
			flatShading: true,
			specular: '#ffffff',
			transparent:true,
			opacity:.2,
			shininess: 60,

		});

		this.THREE = THREE;
		const objLoader = new this.THREE.OBJLoader();
		objLoader.load(
			'./objects/phone.obj',
			 ( object ) => {
				object.traverse( function( child ) {
					if ( child instanceof THREE.Mesh ) {
						child.material = phoneMaterial;
					}
				} );
				model = object;
				object.scale.set(.0005, .0005, .0005);
				this.scene.add(object);
				this.setState({phoneLoaded: true});
			},
			function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		
			},
			function ( error ) {	
				console.log( 'An error happened' );
			}
		)
	}

	trackScrolling = () => {
		console.log('hi');
		console.log(window.scrollY);
	  };

	

	render() {
		return (
			<ParallaxProvider>
				<React.Fragment>
					<div className={styles.scene} ref={ref => (this.main = ref) }></div>
					<div className={styles.document}>
						<div className={styles.introductionContainer}>
							<div className={styles.introduction}>
								<Parallax y={[60, -40]}>
									<FadeText heading={true} delay={0}>
										We are You &amp; I - a digital product studio specialising in cutting edge product design &amp; development.
									</FadeText>
								</Parallax>
								<Parallax y={[0, 80]}>
									<FadeText delay={1}>
										Our goal is to build emotive and memorable digital experiences which stimulate discussion.
									</FadeText>
								</Parallax>
							</div>
							<div className={styles.scrollPrompt}>
									<div className={styles.scrollContainer}>
										<span className={styles.scrollPoint}></span>
									</div>
							</div>
						</div>
						<div className={styles.projectsContainer}>
							<Parallax y={[-100, 20]}>
								<h1>Projects</h1>
							</Parallax>
						</div>
					</div>
				</React.Fragment>
			</ParallaxProvider>
		);
 	}
}

export default App;