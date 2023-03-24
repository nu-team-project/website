import React from "react";
import { Line } from "react-chartjs-2";

/**
 * The Line Graph
 * 
 * @see https://blog.logrocket.com/using-chart-js-react/. This highlights the code used from the author Chinwike Maduabuchi. 
 * @author Lindsey Cawthorne 
 * 
 */
export default function LineChart(props) {

const chartName = props.chartName;

  return (
    <div className="chart-container">
      <Line
        data={props.chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Data Over Time"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}