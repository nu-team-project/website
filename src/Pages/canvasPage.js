//Packages
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
//import ReactDOM from "react-dom";

//Components
import Sphere from '../Components/Sphere';
import Slider from '../Components/Slider';
import About from '../Components/about';

import '../App.css';



/**
 * App
 * 
 * Contains the canvas for that inports the 3d model
 * and outputs to the canvas.
 * 
 * @author Matthew Shaw
 * @returns Canvas and slider
 */
export default function CanvasPage(props)
{
   const [paneState, paneSetState] = useState({
      isPaneOpen: false,
      isPaneOpenLeft: false
    });

    const openSlider = (data, name) =>
    {
       paneSetState(
          {
             isPaneOpen: true,
             name: name,
             data: data
          }
       );
    }


const gltf = useGLTF("./kewgardensV3.gltf");
   return (
      <div className='modelCanvas'>
         <About/>
         <Canvas camera={{ position: [0, 20, 210], fov: 15 }}>
            <OrbitControls />
            <primitive object={gltf.scene} scale="0.5"/>

            <Sphere name={'Temperature'} coords={[-15, 3.5, 0]} data={props.temp} openSlider={openSlider} paneState={paneState} />
            <Sphere name={'Humidity'} coords={[0, 7, 0]} data={props.humidity} openSlider={openSlider} paneState={paneState} />
            <Sphere name={'Eco2'} coords={[15, 3.5, 0]} data={props.eco2} openSlider={openSlider} paneState={paneState} />

            <Environment preset={'city'} />
         </Canvas>
         <Slider paneState={paneState} paneSetState={paneSetState} />
      </div>
   );
}