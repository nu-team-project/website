import React from "react";
import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from "react-sliding-pane";

import CarbonDioxide from "./carbonDioxide";

import "../CSS/Slider.css"
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
        width="40vw"
        onRequestClose={() => {
        props.paneSetState({ isPaneOpen: false });
        }}
        >
          {
            props.paneState.name === 'Eco2'
            &&
            <CarbonDioxide data={props.paneState.data.field3} />
          }
          {
            props.paneState.name === 'Temperature'
            &&
            <p>Temp: {Math.round(props.paneState.data.field1)} degrees C</p>
          }
          {
            props.paneState.name === 'Humidity'
            &&
            <p>Humidity: {Math.round(props.paneState.data.field2)}%</p>
          }
          <hr/>
      </SlidingPane>
    </div>
  )
}