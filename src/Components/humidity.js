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
 * This component gets the humidity data from the API and displays it in the slider
 * along with a graph and a graphic. 
 * 
 * @returns All of the data and displays it in the slider.
 * @author Lindsey Cawthorne
 */

export default function Humidity()
{
    const [data, setData] = useState([0]);
// The fetch request gets the data from the API. 
useEffect(() => {
    fetch(
      "https://api.thingspeak.com/channels/2048224/fields/2.json?api_key=WNBPHCR9UFKPAV6N&results=15"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.feeds);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


// humidity gets the data maps it to an array returns to as the max and min value of humidity
  const humidity = data ? data.map((v, i) => v.field2) : [];


// HumidityData maps the data and slices it to get the first element for the recent humidity.
    const humidityData = <ul className='list-current'>
        {data.slice(0,1).map(
            (value, key) => <li key={key}>{Math.round(value.field2)}%</li>
        )}
    </ul>

 return(

    <div className='grid-container'>
        <h3 className='current-level-text'>Current Humidity Level:</h3>
        <div className='water-drop'>
            <img className='water-image' src={waterDrop} alt="Water-Drop" />
            <span className='current-level'>{humidityData}</span>
        </div>

        <div className='text'>
            <p>The current humidity levels need to be maintained in the gardens because...... Lorem ipsum dolor
            sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrum exercitationem ullam corporis suscipit laboriosam, quis nostrum </p>
        </div>

        <div className='recent-highest'>
            <p className='margin'>Highest this week: </p> 
        </div>
        
        <p>{Math.max(...humidity)}</p>

        <div className='recent-lowest'>
            <p className='margin'>Lowest this week: </p> 
        </div>
         <p>{Math.min(...humidity)}</p>

        <div className='chart'>
            <h3>Humidity Data:</h3>

            <LineChart className='humidity-chart' data={data}/>
        </div>
    </div>
  );
}