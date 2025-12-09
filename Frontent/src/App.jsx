import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import getCurrentUser from './costumHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'

const App = () => {
  getCurrentUser()

  const {userData} = useSelector((state) => state.user)
  return (
    <>
    <ToastContainer/>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={!userData ? <SignUp/>: <Navigate to={'/'} />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/profile' element={userData ?<Profile/> : <Navigate to={'/signup'} />}/>
      <Route path='/forget-password' element={userData ?<ForgetPassword/> : <Navigate to={'/signup'} />}/>

    
    </Routes>
    </>
  )
}

export default App