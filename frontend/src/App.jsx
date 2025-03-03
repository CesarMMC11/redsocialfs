import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from '../pages/home'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Navbar from '../components/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth/login' element={<Login/>} />
        <Route path='/auth/register' element={<Register/>} />
      </Routes>
    </>
  )
}

export default App
