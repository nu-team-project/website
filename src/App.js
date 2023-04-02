//Packages
import {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';

//Pages
import CanvasPage from './Pages/canvasPage';
import AdminPage from './Pages/adminPage';

import './App.css';

/**
 * App//test
 * 
 * Contains routes to either the admin or canvas page
 * 
 * @author Matthew Shaw
 * @returns Either the canvas page or the admin page
 */
export default function App()
{
   const [temp, setTemp] = useState({});
   const [humidity, setHumidity] = useState({});
   const [eco2, setEco2] = useState({});

   useEffect(() =>
   {
      Promise.all([
         fetch('https://api.thingspeak.com/channels/2048224/fields/1.json?api_key=WNBPHCR9UFKPAV6N&results=1')
         .then((response) => response.json()),

         fetch('https://api.thingspeak.com/channels/2048224/fields/2.json?api_key=WNBPHCR9UFKPAV6N&results=1')
         .then((response) => response.json()),

         fetch('https://api.thingspeak.com/channels/2048224/fields/3.json?api_key=WNBPHCR9UFKPAV6N&results=1')
         .then((response) => response.json()),
      ])
      .then((json) =>
      {
         setTemp(json[0].feeds[0]);
         setHumidity(json[1].feeds[0]);
         setEco2(json[2].feeds[0]);
      })
      .catch((e) =>
      {
         console.log(e.message);
      })
   }, []);



   return (
      <>
         <Routes>
            <Route exact path='/' index element={<CanvasPage temp={temp} humidity={humidity} eco2={eco2} />} />
            <Route exact path='/Admin' element={<AdminPage temp={temp} humidity={humidity} eco2={eco2} />} />
         </Routes>
      </>
   );
}