import React from "react";
import { Chart as ChartJS, CategoryScale,LinearScale, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

/**
 * The Line Graph
 * 
 * The line graph gets the data and displays it. In the silder with the humidity component. 
 * 
 * @see https://blog.logrocket.com/using-chart-js-react/. This highlights some of the code used from the author Chinwike Maduabuchi. 
 * @author Lindsey Cawthorne 
 * 
 */
export default function LineChart(props) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Humidity Graph'
      }
    }
  };

  const labels = props.data.map((value) => value.created_at);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Humidity',
        data: props.data.map((value) => value.field2),// I tried to slice the data to make it looked better but the function kept causing issues. 
        borderColor: '#1c7ea6 ',
        backgroundColor: ''
      }
    ]
  }

  return (
    <div className="chart-container">
      <Line options={options} data={chartData} />
    </div>
  );
}