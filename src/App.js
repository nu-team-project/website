//Packages
import { Routes, Route } from 'react-router-dom';

//Pages
import CanvasPage from './Pages/canvasPage';
import AdminPage from './Pages/adminPage';

import './App.css';

/**
 * App
 * 
 * Contains routes to either the admin or canvas page
 * 
 * @author Matthew Shaw
 * @returns Either the canvas page or the admin page
 */
export default function App()
{
   return (
      <>
         <Routes>
            <Route exact path='/' index element={<CanvasPage />} />
            <Route exact path='/Admin' element={<AdminPage />} />
         </Routes>
      </>
   );
}