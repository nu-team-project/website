import React from "react";
import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from "react-sliding-pane";

import CarbonDioxide from "./carbonDioxide";

import "./Slider.css"
/**
 * Slider
 * 
 * Contains the slider that displays all the sensor data.
 * 
 * @author Lindsey Cawthorne
 * @param {*} props - all data passed into the component
 * @returns slider component 
 */
export default function Slider(props)
{
  return (
    <div>
      <SlidingPane
        className="slider"
        overlayClassName="slider-overlay"
        isOpen={props.paneState.isPaneOpen}
        title={props.paneState.name}
        subtitle="Optional subtitle."
        width="40vw"
        onRequestClose={() => {
        props.paneSetState({ isPaneOpen: false });
        }}
        >
          {
            props.paneState.name === 'Co2'
            &&
            <CarbonDioxide data={props.paneState.data} />
          }
          {
            props.paneState.name === 'Temperature'
            &&
            <p>Temp: {props.paneState.data} degrees C</p>
          }
          {
            props.paneState.name === 'Humidity'
            &&
            <p>Humidity: {props.paneState.data}%</p>
          }
          
          
          
          
          <hr/>
      </SlidingPane>
    </div>
  )
}