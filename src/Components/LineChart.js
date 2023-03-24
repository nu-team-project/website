import React from "react";
import { Line } from "react-chartjs-2";

/**
 * The Line Graph
 * 
 * @see https://blog.logrocket.com/using-chart-js-react/. This highlights the code used from the author Chinwike Maduabuchi. 
 * @author Lindsey Cawthorne 
 * 
 */
export default function LineChart({ chartData }, props) {

const chartName = props.chartName;

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{chartName}</h2>
      <Line
        data={chartData}
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