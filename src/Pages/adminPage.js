//Packages
//import { useEffect } from "react";

//Components
import Header from '../Components/header';
import TemperatureData from '../Components/temperatureData';
import HumidityData from '../Components/humidityData';
import CarbonDioxideData from "../Components/carbonDioxideData";

//CSS
import '../CSS/adminPage.css';


/**
 * AdminPage
 * 
 * Admin page that displays data from the sensors
 * 
 * @author Matthew Shaw
 * @returns JSX
 */
export default function AdminPage()
{

    /*
    useEffect(() =>
    {
        const config = {
            SecureToken: '7df5baa3-ad2f-43e3-ab4d-fd041a6050b5',
            To : 'unknownrecipient3@gmail.com',
            From : 'systememail8421@gmail.com',
            Subject : 'Testing',
            Body : 'This is a test Email'
        };

        if(window.Email)
        {
            window.Email.send(config)
            .then((res) => console.log(res));
        }
    }, []);
    */

    return(
        <>
            <Header />
            <main>
                <TemperatureData data={36}/>
                <hr/>
                <HumidityData data={10}/>
                <hr/>
                <section>
                <CarbonDioxideData data={3}/>
                </section>
            </main>
            
        </>
    );
}