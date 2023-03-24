//Style
import '../CSS/Humidity.css';

//Imports
import React, { useState, useEffect } from 'react';

//Components
import LineChart from "./LineChart";

//Images 
import waterDrop from '../images/water-drop.png';

/**
 * The Humidity Component 
 * 
 * This component gets the humidity data from the API and deisplays it in the slider
 * along with a graph and a graphic. 
 * 
 * @param {*} props 
 * @returns 
 * @author Lindsey Cawthorne
 */

export default function Humidity(props)
{
    const [data, setData] = useState([0]);

  useEffect( () => {
      fetch("https://api.thingspeak.com/channels/2048224/fields/2.json?api_key=WNBPHCR9UFKPAV6N&results=15")
      .then(
          (response) => response.json()
      )
      .then(
          (json) => {
              setData(json.feeds);
              console.log(json);
          }
      )
      .catch(
          (e) => {
              console.log("error - " + e.message)
          }
      )
  },[]);

 return(
  <div>
      <h3 className='current-level-text'>Current Humidity Level:</h3>
        <div className='wrapper'>
            <img className='water-image' src={waterDrop} alt="Water-Drop" />
            <span className='text'>{Math.round(data[0].field2)}%</span>
        </div>
            <p>The current humidity levels need to be maintained in the gardens because......</p>
        <hr/>
        <p></p>
        <div>
            <h3 className='chart-header'>Humidity Data</h3>
            <LineChart className='humidity-chart' data={data}/>
      </div>
  </div>
  );
}