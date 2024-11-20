

import {Routes,Route } from 'react-router-dom';
import Header from './pages/Layout/Header';
import Overviews from './pages/admin/Overviews';
import Mantanance from './pages/admin/Mantanance';
import Home from './pages/admin/Home';
import Challenge from './pages/admin/Challenge';
import Manage from './pages/admin/Manage';
import Usage from './pages/admin/Usage';
import Views_usage from './pages/admin/Views_usage';
  function App() {

  return (
    <>
    
  <Header />
 

      <Routes>
     
        <Route path='/' element={<Home />} />
        <Route path='/overviews' element={<Overviews />} />
        <Route path='/mantanance' element={<Mantanance />} />
        <Route path='/challenge' element={<Challenge/>} />
        <Route path='/usage' element={<Usage/>} />
        <Route path='/manage' element={<Manage/>} />
        <Route path='/views_usage' element={<Views_usage/>} />
      </Routes>
    </>
  )
}

export default App
