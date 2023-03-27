//Packages
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);


export default function co2LineChart(props)
{
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Eco2 levels'
            },
        },
    };

    const labels = props.data.map((value) => value.created_at.slice(0, 10));

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Eco2',
                data: props.data.map((value) => value.field3),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return(
        <div className='graph'>
            <Line options={options} data={chartData} />
        </div>
    );
}