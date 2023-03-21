//Style
import '../CSS/Humidity.css';

//Imports
import { useState} from "react";
import { Data } from "../temp-graph-data/Data";
import { CategoryScale } from "chart.js";

//Components
import LineChart from "./LineChart";
import Chart from "chart.js/auto";

// I have wrote this in my component as an example. 
Chart.register(CategoryScale);

export default function Humidity()
{

//Extract the data from the dataset and use the date as the horizontal axis.
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.date), //Data is in the temp-graph-data file. 
 
 
//Extract the data from the dataset and use the date as the vertical axis.
    datasets: [
      {
        label: "Humidity by percentage",
        data: Data.map((data) => data.humidity),
        backgroundColor: [""],
        borderColor: "red",
        borderWidth: 2
      }
    ]
  });
 // On line 38 I am trying to return the name but its not working for some reason. 
    return(
        <div>
            <LineChart chartName="Humidity" chartData={chartData} />
        </div>
    );
}