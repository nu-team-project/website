import React, { useEffect, useState } from 'react';

/**
 * Sphere
 * 
 * Generates the spheres which represents the sensors.
 * 
 * @author Matthew Shaw
 * @param {*} props 
 * @returns Sphere mesh
 */
export default function Sphere(props)
{
    const [colour, setColour] = useState(false);

    useEffect(() =>
    {
        if(!props.paneState.isPaneOpen)
        {
            setColour(false);
        }
    }, [props])

    const sliderOpen = () =>
    {
        setColour(!colour);
        props.openSlider(props.data, props.name);
    }


    return(
        <mesh visible userData={{ Sensor: props.name }} position={props.coords} onClick={sliderOpen}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color={colour ? 'green' : 'red'} />
        </mesh>
    );
}