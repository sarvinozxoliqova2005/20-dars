import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import TravelPage from './pages/TravelPage'
import TourPage from './pages/TourPage'
import HotelPage from './pages/HotelPage'
import DestinationPage from './pages/DestinationPage'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <>
     <BrowserRouter>
       <Routes>
           <Route path='' element={<LoginPage/>}/>
           <Route element={token ? <Layout/> : <Navigate to={"/"}/>}>
           <Route path='travel' element={<TravelPage/>}/>
           <Route path='tour' element={<TourPage/>}/>
           <Route path='hotel' element={<HotelPage/>}/>
           <Route path='destination' element={<DestinationPage/>}/>
        </Route>
       </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App