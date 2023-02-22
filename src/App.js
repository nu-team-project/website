import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';

import Sphere from './Components/Sphere';
import Slider from './Components/Slider';

import './App.css';


/**
 * App
 * 
 * Contains the canvas for that inports the 3d model
 * and outputs to the canvas.
 * 
 * @author Matthew Shaw
 * @returns Canvas and slider
 */
export default function App()
{
   const [paneState, paneSetState] = useState({
      isPaneOpen: false,
      isPaneOpenLeft: false
    });



   const openSlider = () =>
   {
      paneSetState({ isPaneOpen: true });
   }



   const gltf = useGLTF("./kewgardens.gltf")
   return (
      <>
         <Canvas camera={{ position: [0, 20, 210], fov: 15 }}>
            <OrbitControls />
            <primitive object={gltf.scene} scale="0.5"/>

            <Sphere data='Co2' coords={[0, 10, 0]} openSlider={openSlider} paneState={paneState} />

            <Sphere data='Temperature' coords={[-15, 6, 0]} openSlider={openSlider} paneState={paneState} />

            <Sphere data='Humidity' coords={[15, 6, 0]} openSlider={openSlider} paneState={paneState} />

            <Environment preset={'city'} />
         </Canvas>
         <Slider paneState={paneState} paneSetState={paneSetState} />
      </>
   );
}