import React from "react";
import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from "react-sliding-pane";
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

/**
 * 
 */
export default function Slider(props) {

  return (
    <div>
      <SlidingPane
        className="slider"
        overlayClassName="slider-overlay"
        isOpen={props.paneState.isPaneOpen}
        title="Sensor title"
        subtitle="Optional subtitle."
        width="25vw"
        onRequestClose={() => {
        props.paneSetState({ isPaneOpen: false });
        }}
        >
        <p>Sensor Data</p>
      </SlidingPane>
    </div>
  )
}