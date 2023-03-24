//Style
import '../CSS/Humidity.css';

//Imports
import { Data } from "../temp-graph-data/Data";
import { CategoryScale } from "chart.js";
import React, { useState, useEffect } from 'react';

//Components
import LineChart from "./LineChart";
import Chart from "chart.js/auto";

//Images 
import waterDrop from '../images/water-drop.png';


// I have wrote this in my component as an example. 
Chart.register(CategoryScale);

export default function Humidity(props)
{
  const [channel, setChannel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
      fetch("https://api.thingspeak.com/channels/2048224/fields/1.json?api_key=WNBPHCR9UFKPAV6N&results=2")
      .then(
          (response) => response.json()
      )
      .then(
          (json) => {
              setChannel(json.data)
              setLoading(false)
              console.log(json)
          }
      )
      .catch(
          (e) => {
              console.log(e.message)
          }
      )
  },[]);

//Extract the data from the dataset and use the date as the horizontal axis.
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.date), //Data is in the temp-graph-data file. 
 
 
//Extract the data from the dataset and use the date as the vertical axis.
    datasets: [
      {
        label: "Humidity by percentage",
        data: Data.map((data) => data.humidity),
        backgroundColor: [""],
        borderColor: "#0072A0",
        borderWidth: 2
      }
    ]
  });
 // On line 38 I am trying to return the name but its not working for some reason. 
 return(
  <div>
      <h3 className='current-level-text'>Current Humidity Level:</h3>
        <div className='wrapper'>
            <img className='water-image' src={waterDrop} alt="Water-Drop" />
            <span className='text'>{props.data}%</span>
        </div>
            <p>The current humidity levels need to be maintained in the gardens because......</p>
        <hr/>

        <div>
            <h3 className='chart-header'>Humidity Data</h3>
            <LineChart className='humidity-chart' chartName="Humidity" chartData={chartData}/>
      </div>
  </div>
  );
}