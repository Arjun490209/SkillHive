import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import getCurrentUser from './costumHooks/getCurrentUser'

const App = () => {
  getCurrentUser()
  return (
    <>
    <ToastContainer/>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App