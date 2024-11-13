// src/BicycleModel.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { Suspense } from 'react';

const MODEL_PATH = '/virtual-shop/assets/GLTF/scene.gltf'; // Path to your GLTF model

function BicycleModel({ color, texture }) {
  const ref = useRef();
  const { scene } = useGLTF(MODEL_PATH); // Load the GLTF model

  useFrame(() => {
    ref.current.rotation.y += 0.001;
  });

  const textureMap = texture ? useTexture(texture) : null;

  // Apply color and texture to all materials in the scene
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set(color);
      if (textureMap) {
        child.material.map = textureMap;
        child.material.needsUpdate = true;
      }
    }
  });

  return <primitive ref={ref} object={scene} scale={[1, 1, 1]} />;
}

export default function BicycleModelWrapper(props) {
  return (
    <Suspense fallback={null}>
      <BicycleModel {...props} />
    </Suspense>
  );
}