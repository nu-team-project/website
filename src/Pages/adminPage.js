//Packages
import { useEffect } from "react";

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
export default function AdminPage(props)
{
    useEffect(() =>
    {
        let sendEmail = false;
        let message = '';

        if(props.temp.field1 > 40)
        {
            sendEmail = true;
            message = 'WARNING the temperature has exceeded the maximum limit for the plants.';
        }
        if(props.temp.field1 < 25)
        {
            sendEmail = true;
            message = 'WARNING the temperature has decreased past the minimum limit for the plants.';
        }
        if(props.humidity.field2 > 50)
        {
            sendEmail = true;
            message = 'WARNING the humidity has exceeded past the maximum limit for the plants.';
        }
        if(props.humidity.field2 < 30)
        {
            sendEmail = true;
            message = 'WARNING the humidity has decreased past the minimum limit for the plants.';
        }
        if(props.eco2.field3 > 5000)
        {
            sendEmail = true;
            message = 'WARNING the Co2 levels have exceeded past safe limits for humans to breathe.';
        }
        if(props.eco2.field3 < 250)
        {
            sendEmail = true;
            message = 'WARNING the Co2 levels have decreased past the mimimum limit of 250ppm or 0.025%.';
        }


        if(sendEmail)
        {
            const config = {
                SecureToken: '7df5baa3-ad2f-43e3-ab4d-fd041a6050b5',
                To : 'unknownrecipient3@gmail.com',     // <---Change for testing purposes
                From : 'systememail8421@gmail.com',
                Subject : 'URGENT NOTICE',
                Body : message
            };
    
            if(window.Email)
            {
                window.Email.send(config)
                .then((res) => console.log(res));
            }
        }
    }, [props]);

    return(
        <>
            <Header />
            <main>
                <TemperatureData data={Math.round(props.temp.field1)}/>
                <hr/>
                <HumidityData data={Math.round(props.humidity.field2)}/>
                <hr/>
                <section>
                <CarbonDioxideData data={props.eco2.field3 / 10000}/>
                </section>
            </main>
            
        </>
    );
}