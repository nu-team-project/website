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
    return(
        <div>
            <img src={co2Cloud} alt="Cloud" />
            <span className='img_text'>Co2: {props.data.field3 / 10000}%</span>
        </div>
    );
}