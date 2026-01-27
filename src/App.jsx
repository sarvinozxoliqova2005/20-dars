import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import Actorpage from './pages/Actorpage'
import CategoryPage from './pages/CategoryPage'
import DirectorPage from './pages/DirectorPage'
import FavoritePage from './pages/FavoritePage'
import GenrePages from './pages/GenrePages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MoviePage from './pages/MoviePage'

const queryClient = new QueryClient();

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <>
     <QueryClientProvider client={queryClient}>
       <BrowserRouter>
        <Routes>
           <Route path='/' element={<LoginPage/>}/>
           <Route element={token ? <Layout/> : <Navigate to={"/"}/>}>
           <Route path='categorys' element={<CategoryPage/>}/>
           <Route path='travel' element={<Actorpage/>}/>
           <Route path='director' element={<DirectorPage/>}/>
           <Route path='favorite' element={<FavoritePage/>}/>
           <Route path='genre' element={<GenrePages/>}/>
           <Route path='movie' element={<MoviePage/>}/>
        </Route>
       </Routes>
     </BrowserRouter> 
     </QueryClientProvider>
    </>
  )
}

export default App