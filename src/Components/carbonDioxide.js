//Packages
import { useState, useEffect } from 'react';

//Components
import Co2LineChart from './co2LineChart';

//CSS
import '../CSS/carbonDioxide.css';

//Images
import co2Cloud from '../images/co2Cloud.png';



/**
 * CarboDioxide
 * 
 * Displays the Co2 data retrieved from the carbon dioxide sensor.
 * 
 * @params props takes in the Co2 data as a parameter
 * @author Matthew Shaw
 * @returns JSX for the Co2 component of the slider
 */
export default function CarbonDioxide(props)
{
    const [data, setData] = useState([]);
    const [lowest, setLowest] = useState();
    const [highest, setHighest] = useState();

    useEffect(() =>
    {
        fetch('https://api.thingspeak.com/channels/2048224/fields/3.json?api_key=WNBPHCR9UFKPAV6N&results=10')
        .then((response) => response.json())
        .then((json) => setData(json.feeds))
        .catch((e) => console.log(e.message));
    }, []);

    useEffect(() =>
    {
        let high = null;
        let low = null;

        data.forEach(value =>
            {
                if(low === null)
                {
                    high = value.field3;
                    low = value.field3;
                }
                if(value.field3 < low)
                {
                    low = value.field3;
                }
                if(value.field3 > high)
                {
                    high = value.field3;
                }
            });
        setHighest(high);
        setLowest(low);
    }, [data]);

    

    return(
        <div className='grid_container'>
            <h3 className='current_level_text'>Current Co2 level:</h3>

            <div className='co2_graphic'>
                <img className='image' src={co2Cloud} alt="Cloud" />
                <span className='current_level'>Co2: {props.data.field3 / 10000}%</span>
            </div>

            <div className='text'>
                <p>
                    The current Co2 levels need to be maintained in the gardens because...... Lorem ipsum dolor
                    sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrum exercitationem ullam corporis suscipit laboriosam.
                </p>
            </div>

            <div className='recent_highest'>
                <p>Highest this week:</p>
            </div>
            <div className='highest'>
                <p>{highest / 10000}%</p>
            </div>

            <div className='recent_lowest'>
                <p>Lowest this week:</p>
            </div>
            <div className='lowest'>
                <p>{lowest / 10000}%</p>
            </div>

            <div className='chart'>
                <h3>Eco2 Data</h3>
                <Co2LineChart data={data} />
            </div>
        </div>
    );
}