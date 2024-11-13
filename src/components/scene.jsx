// src/Scene.jsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls,Environment } from '@react-three/drei';
import BicycleModelWrapper from './BicycleModel';

export default function Scene() {
  const [color, setColor] = useState('#ffffff');
  const [design, setDesign] = useState(null);

  const handleColorChange = (event) => setColor(event.target.value);
  const handleDesignChange = (event) => {
    const selectedDesign = event.target.value;
    setDesign(selectedDesign === 'none' ? null : `/textures/${selectedDesign}.png`);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.1} />             
        <BicycleModelWrapper color={color} texture={design} />
        <OrbitControls enableZoom={true} />
        <Environment preset="sunset" />
     
      </Canvas>
      <div style={{ position: 'absolute', top: 10, left: 10, backgroundColor: '#363636', padding: '10px', borderRadius: '5px' }}>
        <label>Choose Color: </label>
        <input type="color" value={color} onChange={handleColorChange} />
        
        <label>Choose Design: </label>
        <select onChange={handleDesignChange}>
          <option value="none">None</option>
          <option value="design1">Design 1</option>
          <option value="design2">Design 2</option>
          {/* Add more design options as needed */}
        </select>
      </div>
    </div>
  );
}