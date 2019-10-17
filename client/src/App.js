import React, { Component } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import './App.css';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import OBJLoader from 'three-obj-loader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import styles from './App.module.css';
import FadeText from './Components/FadeText/FadeText';
import ProjectsMenu from './Components/ProjectsMenu/ProjectsMenu';

OBJLoader(THREE);
const lights = [];
var model;

export class App extends Component {

	state = {
		phoneLoaded: false,
		position: 0,
		introOpacity: 1,
		blurValue: 0
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
	}

	startAnimationLoop = () => {
		if(this.state.phoneLoaded && this.state.position === 0){
			model.rotation.x += 0.01;
			model.rotation.y += 0.01;
		}
		TWEEN.update();
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
		if(window.scrollY >= 0 && window.scrollY < 500){
			this.setState({position:0});
			this.fadeOutIntro();
		} else if (window.scrollY >= 500 && window.scrollY < 600){
			this.resetPhoneRotation();
			this.setState({position:1});
		} else if (window.scrollY >= 600){
			console.log(window.scrollY);
			this.setCamera();
		}
	};

	fadeOutIntro = () => {
		let blurValue = window.scrollY*.01;
		let y = window.scrollY;
		let introOpacity = (-1/500)*y + 1;
		this.setState({introOpacity:introOpacity, blurValue: blurValue});
	}

	setCamera = () => {
		// this.camera.position.z -= .002;
	}

	resetPhoneRotation = () => {
		if(this.state.position === 1){
			return;
		}
		disableBodyScroll();
		let targetAngle;
		let anglexMod = model.rotation.x % 6.28;
		let angleyMod = model.rotation.y % 6.28;
		
		//Below 1.57 = 0 | Between 1.57 and 4.71 = 3.14 | Above 4.71 = 6.28
		if(anglexMod < 3.14){
			targetAngle = 3.14;
		} else {
			targetAngle = 6.28;
		}


		var position = { angley: angleyMod, anglex: anglexMod };
		var target = { angley: targetAngle, anglex: targetAngle };
		var tween = new TWEEN.Tween(position).to(target, 2000);

		tween.easing(TWEEN.Easing.Sinusoidal.Out);
		tween.onUpdate(function(){
			model.rotation.y = position.angley;
			model.rotation.x = position.anglex;
		});
		
		tween.onComplete(() => {
			clearAllBodyScrollLocks();
		});

		tween.start();
	}

	

	render() {
		return (
			<ParallaxProvider>
				<React.Fragment>
					<div className={styles.scene} ref={ref => (this.main = ref) }></div>
					<div className={styles.document}>
						<div className={styles.introductionContainer}>
							<div className={styles.introduction} style={{opacity: this.state.introOpacity, filter: `blur(${this.state.blurValue}px)`}}>
								<Parallax y={[60, -40]}>
									<FadeText heading={true} delay={0}>
										We are You &amp; I - a digital product studio specialising in cutting edge product design &amp; development.
									</FadeText>
								</Parallax>
								<Parallax y={[0, 80]}>
									<FadeText delay={1}>
										Our aim is to build emotive and memorable digital experiences which stimulate discussion.
									</FadeText>
								</Parallax>
							</div>
							<div className={styles.scrollPrompt} style={{opacity: this.state.introOpacity, filter: `blur(${this.state.blurValue}px)`}}>
									<div className={styles.scrollContainer}>
										<span className={styles.scrollPoint}></span>
									</div>
							</div>
						</div>
						<div className={styles.blankContainer}>
						</div>
						<ProjectsMenu></ProjectsMenu>
						<div className={styles.blankContainer}>
						</div>
					</div>
				</React.Fragment>
			</ParallaxProvider>
		);
 	}
}

export default App;