import React, { useEffect, useState } from "react"
import { Chart } from "react-google-charts";
import "../CSS/Temperature.css";

/**
 * Temperature Component
 * 
 * @description This component fetches data from our low cost sensors API.
 * It then displays the current temperature, the highest and lowest temperature this week,
 * and a line graph showing the daily temperatures.
 * 
 * Graphs and Chart visuals are provided by React Google Charts.
 * 
 * @author Kristopher Olds
 * @returns JSX data displaying various temperature information in the form of Strings and charts/graphs
 */

export default function Temperature() {
    // Controls how many results we get back from the API call
    const resultsNumber = 100;

    let [data, setData] = useState([0]);
    let [count, setCount] = useState(0);

    let lineChartData = [[]];
    let lineChartOptions = {};

    let lowestTemp = 0;
    let highestTemp = 0;

    useEffect(() => {
        fetch(`https://api.thingspeak.com/channels/2048224/fields/1.json?api_key=WNBPHCR9UFKPAV6N&results=${resultsNumber}`)
            .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                    setData(json.feeds);
                    setCount(json.feeds.length);
                }
            )
            .catch((error) => {
                console.error(error);
            })
    }, []);

    setupLineChart();
    { count > 0 && generateData() }

    return (
        <div className="temperatureData">
            {data && <p>Current Temperature: <strong>{data[0].field1}°C</strong></p>}
            {data && <p>The highest temperature this week: <strong>{highestTemp}°C</strong></p>}
            {data && <p>The lowest temperature this week: <strong>{lowestTemp}°C</strong></p>}
            <div className="chartsDiv">
                <p>Temperature over the last 7 days</p>
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={lineChartData}
                    options={lineChartOptions}
                />
            </div>
        </div>
    )

    function setupLineChart() {
        lineChartData = [
            ["Day of Week", "Temperature"],
            ["Monday", 0],
            ["Tuesday", 0],
            ["Wednesday", 0],
            ["Thursday", 0],
            ["Friday", 0],
            ["Saturday", 0],
            ["Sunday", 0]
        ];

        lineChartOptions = {
            title: "Previous 7 Days Temperature",
            curveType: "function",
            legend: { position: "bottom" },
            animation: {
                startup: true,
                easing: "linear",
                duration: 1500,
            },
        };
    }

    // Generating the data to display in the Slider
    function generateData() {
        temperatureToFloat();
        data.forEach(function (value, key) {
            if (key === 0) {
                lowestTemp = value.field1;
                highestTemp = value.field1;
            }

            if (key < 7) {
                let stringData = parseFloat(value.field1).toFixed(2);
                let intData = parseFloat(stringData);
                lineChartData[key + 1][1] = intData;

                if (key > 0) {
                    if (value.field1 < lowestTemp) lowestTemp = value.field1;
                    if (value.field1 > highestTemp) highestTemp = value.field1;
                }
            }
        })
    }

    // Converting the JSON data returned from 5 decimal places to 2
    function temperatureToFloat() {
        data.forEach(function (value, key) {
            let intValue = parseFloat(value.field1).toFixed(2);
            data[key].field1 = Math.round(parseFloat(intValue) * 100) / 100;
        })
    }
}