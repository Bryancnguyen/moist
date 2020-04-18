import React from 'react';
import './App.css';
import { Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, MeshPhongMaterial, Mesh, Vector3, Object3D, PointLight, AmbientLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function App() {
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  const renderer = new WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  // controls
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 1000;
  controls.maxDistance = 5000;
  controls.maxPolarAngle = Math.PI / 2;

  const geometry = new SphereGeometry(64, 32, 32);
  const waterGeometry = new SphereGeometry(40, 20, 20);

  const material = new MeshPhongMaterial({
    color: '#F00000',
  });
  const material2 = new MeshPhongMaterial({
    color: '#FFFFFF',
  });
  const spheres: Object3D[] = [];

  const tempVect = new Vector3();
  function calcPosition() {
    tempVect.set(
      (Math.random() - 0.5) * 5000,
      (Math.random() - 0.5) * 5000,
      (Math.random() - 0.5) * 5000,
    )
    return tempVect;
  }

  for (let i = 0; i < 2000; i++) {
    const root = new Object3D();
    root.position.copy(calcPosition());

    const hydro = new Mesh( geometry, material );
    const agua1 = new Mesh( waterGeometry, material2 );
    const agua2 = new Mesh( waterGeometry, material2 );

    agua1.position.set(40, -40, 5);
    agua2.position.set(-40, -40, 5);

    
    root.rotation.x = (Math.random() * 360 ) * Math.PI / 180;
    root.rotation.y = (Math.random() * 360 ) * Math.PI / 180;
    root.rotation.z = (Math.random() * 360 ) * Math.PI / 180;
    root.add(hydro, agua1, agua2);

    spheres.push(root);
  }

  scene.add(...spheres);
  camera.position.z = 500;
  document.body.appendChild( renderer.domElement );

  const light = new PointLight(0xffffff, 1, 4000);
  light.position.set(50, 0, 0);
  const light_two = new PointLight(0xffffff, 1, 4000);
  light_two.position.set(-100, 800, 800);
  const lightAmbient = new AmbientLight(0x404040);
  scene.add(light, light_two, lightAmbient);

  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

    const timer = 0.0002 * Date.now();
    for ( let i = 0, il = spheres.length; i < il; i ++ ) {

    const sphere = spheres[ i ];
    sphere.updateMatrixWorld();

    sphere.position.x = 1000 * Math.cos( timer + i );
    sphere.position.y = 1000 * Math.sin( timer + i * 1.1 );
    sphere.rotation.x += Math.random() * 0.05;
    sphere.rotation.y += Math.random() * 0.05;

    controls.update();
    }
  }


  animate();

  return (
    <div className="App">
      {/* <div id='canvas'/> */}
    </div>
  );
}


export default App;
