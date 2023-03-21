//Packages
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';

//Components
import Sphere from '../Components/Sphere';
import Slider from '../Components/Slider';

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
export default function CanvasPage(params)
{
   const [paneState, paneSetState] = useState({
      isPaneOpen: false,
      isPaneOpenLeft: false
    });

   const [data, setData] = useState([]);

   useEffect(() =>
   {
      const tempData = [
         {
            id: 1,
            coords: [0, 10, 0],
            name: 'Co2',
            data: 0.04
         },
         {
            id: 2,
            coords: [-15, 6, 0],
            name: 'Temperature',
            data: 30
         },
         {
            id: 3,
            coords: [15, 6, 0],
            name: 'Humidity',
            data: 15
         }
      ];

      setData(tempData);
   }, [])



   const openSlider = (value) =>
   {
      paneSetState(
         {
            isPaneOpen: true,
            name: value.name,
            data: value.data
         }
      );
   }



   const gltf = useGLTF("./kewgardensV3.gltf");
   return (
      <div className='modelCanvas'>
         <Canvas camera={{ position: [0, 20, 210], fov: 15 }}>
            <OrbitControls />
            <primitive object={gltf.scene} scale="0.5"/>

            {
               data.map((value) =>
                  <Sphere data={value.name} coords={value.coords} info={value} openSlider={openSlider} paneState={paneState} key={value.id} />
               )
            }

            <Environment preset={'city'} />
         </Canvas>
         <Slider paneState={paneState} paneSetState={paneSetState} />
      </div>
   );
}