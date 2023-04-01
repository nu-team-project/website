import React, { useEffect, useState } from "react"
import { Chart } from "react-google-charts";
import "../CSS/Temperature.css";
import temperatureImage from "../images/thermometer.png"

/**
 * Temperature Component
 * 
 * @description This component fetches data from our low cost sensors API.
 * It then displays the current temperature, the highest and lowest temperature this week,
 * and a line graph showing the daily temperatures.
 * 
 * Graphs and Chart visuals are provided by React Google Charts.
 * 
 * @see Thermometer Image provided by:
 * https://www.flaticon.com/free-icons/haw-weather - Haw weather icons created by Cap Cool - Flaticon
 * 
 * @author Kristopher Olds
 * @returns JSX data displaying various temperature information in the form of Strings and charts/graphs
 */

export default function Temperature() {
    // Controls how many results we get back from the API call
    const resultsNumber = 100;

    let [weekNumber, setWeekNumber] = useState(0);
    let [data, setData] = useState([0]);
    let [count, setCount] = useState(0);
    let [firstLoad, setFirstLoad] = useState(true);
    let [currentTemp, setCurrentTemp] = useState(0);
    let [highestTemp, setHighestTemp] = useState(0);
    let [lowestTemp, setLowestTemp] = useState(0);
    let [lineChartData, setLineChartData] = useState ([
        ["Day of Week", "Temperature"],
        ["Monday", 0],
        ["Tuesday", 0],
        ["Wednesday", 0],
        ["Thursday", 0],
        ["Friday", 0],
        ["Saturday", 0],
        ["Sunday", 0]
    ]);

    // let lineChartData = [[]];
    let lineChartOptions = {};

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
                console.error("Error: " + error);
            })
    }, []);

    setupLineChart();
    { count > 0 && firstLoad && generateData() }


    // console.log("Regen data");

    let charts = () => {
        // console.log("Chart...")
        // console.log(lineChartData);
        // console.log(lineChartOptions);
        return (
            <Chart
                chartType="LineChart"
                width="100%"
                height="300px"
                data={lineChartData}
                options={lineChartOptions}
            />
        )
    }

    useEffect(() => {
        charts()
    }, [lineChartData])
      

    return (
        <div className="temperatureData">
            {data && <img src={temperatureImage} alt="thermometer image" />}
            {data && <p id="current">Current Temperature: <strong>{currentTemp}°C</strong></p>}
            {data && <p id="highest">The highest temperature this week: <strong>{highestTemp}°C</strong></p>}
            {data && <p id="lowest">The lowest temperature this week: <strong>{lowestTemp}°C</strong></p>}

            <div className="chartsDiv">
                {weekNumber === 0 && <p>Temperature over the last 7 days</p>}
                {weekNumber > 0 && <p>{weekNumber} week(s) ago temperatures</p>}
                {charts()}
                {/* {weekNumber === 0 && <p>Week: Current Week</p>} */}
                <button type="button" onClick={handleWeekChange} id="prevWeek">Prev Week</button>
                {weekNumber > 0 && <button type="button" onClick={handleWeekChange} id="currentWeek">Next Week</button>}
            </div>

        </div>
    )

    // Needs optimising. Duplicate code being used.
    function handleWeekChange(e) {
        if (e.target.id === "prevWeek") {
            if (weekNumber === 5) return; // Don't go back further than 5 weeks
            setWeekNumber(weekNumber+1);

            let startingKey = (7*weekNumber) + 7;
            let count = 1;

            for(let i = startingKey; i < startingKey+7; i++) {
                let stringData = parseFloat(data[i].field1);
                let intData = parseFloat(stringData);
                lineChartData[count][1] = intData;
                count++;
            }

        } else if (e.target.id === "currentWeek") {
            setWeekNumber(weekNumber-1);
            
            let startingKey = (7*weekNumber) - 7;
            let count = 1;
            
            for(let i = startingKey; i < startingKey+7; i++) {
                let stringData = parseFloat(data[i].field1);
                let intData = parseFloat(stringData);
                lineChartData[count][1] = intData;
                count++;
            }
        }
    }

    function setupLineChart() {
        // lineChartData = [
        //     ["Day of Week", "Temperature"],
        //     ["Monday", 0],
        //     ["Tuesday", 0],
        //     ["Wednesday", 0],
        //     ["Thursday", 0],
        //     ["Friday", 0],
        //     ["Saturday", 0],
        //     ["Sunday", 0]
        // ];

        lineChartOptions = {
            title: "Weekly Temperatures",
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
        setFirstLoad(false);
        temperatureToFloat();

        data.forEach(function (value, key) {
            if (key === 0) {
                setCurrentTemp(value.field1); 
                setLowestTemp(value.field1);
                setHighestTemp(value.field1);
                // lowestTemp = value.field1;
                // highestTemp = value.field1;
            }
            if (key < 7) {
                let stringData = parseFloat(value.field1).toFixed(2);
                let intData = parseFloat(stringData);
                lineChartData[key + 1][1] = intData;

                if (key > 0) {
                    if (value.field1 < lowestTemp) setLowestTemp(value.field1);
                    if (value.field1 > highestTemp) setHighestTemp(value.field1);
                    // if (value.field1 < lowestTemp) lowestTemp = value.field1;
                    // if (value.field1 > highestTemp) highestTemp = value.field1;
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