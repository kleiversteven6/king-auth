import { Canvas } from '@react-three/fiber';
import React from 'react';
import Dice from 'react-dice-roll';
import { Container, Divider } from 'semantic-ui-react';
import * as THREE from 'three';

export default function Dados() {
  let scene;
  let camera;
  let renderer;
  let cube;

  const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a3b4c);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  };
  return (
    <>
      <Dice />
      <Canvas />
      <Divider />
      <Container>{init()}</Container>
    </>
  );
}
